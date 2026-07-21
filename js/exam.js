// Exam tab — Gemini-generated mock tests for Vocab / Grammar / Conjugation,
// scoped to whichever lessons (or, for Conjugation, forms) you select.
//
// Design principle: Gemini never gets to invent ground truth. It only picks
// distractors from OUR real vocab pool, or wraps OUR verified data (grammar
// pattern usage notes / hand-checked conjugated forms) into new sentences.
// The "correct answer" shown to you always traces back to a data file in
// this repo, never to something Gemini made up — see buildVocabMcqQuestions,
// requestGrammarQuestions, and requestConjugationQuestions for where that's
// enforced.
//
// Your Gemini API key lives ONLY in this browser's localStorage — it is
// never written to a file, never included in the cloud-sync snapshot (see
// js/sync.js / getSyncSnapshot in app.js), and only ever sent directly from
// your browser to Google's API.
(function () {
  function t(key, vars) {
    if (window.JPStudyProgress && typeof window.JPStudyProgress.t === "function") {
      return window.JPStudyProgress.t(key, vars);
    }
    return key;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- Gemini API key (local-only — deliberately kept out of getSyncSnapshot) ----------
  const GEMINI_KEY_STORAGE = "jpstudy_gemini_key_v1";
  function getGeminiKey() {
    try {
      return (localStorage.getItem(GEMINI_KEY_STORAGE) || "").trim();
    } catch (e) {
      return "";
    }
  }
  function setGeminiKey(key) {
    try {
      localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
    } catch (e) {
      /* ignore — key just won't persist this session */
    }
  }
  function clearGeminiKey() {
    try {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
    } catch (e) {
      /* ignore */
    }
  }

  // "-latest" alias instead of a pinned version — Google periodically
  // retires specific model snapshots (e.g. gemini-2.5-flash stopped being
  // available to new API keys), and this alias always resolves to
  // whatever Gemini's current flash-tier model is, so this doesn't need
  // to be hand-updated again when that happens.
  const GEMINI_MODEL = "gemini-flash-latest";

  async function callGemini(prompt, responseSchema) {
    const key = getGeminiKey();
    if (!key) throw { friendly: t("examErrNoKey") };
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    };
    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      throw { friendly: t("examErrNetwork") };
    }
    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw { friendly: t("examErrParse") };
    }
    if (!res.ok) {
      if (res.status === 400 || res.status === 403) throw { friendly: t("examErrBadKey") };
      if (res.status === 429) throw { friendly: t("examErrQuota") };
      const msg = (data && data.error && data.error.message) || `HTTP ${res.status}`;
      throw { friendly: t("examErrGeneric", { msg }) };
    }
    const text =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;
    if (!text) throw { friendly: t("examErrEmpty") };
    try {
      return JSON.parse(text);
    } catch (e) {
      throw { friendly: t("examErrParse") };
    }
  }

  // ---------- shared exam state ----------
  const examState = {
    type: "vocab", // vocab | grammar | conjugation
    vocab: { level: "N4", lessons: [] },
    grammar: { level: "N4", lessons: [] },
    conjugation: { forms: [] }, // empty = all forms
  };

  const LEVELS = ["N5", "N4", "N3", "N2", "N1"];
  const FORM_LABELS = {
    te: "て形",
    ta: "た形",
    potential: "可能形",
    ba: "ば形",
    volitional: "う・よう形",
    passive: "受身形",
    causative: "使役形",
    causativePassive: "使役受身形",
  };
  const FORM_KEYS = Object.keys(FORM_LABELS);

  function vocabItemsForLevel(level) {
    return (window.VOCAB_DATA && window.VOCAB_DATA[level]) || [];
  }
  function vocabLessonNums(level) {
    return [...new Set(vocabItemsForLevel(level).map((i) => i.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
  }
  function grammarPatternsForLevel(level) {
    return (window.GRAMMAR_DATA && window.GRAMMAR_DATA[level]) || [];
  }
  function grammarLessonNums(level) {
    return [...new Set(grammarPatternsForLevel(level).map((i) => i.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
  }

  // ---------- DOM refs ----------
  const examSetupEl = document.getElementById("exam-setup");
  const examLoadingEl = document.getElementById("exam-loading");
  const examRunnerEl = document.getElementById("exam-runner");
  const examResultEl = document.getElementById("exam-result");
  const examErrorEl = document.getElementById("exam-error");
  const examLevelChipsEl = document.getElementById("exam-level-chips");
  const examLessonChipsEl = document.getElementById("exam-lesson-chips");
  const examGenerateBtn = document.getElementById("exam-generate-btn");
  const examResultBannerEl = document.getElementById("exam-result-banner");
  const examResultActionsEl = document.getElementById("exam-result-actions");
  const examKeyStatusEl = document.getElementById("exam-key-status");
  const examKeyBtn = document.getElementById("exam-key-btn");

  const geminiKeyModal = document.getElementById("gemini-key-modal");
  const geminiKeyInput = document.getElementById("gemini-key-input");
  const geminiKeyShowToggle = document.getElementById("gemini-key-show-toggle");
  const geminiKeyError = document.getElementById("gemini-key-error");
  const geminiKeySaveBtn = document.getElementById("gemini-key-save-btn");
  const geminiKeyClearBtn = document.getElementById("gemini-key-clear-btn");
  const geminiKeyCloseX = document.getElementById("gemini-key-close-x");

  const runnerEls = {
    phaseTag: document.getElementById("exam-phase-tag"),
    tag: document.getElementById("exam-card-tag"),
    sentence: document.getElementById("exam-card-sentence"),
    hint: document.getElementById("exam-card-hint"),
    optionsWrap: document.getElementById("exam-card-options"),
    furiganaWrap: document.getElementById("exam-furigana-input"),
    furiganaField: document.getElementById("exam-furigana-field"),
    furiganaSubmit: document.getElementById("exam-furigana-submit"),
    revealBtn: document.getElementById("exam-reveal"),
    answerEl: document.getElementById("exam-answer"),
    gradeButtons: document.getElementById("exam-grade-buttons"),
    gradeWrong: document.getElementById("exam-grade-wrong"),
    gradeRight: document.getElementById("exam-grade-right"),
    progressEl: document.getElementById("exam-progress"),
  };

  // ---------- Gemini key modal ----------
  function updateKeyStatus() {
    const has = !!getGeminiKey();
    examKeyStatusEl.textContent = has ? t("examKeySet") : t("examKeyNotSet");
    examKeyStatusEl.classList.toggle("ok", has);
  }
  function openGeminiKeyModal() {
    geminiKeyInput.value = getGeminiKey();
    geminiKeyInput.type = "password";
    geminiKeyShowToggle.checked = false;
    geminiKeyError.hidden = true;
    geminiKeyModal.hidden = false;
    setTimeout(() => geminiKeyInput.focus(), 0);
  }
  function closeGeminiKeyModal() {
    geminiKeyModal.hidden = true;
  }
  examKeyBtn.addEventListener("click", openGeminiKeyModal);
  geminiKeyCloseX.addEventListener("click", closeGeminiKeyModal);
  geminiKeyModal.addEventListener("click", (e) => {
    if (e.target === geminiKeyModal) closeGeminiKeyModal();
  });
  geminiKeyShowToggle.addEventListener("change", () => {
    geminiKeyInput.type = geminiKeyShowToggle.checked ? "text" : "password";
  });
  geminiKeySaveBtn.addEventListener("click", () => {
    const val = geminiKeyInput.value.trim();
    if (!val) {
      geminiKeyError.hidden = false;
      geminiKeyError.textContent = t("geminiKeyErrEmpty");
      return;
    }
    setGeminiKey(val);
    updateKeyStatus();
    closeGeminiKeyModal();
  });
  geminiKeyClearBtn.addEventListener("click", () => {
    clearGeminiKey();
    geminiKeyInput.value = "";
    updateKeyStatus();
  });

  // ---------- panel switching ----------
  function showPanel(name) {
    examSetupEl.hidden = name !== "setup";
    examLoadingEl.hidden = name !== "loading";
    examRunnerEl.hidden = name !== "runner";
    examResultEl.hidden = name !== "result";
  }
  function showExamError(msg) {
    examErrorEl.hidden = false;
    examErrorEl.textContent = msg;
  }
  function backToSetup() {
    examErrorEl.hidden = true;
    showPanel("setup");
  }

  // ---------- setup panel ----------
  function renderLevelChips() {
    if (examState.type === "conjugation") {
      examLevelChipsEl.hidden = true;
      examLevelChipsEl.innerHTML = "";
      return;
    }
    examLevelChipsEl.hidden = false;
    const cur = examState[examState.type].level;
    examLevelChipsEl.innerHTML = LEVELS.map(
      (l) => `<button class="chip ${l.toLowerCase()}${l === cur ? " active" : ""}" data-level="${l}">${l}</button>`
    ).join("");
    examLevelChipsEl.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        examState[examState.type].level = chip.dataset.level;
        examState[examState.type].lessons = [];
        renderLevelChips();
        renderLessonChips();
      });
    });
  }

  function renderLessonChips() {
    const type = examState.type;
    if (type === "conjugation") {
      const selected = examState.conjugation.forms;
      const allActive = selected.length === 0;
      const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-form="all">${t("allForms")}</button>`;
      const chips = FORM_KEYS.map(
        (f) => `<button class="chip lesson-chip${selected.includes(f) ? " active" : ""}" data-form="${f}">${FORM_LABELS[f]}</button>`
      ).join("");
      examLessonChipsEl.hidden = false;
      examLessonChipsEl.innerHTML = allChip + chips;
      examLessonChipsEl.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          if (chip.dataset.form === "all") {
            examState.conjugation.forms = [];
          } else {
            const f = chip.dataset.form;
            const idx = examState.conjugation.forms.indexOf(f);
            if (idx === -1) examState.conjugation.forms.push(f);
            else examState.conjugation.forms.splice(idx, 1);
          }
          renderLessonChips();
        });
      });
      return;
    }
    const level = examState[type].level;
    const lessonNums = type === "vocab" ? vocabLessonNums(level) : grammarLessonNums(level);
    const lessonTitles = type === "vocab" ? (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {} : {};
    const selected = examState[type].lessons;
    if (!lessonNums.length) {
      examLessonChipsEl.hidden = true;
      examLessonChipsEl.innerHTML = "";
      return;
    }
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const chips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        return `<button class="chip lesson-chip${selected.includes(n) ? " active" : ""}" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    examLessonChipsEl.hidden = false;
    examLessonChipsEl.innerHTML = allChip + chips;
    examLessonChipsEl.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.lesson === "all") {
          examState[type].lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = examState[type].lessons.indexOf(n);
          if (idx === -1) examState[type].lessons.push(n);
          else examState[type].lessons.splice(idx, 1);
          examState[type].lessons.sort((a, b) => a - b);
        }
        renderLessonChips();
      });
    });
  }

  function renderSetupPanel() {
    const introKey = { vocab: "examIntroVocab", grammar: "examIntroGrammar", conjugation: "examIntroConjugation" }[examState.type];
    const noteKey = { vocab: "examNoteVocab", grammar: "examNoteGrammar", conjugation: "examNoteConjugation" }[examState.type];
    document.getElementById("exam-setup-intro").textContent = t(introKey);
    document.getElementById("exam-setup-note").textContent = t(noteKey);
    examErrorEl.hidden = true;
    renderLevelChips();
    renderLessonChips();
  }

  const examTypeToggleBtns = document.querySelectorAll("#exam-type-toggle .dir-btn");
  examTypeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      examTypeToggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      examState.type = btn.dataset.examType;
      showPanel("setup");
      renderSetupPanel();
    });
  });

  examGenerateBtn.addEventListener("click", () => {
    examErrorEl.hidden = true;
    if (examState.type === "vocab") startVocabExam();
    else if (examState.type === "grammar") startGrammarExam();
    else startConjugationExam();
  });

  // ---------- generic linear exam runner ----------
  // Unlike the mastery-queue quiz engine in app.js (setupQuizMode), an exam
  // asks each question exactly once, tallies a score, and reports pass/fail
  // against a threshold — it never requeues wrong answers.
  let runnerCtx = null;

  function resetRunnerCardUI() {
    runnerEls.tag.hidden = true;
    runnerEls.optionsWrap.hidden = true;
    runnerEls.optionsWrap.innerHTML = "";
    runnerEls.furiganaWrap.hidden = true;
    runnerEls.furiganaField.value = "";
    runnerEls.furiganaField.disabled = false;
    runnerEls.furiganaField.classList.remove("exam-input-correct", "exam-input-wrong");
    runnerEls.revealBtn.hidden = true;
    runnerEls.answerEl.hidden = true;
    runnerEls.answerEl.textContent = "";
    runnerEls.gradeButtons.hidden = true;
  }

  function updateRunnerProgress() {
    if (!runnerCtx) return;
    runnerEls.progressEl.textContent = `${Math.min(runnerCtx.index, runnerCtx.total)} / ${runnerCtx.total}`;
  }

  function runExam(questions, config) {
    runnerCtx = { queue: questions.slice(), index: 0, total: questions.length, correct: 0, config };
    runnerEls.phaseTag.textContent = config.phaseTagText || "";
    showPanel("runner");
    showNextRunnerQuestion();
  }

  function showNextRunnerQuestion() {
    resetRunnerCardUI();
    const ctx = runnerCtx;
    if (!ctx) return;
    updateRunnerProgress();
    if (ctx.index >= ctx.total) {
      finishRunner();
      return;
    }
    const item = ctx.queue[ctx.index];
    runnerEls.tag.textContent = item.tag || "";
    runnerEls.sentence.textContent = item.jp;
    runnerEls.hint.textContent = item.en || "";
    if (item.type === "choice") {
      runnerEls.optionsWrap.hidden = false;
      item.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "gp-option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => handleChoiceAnswer(idx));
        runnerEls.optionsWrap.appendChild(btn);
      });
    } else if (item.type === "furigana") {
      runnerEls.furiganaWrap.hidden = false;
      setTimeout(() => runnerEls.furiganaField.focus(), 0);
    } else {
      runnerEls.revealBtn.hidden = false;
    }
  }

  function handleChoiceAnswer(idx) {
    const ctx = runnerCtx;
    const item = ctx.queue[ctx.index];
    runnerEls.tag.hidden = false;
    [...runnerEls.optionsWrap.children].forEach((b, i) => {
      b.disabled = true;
      if (i === item.correct) b.classList.add("correct");
      else if (i === idx) b.classList.add("wrong");
    });
    setTimeout(() => advanceRunner(idx === item.correct, item), 700);
  }

  function normalizeReading(str) {
    return (str || "").replace(/[()（）\s　]/g, "").trim();
  }

  function handleFuriganaSubmit() {
    const ctx = runnerCtx;
    if (!ctx || ctx.index >= ctx.total) return;
    const item = ctx.queue[ctx.index];
    const isCorrect = normalizeReading(runnerEls.furiganaField.value) === normalizeReading(item.answer);
    runnerEls.furiganaField.classList.add(isCorrect ? "exam-input-correct" : "exam-input-wrong");
    runnerEls.furiganaField.disabled = true;
    if (!isCorrect) {
      runnerEls.answerEl.hidden = false;
      runnerEls.answerEl.textContent = item.answer;
    }
    setTimeout(() => advanceRunner(isCorrect, item), isCorrect ? 350 : 1500);
  }
  runnerEls.furiganaSubmit.addEventListener("click", handleFuriganaSubmit);
  runnerEls.furiganaField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFuriganaSubmit();
    }
  });

  runnerEls.revealBtn.addEventListener("click", () => {
    const ctx = runnerCtx;
    const item = ctx.queue[ctx.index];
    runnerEls.tag.hidden = false;
    runnerEls.answerEl.hidden = false;
    runnerEls.answerEl.textContent = item.answer;
    runnerEls.revealBtn.hidden = true;
    runnerEls.gradeButtons.hidden = false;
  });
  runnerEls.gradeWrong.addEventListener("click", () => advanceRunner(false, runnerCtx.queue[runnerCtx.index]));
  runnerEls.gradeRight.addEventListener("click", () => advanceRunner(true, runnerCtx.queue[runnerCtx.index]));

  function advanceRunner(isCorrect, item) {
    const ctx = runnerCtx;
    if (!ctx) return;
    if (isCorrect) ctx.correct += 1;
    ctx.index += 1;
    if (!isCorrect && ctx.config.strictFailFast) {
      finishRunner({ failFastItem: item });
      return;
    }
    showNextRunnerQuestion();
  }

  function finishRunner(extra) {
    const ctx = runnerCtx;
    const total = ctx.total;
    const correct = ctx.correct;
    const pct = total ? correct / total : 1;
    const passed = pct >= ctx.config.passThreshold;
    showPanel("result");
    ctx.config.onDone({ correct, total, pct, passed, failFastItem: extra && extra.failFastItem });
  }

  function renderResultBanner(result, opts) {
    const pctDisplay = Math.round(result.pct * 100);
    examResultBannerEl.className = "exam-result-banner " + (result.passed ? "pass" : "fail");
    const scoreLine = result.total
      ? `<p class="exam-result-score">${result.correct} / ${result.total} (${pctDisplay}%)</p>`
      : "";
    const detailLine = `<p class="exam-result-detail">${result.passed ? opts.passText : opts.failText}</p>`;
    examResultBannerEl.innerHTML = scoreLine + detailLine;
    const actions = [];
    if (result.passed && opts.onNext) actions.push(`<button class="ghost-btn" id="exam-action-next">${opts.onNext.label}</button>`);
    if (!result.passed && opts.onRetry) actions.push(`<button class="ghost-btn" id="exam-action-retry">${opts.onRetry.label}</button>`);
    if (opts.onBack) actions.push(`<button class="text-link" id="exam-action-back">${opts.onBack.label}</button>`);
    examResultActionsEl.innerHTML = actions.join("");
    if (result.passed && opts.onNext) document.getElementById("exam-action-next").addEventListener("click", opts.onNext.fn);
    if (!result.passed && opts.onRetry) document.getElementById("exam-action-retry").addEventListener("click", opts.onRetry.fn);
    if (opts.onBack) document.getElementById("exam-action-back").addEventListener("click", opts.onBack.fn);
  }

  // ---------- Vocab exam ----------
  function vocabWordPool() {
    const data = window.VOCAB_DATA || {};
    const pool = [];
    Object.keys(data).forEach((level) => {
      (data[level] || []).forEach((item) => pool.push({ ...item, level }));
    });
    return pool;
  }
  function vocabSelectedWords() {
    const { level, lessons } = examState.vocab;
    const items = vocabItemsForLevel(level).map((i) => ({ ...i, level }));
    return lessons.length ? items.filter((i) => lessons.includes(i.lesson)) : items;
  }
  function cappedPool(pool, cap) {
    return pool.length <= cap ? pool : shuffle(pool).slice(0, cap);
  }

  async function requestVocabDistractors(words, pool) {
    const targetList = words.map((w) => `${w.word}|${w.reading || w.word}`).join("\n");
    const poolList = cappedPool(pool, 500)
      .map((w) => `${w.word}|${w.reading || w.word}|${w.meaning}`)
      .join("\n");
    const prompt = `You are building a JLPT-style Japanese vocabulary multiple-choice exam.

TARGET WORDS (one per line, "word|reading"):
${targetList}

CANDIDATE WORD POOL (one per line, "word|reading|meaning") — pick distractors ONLY from this exact list, copying the "word" field character-for-character:
${poolList}

For EVERY target word, choose exactly 3 distractor words from the candidate pool (never the target word itself, never duplicated within one target's list) that would plausibly confuse a learner. Split roughly evenly between two kinds of confusion:
- "form": words that look or sound similar (similar kanji shape, similar reading/pronunciation) to the target, so a learner might misread the target as one of these.
- "meaning": words with a related, overlapping, or easily-mixed-up meaning to the target (near-synonyms, same category), so a learner might know it's "close" but pick the wrong one.
Return exactly one entry per target word, in the same order as the target list.`;
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          word: { type: "string" },
          distractors: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
          confusionType: { type: "string", enum: ["form", "meaning"] },
        },
        required: ["word", "distractors", "confusionType"],
      },
    };
    const data = await callGemini(prompt, schema);
    const map = {};
    (Array.isArray(data) ? data : []).forEach((entry) => {
      if (entry && typeof entry.word === "string") map[entry.word] = entry;
    });
    return map;
  }

  function shuffleWithCorrect(correctText, wrongTexts) {
    const all = [{ text: correctText, isCorrect: true }, ...wrongTexts.map((w) => ({ text: w, isCorrect: false }))];
    const shuffled = shuffle(all);
    return { options: shuffled.map((o) => o.text), correctIndex: shuffled.findIndex((o) => o.isCorrect) };
  }

  function buildVocabMcqQuestions(words, pool, distractorMap) {
    const poolByWord = {};
    pool.forEach((w) => {
      if (!poolByWord[w.word]) poolByWord[w.word] = w;
    });
    const questions = [];
    words.forEach((target) => {
      const entry = distractorMap[target.word];
      let distractorWords = entry && Array.isArray(entry.distractors) ? entry.distractors.filter((dw) => dw !== target.word && poolByWord[dw]).slice(0, 3) : [];
      if (distractorWords.length < 3) {
        const used = new Set([target.word, ...distractorWords]);
        const fallback = shuffle(pool.filter((w) => !used.has(w.word)));
        while (distractorWords.length < 3 && fallback.length) {
          const candidate = fallback.pop();
          if (!used.has(candidate.word)) {
            distractorWords.push(candidate.word);
            used.add(candidate.word);
          }
        }
      }
      const distractorItems = distractorWords.map((dw) => poolByWord[dw]).filter(Boolean);
      if (distractorItems.length < 3) return;

      // No furigana anywhere in this phase — it tests MEANING recognition
      // only. Showing the reading here would give the meaning-question away
      // for free (and defeats the point of the separate furigana phase).
      const direction = Math.random() < 0.5 ? "word-to-meaning" : "meaning-to-word";
      const tag = target.lesson !== undefined ? `${target.level} ・ ${target.lesson}課` : target.level;
      if (direction === "word-to-meaning") {
        const built = shuffleWithCorrect(target.meaning, distractorItems.map((d) => d.meaning));
        questions.push({
          type: "choice",
          jp: target.word,
          en: "",
          options: built.options,
          correct: built.correctIndex,
          tag,
        });
      } else {
        const built = shuffleWithCorrect(target.word, distractorItems.map((d) => d.word));
        questions.push({
          type: "choice",
          jp: t("examWhichWordMeans", { meaning: target.meaning }),
          en: "",
          options: built.options,
          correct: built.correctIndex,
          tag,
        });
      }
    });
    return questions;
  }

  // ---------- vocab exam: passed-lesson tracking (for the Home dashboard) ----------
  // Local-only (not part of cloud sync, same as the Gemini key) — an
  // independent "you cleared this lesson's exam" flag, keyed by level+lesson.
  // Once set it stays set; it doesn't un-mark itself if you later reset
  // your flashcard progress for that lesson.
  const VOCAB_EXAM_PASSED_KEY = "jpstudy_vocab_exam_passed_v1";
  function markLessonsExamPassed(level, words) {
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(VOCAB_EXAM_PASSED_KEY) || "{}");
    } catch (e) {
      store = {};
    }
    [...new Set(words.map((w) => w.lesson).filter((n) => n !== undefined))].forEach((n) => {
      store[`${level}::${n}`] = true;
    });
    try {
      localStorage.setItem(VOCAB_EXAM_PASSED_KEY, JSON.stringify(store));
    } catch (e) {
      /* ignore */
    }
  }

  async function startVocabExam() {
    const words = vocabSelectedWords();
    if (!words.length) {
      showExamError(t("examErrNoContent"));
      return;
    }
    if (!getGeminiKey()) {
      openGeminiKeyModal();
      return;
    }
    runVocabFuriganaPhase(words);
  }

  // Phase 1 — furigana, typed. Needs 100%: the moment one is wrong, the
  // exam just ends there (no auto-reshuffle-and-retry) — you'd generate a
  // fresh exam from setup if you want another attempt.
  function runVocabFuriganaPhase(words) {
    const testable = shuffle(words.filter((w) => w.reading && w.reading.trim()));
    if (!testable.length) {
      // nothing to test (all kana-only words) — treat as an automatic pass
      // straight through to phase 2.
      runVocabMcqPhase(words);
      return;
    }
    // No meaning hint here — this is the final-exam-style kanji-only reading
    // test. Showing the meaning would let you use it as a crutch to guess
    // the reading instead of actually recognizing the word.
    const questions = testable.map((w) => ({ type: "furigana", jp: w.word, en: "", answer: w.reading, tag: t("examPhase1Tag") }));
    runExam(questions, {
      phaseTagText: t("examPhase1Tag"),
      passThreshold: 1,
      strictFailFast: true,
      onDone: (result) => {
        if (result.passed) {
          renderResultBanner(result, {
            passText: t("examPhase1PassMsg"),
            failText: "",
            onNext: { label: t("examContinuePhase2"), fn: () => runVocabMcqPhase(words) },
            onBack: { label: t("examBackToSetup"), fn: backToSetup },
          });
        } else {
          renderResultBanner(result, {
            passText: "",
            failText: t("examPhase1FailMsg", {
              word: result.failFastItem ? result.failFastItem.jp : "",
              reading: result.failFastItem ? result.failFastItem.answer : "",
            }),
            onBack: { label: t("examBackToSetup"), fn: backToSetup },
          });
        }
      },
    });
  }

  // Phase 2 — MCQ meaning recognition. Needs 95%. Failing regenerates a
  // fresh set of questions via Gemini. Passing this is the whole exam
  // passing, since phase 1 already had to be cleared to get here.
  async function runVocabMcqPhase(words) {
    showPanel("loading");
    try {
      const pool = vocabWordPool();
      const distractorMap = await requestVocabDistractors(words, pool);
      const questions = buildVocabMcqQuestions(words, pool, distractorMap);
      if (!questions.length) throw { friendly: t("examErrEmpty") };
      runExam(shuffle(questions), {
        phaseTagText: t("examPhase2Tag"),
        passThreshold: 0.95,
        onDone: (result) => {
          if (result.passed) markLessonsExamPassed(examState.vocab.level, words);
          renderResultBanner(result, {
            passText: t("examAllPassedMsg"),
            failText: t("examPhase2FailMsg"),
            onRetry: { label: t("examTryAgain"), fn: () => runVocabMcqPhase(words) },
            onBack: { label: t("examBackToSetup"), fn: backToSetup },
          });
        },
      });
    } catch (err) {
      showPanel("setup");
      showExamError((err && err.friendly) || t("examErrUnknown"));
    }
  }

  // ---------- Grammar exam ----------
  function grammarSelectedPatterns() {
    const { level, lessons } = examState.grammar;
    const items = grammarPatternsForLevel(level);
    return lessons.length ? items.filter((i) => lessons.includes(i.lesson)) : items;
  }

  async function requestGrammarQuestions(patterns) {
    const QUESTIONS_PER_PATTERN = 3;
    const bank = window.GRAMMAR_PRACTICE || {};
    const patternBlocks = patterns
      .map((p) => {
        const examples = (p.examples || []).slice(0, 2).map((ex) => `  - ${ex.jp} (${ex.en})`).join("\n");
        const sample = (bank[p.pattern] || [])
          .slice(0, 2)
          .map((q) => `  - style reference (write a NEW sentence, don't copy): ${JSON.stringify(q)}`)
          .join("\n");
        return `Pattern: ${p.pattern}\nMeaning: ${p.meaning}\nUsage: ${p.usage}\nReal example sentences:\n${examples}\n${sample}`;
      })
      .join("\n\n");
    const prompt = `You are writing a Japanese grammar mock exam for a learner studying these grammar patterns (grounded in the real reference data below — use it so your sentences and correct answers stay accurate; don't invent new grammar facts):

${patternBlocks}

For EACH pattern above, write exactly ${QUESTIONS_PER_PATTERN} NEW practice questions (don't copy the style reference verbatim), mixing two types:
- "fill": a Japanese sentence with a blank marked "＿＿", an English translation, and the exact text that fills the blank as "answer".
- "choice": a Japanese sentence with a blank marked "＿＿", an English translation, exactly 4 short options, and the zero-based "correct" index of the right option.
Only test the pattern given for each block; keep sentences natural and at the same difficulty as the reference examples. Set "pattern" to the exact pattern string given.`;
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          pattern: { type: "string" },
          type: { type: "string", enum: ["fill", "choice"] },
          jp: { type: "string" },
          en: { type: "string" },
          answer: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          correct: { type: "integer" },
        },
        required: ["pattern", "type", "jp", "en"],
      },
    };
    const data = await callGemini(prompt, schema);
    const validPatterns = new Set(patterns.map((p) => p.pattern));
    const questions = [];
    (Array.isArray(data) ? data : []).forEach((q) => {
      if (!q || !validPatterns.has(q.pattern) || !q.jp) return;
      if (q.type === "choice") {
        if (!Array.isArray(q.options) || q.options.length < 2 || typeof q.correct !== "number" || q.correct < 0 || q.correct >= q.options.length) return;
        questions.push({ type: "choice", jp: q.jp, en: q.en || "", options: q.options, correct: q.correct, tag: q.pattern });
      } else if (q.type === "fill") {
        if (!q.answer) return;
        questions.push({ type: "fill", jp: q.jp, en: q.en || "", answer: q.answer, tag: q.pattern });
      }
    });
    return questions;
  }

  async function startGrammarExam() {
    const patterns = grammarSelectedPatterns();
    if (!patterns.length) {
      showExamError(t("examErrNoContent"));
      return;
    }
    if (!getGeminiKey()) {
      openGeminiKeyModal();
      return;
    }
    runGrammarExam(patterns);
  }

  async function runGrammarExam(patterns) {
    showPanel("loading");
    try {
      const questions = await requestGrammarQuestions(patterns);
      if (!questions.length) throw { friendly: t("examErrEmpty") };
      runExam(shuffle(questions), {
        phaseTagText: t("examGrammarTag"),
        passThreshold: 0.8,
        onDone: (result) => {
          renderResultBanner(result, {
            passText: t("examPassMsg"),
            failText: t("examFailMsg80"),
            onRetry: { label: t("examTryAgain"), fn: () => runGrammarExam(patterns) },
            onBack: { label: t("examBackToSetup"), fn: backToSetup },
          });
        },
      });
    } catch (err) {
      showPanel("setup");
      showExamError((err && err.friendly) || t("examErrUnknown"));
    }
  }

  // ---------- Conjugation exam ----------
  const MAX_CONJ_QUESTIONS = 20;

  function conjugationSelectedForms() {
    return examState.conjugation.forms.length ? examState.conjugation.forms : FORM_KEYS;
  }
  function conjugationGroundTruthCombos(forms) {
    const verbs = window.CONJUGATION_PRACTICE_VERBS || [];
    const combos = [];
    verbs.forEach((v) => {
      forms.forEach((f) => {
        if (v[f]) combos.push({ dict: v.dict, reading: v.reading, meaning: v.meaning, group: v.group, form: f, answer: v[f] });
      });
    });
    return combos;
  }
  function buildFallbackConjOptions(combo, allCombos) {
    const others = shuffle(allCombos.filter((c) => c.answer !== combo.answer && c.form === combo.form))
      .slice(0, 3)
      .map((c) => c.answer);
    const options = [combo.answer, ...others];
    while (options.length < 4) options.push(combo.answer + "…"); // pathological tiny-bank fallback
    return options.slice(0, 4);
  }

  async function requestConjugationQuestions(combos) {
    const lines = combos
      .map((c, i) => `${i}. dict=${c.dict}, reading=${c.reading}, meaning=${c.meaning}, form=${FORM_LABELS[c.form]}, CORRECT_CONJUGATED_FORM=${c.answer}`)
      .join("\n");
    const prompt = `You are writing a Japanese verb-conjugation mock exam. Below is a list of verbs with their VERIFIED correct conjugated form for a specific grammatical form — treat CORRECT_CONJUGATED_FORM as ground truth you must not alter.

${lines}

For EACH numbered item, write one natural Japanese example sentence using the verb's meaning in context, with a blank marked "＿＿" where the conjugated form (CORRECT_CONJUGATED_FORM) belongs, plus an English translation of the full sentence (with the blank filled in). Make roughly half the items type "choice" with exactly 4 options where one option is EXACTLY the given CORRECT_CONJUGATED_FORM and the other 3 are plausible-but-wrong conjugations of the SAME verb; the rest type "fill" with no options. Always return the item's "index" so answers can be matched back up.`;
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          index: { type: "integer" },
          type: { type: "string", enum: ["fill", "choice"] },
          jp: { type: "string" },
          en: { type: "string" },
          options: { type: "array", items: { type: "string" } },
        },
        required: ["index", "type", "jp", "en"],
      },
    };
    const data = await callGemini(prompt, schema);
    const questions = [];
    (Array.isArray(data) ? data : []).forEach((q) => {
      if (!q || typeof q.index !== "number" || !combos[q.index] || !q.jp) return;
      const combo = combos[q.index];
      const tag = `${FORM_LABELS[combo.form]} ・ ${combo.dict}`;
      if (q.type === "choice") {
        let options = Array.isArray(q.options) ? q.options.slice(0, 4) : [];
        // Ground truth always wins: if Gemini's options don't contain our
        // verified answer verbatim, replace them with safe local distractors —
        // conjugation correctness never depends on Gemini's own output.
        if (!options.includes(combo.answer)) options = buildFallbackConjOptions(combo, combos);
        const deduped = options.filter((o, i, arr) => arr.indexOf(o) === i);
        const shuffled = shuffle(deduped);
        const correct = shuffled.indexOf(combo.answer);
        if (correct === -1) return;
        questions.push({ type: "choice", jp: q.jp, en: q.en || "", options: shuffled, correct, tag });
      } else {
        questions.push({ type: "fill", jp: q.jp, en: q.en || "", answer: combo.answer, tag });
      }
    });
    return questions;
  }

  async function startConjugationExam() {
    const forms = conjugationSelectedForms();
    const combos = conjugationGroundTruthCombos(forms);
    if (!combos.length) {
      showExamError(t("examErrNoContent"));
      return;
    }
    if (!getGeminiKey()) {
      openGeminiKeyModal();
      return;
    }
    runConjugationExam(combos);
  }

  async function runConjugationExam(combos) {
    showPanel("loading");
    try {
      const sample = combos.length > MAX_CONJ_QUESTIONS ? shuffle(combos).slice(0, MAX_CONJ_QUESTIONS) : combos;
      const questions = await requestConjugationQuestions(sample);
      if (!questions.length) throw { friendly: t("examErrEmpty") };
      runExam(shuffle(questions), {
        phaseTagText: t("examConjugationTag"),
        passThreshold: 0.8,
        onDone: (result) => {
          renderResultBanner(result, {
            passText: t("examPassMsg"),
            failText: t("examFailMsg80"),
            onRetry: { label: t("examTryAgain"), fn: () => runConjugationExam(combos) },
            onBack: { label: t("examBackToSetup"), fn: backToSetup },
          });
        },
      });
    } catch (err) {
      showPanel("setup");
      showExamError((err && err.friendly) || t("examErrUnknown"));
    }
  }

  // ---------- public hooks for app.js ----------
  window.JPStudyExam = {
    onTabShow: updateKeyStatus,
    onLangChange() {
      updateKeyStatus();
      if (!examSetupEl.hidden) renderSetupPanel();
    },
  };

  updateKeyStatus();
  renderSetupPanel();
})();
