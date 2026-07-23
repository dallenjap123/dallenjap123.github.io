// Exam tab — mock tests for Vocab / Grammar / Conjugation, scoped to
// whichever lessons (or, for Conjugation, forms) you select. Entirely
// local: no API key, no network call, no external service. Content comes
// from hand-authored data files —
//   - Vocab meaning-in-context phase: js/data/vocab-exam-questions.js
//     (up to 10 questions per word; one is picked at random per attempt)
//   - Grammar: sampled from the existing js/data/grammar-practice-data.js
//   - Conjugation: sampled from the existing
//     js/data/conjugation-sentences-data.js
// See buildVocabClozeQuestions, buildGrammarQuestions, and
// buildConjugationQuestions.
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

  // ---------- furigana rendering ----------
  // Hand-authored sentences (in the data files) annotate every kanji run
  // with bracket notation, e.g. "毎日[まいにち]". Escape the raw text FIRST
  // regardless, then turn our own bracket syntax into <ruby> — so the only
  // HTML ever inserted is markup we control.
  const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
  }
  function furiganaToHtml(text) {
    return escapeHtml(text).replace(/([一-龯々〆〇]+)\[([^\]<>]+)\]/g, "<ruby>$1<rt>$2</rt></ruby>");
  }
  function stripFuriganaBrackets(text) {
    return String(text).replace(/\[[^\]]+\]/g, "");
  }

  // ---------- pronunciation audio (Web Speech API — no key, no backend) ----------
  // Speaks the sentence but NOT the answer: splitting on the blank marker
  // and queuing each half as its own utterance leaves a natural silent gap
  // where the blank goes, since speechSynthesis plays queued utterances
  // back to back with a brief pause between them.
  function speakExamSentence(rawJp) {
    if (window.JPStudySettings && window.JPStudySettings.isSilent()) return;
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return;
    const clean = stripFuriganaBrackets(rawJp);
    window.speechSynthesis.cancel();
    clean.split("＿＿").forEach((part) => {
      const trimmed = part.trim();
      if (!trimmed) return;
      try {
        const utter = new SpeechSynthesisUtterance(trimmed);
        utter.lang = "ja-JP";
        window.speechSynthesis.speak(utter);
      } catch (e) {
        /* speech synthesis unavailable — silently skip */
      }
    });
  }

  const examState = {
    type: "vocab", // vocab | grammar | conjugation
    vocab: { level: "N4", lessons: [], phase: "both" }, // phase: "both" | "1" | "2"
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
  const examLoadingTextEl = document.getElementById("exam-loading-text");
  const examRunnerEl = document.getElementById("exam-runner");
  const examResultEl = document.getElementById("exam-result");
  const examErrorEl = document.getElementById("exam-error");
  const examVocabPhaseToggleEl = document.getElementById("exam-vocab-phase-toggle");
  const examLevelChipsEl = document.getElementById("exam-level-chips");
  const examLessonChipsEl = document.getElementById("exam-lesson-chips");
  const examGenerateBtn = document.getElementById("exam-generate-btn");
  const examResultBannerEl = document.getElementById("exam-result-banner");
  const examResultActionsEl = document.getElementById("exam-result-actions");

  const runnerEls = {
    phaseTag: document.getElementById("exam-phase-tag"),
    tag: document.getElementById("exam-card-tag"),
    sentence: document.getElementById("exam-card-sentence"),
    audioBtn: document.getElementById("exam-audio-btn"),
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

  // ---------- panel switching ----------
  function showPanel(name) {
    examSetupEl.hidden = name !== "setup";
    examLoadingEl.hidden = name !== "loading";
    examRunnerEl.hidden = name !== "runner";
    examResultEl.hidden = name !== "result";
    if (name === "loading") examLoadingTextEl.textContent = t("examLoading");
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

  function renderVocabPhaseToggle() {
    if (!examVocabPhaseToggleEl) return;
    examVocabPhaseToggleEl.hidden = examState.type !== "vocab";
    examVocabPhaseToggleEl.querySelectorAll(".dir-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.vocabPhase === examState.vocab.phase);
    });
  }

  function renderSetupPanel() {
    const introKey = { vocab: "examIntroVocab", grammar: "examIntroGrammar", conjugation: "examIntroConjugation" }[examState.type];
    const noteKey = { vocab: "examNoteVocab", grammar: "examNoteGrammar", conjugation: "examNoteConjugation" }[examState.type];
    document.getElementById("exam-setup-intro").textContent = t(introKey);
    document.getElementById("exam-setup-note").textContent = t(noteKey);
    examErrorEl.hidden = true;
    renderVocabPhaseToggle();
    renderLevelChips();
    renderLessonChips();
  }

  if (examVocabPhaseToggleEl) {
    examVocabPhaseToggleEl.querySelectorAll(".dir-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        examState.vocab.phase = btn.dataset.vocabPhase;
        renderVocabPhaseToggle();
      });
    });
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
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    runnerEls.tag.hidden = true;
    runnerEls.audioBtn.hidden = true;
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
    if (item.type === "furigana") {
      // Plain text, no furigana rendering and no audio button — this phase
      // IS the reading test, so nothing here can give the reading away.
      runnerEls.sentence.textContent = item.jp;
    } else {
      runnerEls.sentence.innerHTML = furiganaToHtml(item.jp);
      runnerEls.audioBtn.hidden = false;
    }
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

  runnerEls.audioBtn.addEventListener("click", () => {
    const ctx = runnerCtx;
    if (!ctx || ctx.index >= ctx.total) return;
    speakExamSentence(ctx.queue[ctx.index].jp);
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
    const wrong = total - correct;
    const pct = total ? correct / total : 1;
    const usesMaxWrong = ctx.config.maxWrong !== undefined;
    const passed = usesMaxWrong ? wrong <= ctx.config.maxWrong : pct >= ctx.config.passThreshold;
    showPanel("result");
    ctx.config.onDone({ correct, total, pct, wrong, usesMaxWrong, passed, failFastItem: extra && extra.failFastItem });
  }

  function renderResultBanner(result, opts) {
    const pctDisplay = Math.round(result.pct * 100);
    examResultBannerEl.className = "exam-result-banner " + (result.passed ? "pass" : "fail");
    const scoreLine = result.total
      ? `<p class="exam-result-score">${result.correct} / ${result.total} (${
          result.usesMaxWrong ? `${result.wrong} ${t("examWrongLabel")}` : `${pctDisplay}%`
        })</p>`
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
  function vocabSelectedWords() {
    const { level, lessons } = examState.vocab;
    const items = vocabItemsForLevel(level).map((i) => ({ ...i, level }));
    return lessons.length ? items.filter((i) => lessons.includes(i.lesson)) : items;
  }

  function shuffleWithCorrect(correctText, wrongTexts) {
    const all = [{ text: correctText, isCorrect: true }, ...wrongTexts.map((w) => ({ text: w, isCorrect: false }))];
    const shuffled = shuffle(all);
    return { options: shuffled.map((o) => o.text), correctIndex: shuffled.findIndex((o) => o.isCorrect) };
  }

  // Sentence-based question, read from js/data/vocab-exam-questions.js,
  // hand-authored per word (not generated). Each word can have several
  // question TYPES (kanji/reading recognition, usage, particle,
  // collocation, related-grammar — see that file's header) — one is
  // picked at random per attempt so repeat attempts don't feel identical
  // and, across a whole exam, the mix of types stays varied on its own.
  // `answer` defaults to the word itself (the plain kanji/reading-recognition
  // case); other types set `answer` explicitly to whatever's actually being
  // tested (a particle, a collocate, a related form, a full sentence for
  // "usage" questions). A word with no authored questions yet is simply
  // skipped rather than crashing.
  function buildVocabClozeQuestions(words, level) {
    const bank = (window.VOCAB_EXAM_QUESTIONS && window.VOCAB_EXAM_QUESTIONS[level]) || {};
    const questions = [];
    words.forEach((target) => {
      const bankQuestions = bank[target.word];
      if (!bankQuestions || !bankQuestions.length) return;
      const chosen = bankQuestions[Math.floor(Math.random() * bankQuestions.length)];
      const built = shuffleWithCorrect(chosen.answer || target.word, chosen.distractors);
      const tag = target.lesson !== undefined ? `${target.level} ・ ${target.lesson}課` : target.level;
      questions.push({ type: "choice", jp: chosen.sentence, en: "", options: built.options, correct: built.correctIndex, tag });
    });
    return questions;
  }

  // ---------- vocab exam: passed-lesson tracking (for the Home dashboard) ----------
  // Local-only (not part of cloud sync yet). Phase 1 and Phase 2 can now be
  // practiced independently, so each phase gets its own "cleared" flag,
  // keyed by level+lesson; the Home dashboard badge (VOCAB_EXAM_PASSED_KEY)
  // is a derived flag that only lights up once BOTH phases have been
  // cleared for a lesson — whether that happened in the same combined run
  // or across two separate practice sessions. Once a flag is set it stays
  // set; it doesn't un-mark itself if you later reset flashcard progress.
  const VOCAB_PHASE1_PASSED_KEY = "jpstudy_vocab_phase1_passed_v1";
  const VOCAB_PHASE2_PASSED_KEY = "jpstudy_vocab_phase2_passed_v1";
  const VOCAB_EXAM_PASSED_KEY = "jpstudy_vocab_exam_passed_v1";

  function readVocabPassedStore(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (e) {
      return {};
    }
  }
  function writeVocabPassedStore(key, store) {
    try {
      localStorage.setItem(key, JSON.stringify(store));
    } catch (e) {
      /* ignore */
    }
  }
  function vocabLessonKeys(level, words) {
    return [...new Set(words.map((w) => w.lesson).filter((n) => n !== undefined))].map((n) => `${level}::${n}`);
  }
  function refreshCombinedVocabBadge(level, words) {
    const phase1 = readVocabPassedStore(VOCAB_PHASE1_PASSED_KEY);
    const phase2 = readVocabPassedStore(VOCAB_PHASE2_PASSED_KEY);
    const badge = readVocabPassedStore(VOCAB_EXAM_PASSED_KEY);
    vocabLessonKeys(level, words).forEach((key) => {
      if (phase1[key] && phase2[key]) badge[key] = true;
    });
    writeVocabPassedStore(VOCAB_EXAM_PASSED_KEY, badge);
  }
  function markVocabPhasePassed(phaseKey, level, words) {
    const store = readVocabPassedStore(phaseKey);
    vocabLessonKeys(level, words).forEach((key) => {
      store[key] = true;
    });
    writeVocabPassedStore(phaseKey, store);
    refreshCombinedVocabBadge(level, words);
  }
  function isVocabBadgeSet(level, words) {
    const badge = readVocabPassedStore(VOCAB_EXAM_PASSED_KEY);
    const keys = vocabLessonKeys(level, words);
    return keys.length > 0 && keys.every((key) => badge[key]);
  }

  function startVocabExam() {
    const words = vocabSelectedWords();
    if (!words.length) {
      showExamError(t("examErrNoContent"));
      return;
    }
    const phase = examState.vocab.phase;
    if (phase === "2") {
      runVocabMcqPhase(words);
    } else {
      runVocabFuriganaPhase(words, { standalone: phase === "1" });
    }
  }

  // Phase 1 — furigana, typed. Needs 100% to pass, but no longer ends the
  // exam early on a mistake — you go through every selected word regardless,
  // then see your score and whether you cleared the 100% bar at the end
  // (same shape as Phase 2's maxWrong result). `standalone` is true when
  // practicing Phase 1 on its own from the setup toggle, rather than as the
  // first half of the combined two-phase exam — it just changes whether a
  // pass offers to continue into Phase 2 or simply reports the result.
  function runVocabFuriganaPhase(words, opts) {
    const standalone = !!(opts && opts.standalone);
    const testable = shuffle(words.filter((w) => w.reading && w.reading.trim()));
    if (!testable.length) {
      if (standalone) {
        showExamError(t("examErrEmpty"));
        return;
      }
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
      maxWrong: 0,
      onDone: (result) => {
        let passText = standalone ? t("examPhase1StandalonePassMsg") : t("examPhase1PassMsg");
        if (result.passed) {
          markVocabPhasePassed(VOCAB_PHASE1_PASSED_KEY, examState.vocab.level, words);
          if (standalone && isVocabBadgeSet(examState.vocab.level, words)) passText = t("examAllPassedMsg");
        }
        renderResultBanner(result, {
          passText,
          failText: t("examPhase1FailMsg"),
          onNext: standalone ? undefined : { label: t("examContinuePhase2"), fn: () => runVocabMcqPhase(words) },
          onRetry: { label: t("examTryAgain"), fn: () => runVocabFuriganaPhase(words, opts) },
          onBack: { label: t("examBackToSetup"), fn: backToSetup },
        });
      },
    });
  }

  // Phase 2 — MCQ meaning-in-context recognition, from the hand-authored
  // bank (js/data/vocab-exam-questions.js). Allows at most 1 wrong answer
  // total, regardless of set size. Failing picks a fresh random set (new
  // question per word, where more than one is authored) rather than
  // repeating the exact same attempt. Can be reached either as the second
  // half of the combined exam or practiced standalone from the setup
  // toggle — either way, clearing it marks Phase 2 passed for these
  // lessons; the Home dashboard badge only lights up once Phase 1 has also
  // been cleared at some point (see markVocabPhasePassed).
  function runVocabMcqPhase(words) {
    const questions = buildVocabClozeQuestions(words, examState.vocab.level);
    if (!questions.length) {
      showPanel("setup");
      showExamError(t("examErrEmpty"));
      return;
    }
    runExam(shuffle(questions), {
      phaseTagText: t("examPhase2Tag"),
      maxWrong: 1,
      onDone: (result) => {
        let passText = t("examPhase2OnlyPassMsg");
        if (result.passed) {
          markVocabPhasePassed(VOCAB_PHASE2_PASSED_KEY, examState.vocab.level, words);
          if (isVocabBadgeSet(examState.vocab.level, words)) passText = t("examAllPassedMsg");
        }
        renderResultBanner(result, {
          passText,
          failText: t("examPhase2FailMsg"),
          onRetry: { label: t("examTryAgain"), fn: () => runVocabMcqPhase(words) },
          onBack: { label: t("examBackToSetup"), fn: backToSetup },
        });
      },
    });
  }

  // ---------- Grammar exam ----------
  function grammarSelectedPatterns() {
    const { level, lessons } = examState.grammar;
    const items = grammarPatternsForLevel(level);
    return lessons.length ? items.filter((i) => lessons.includes(i.lesson)) : items;
  }

  // Samples real questions straight from the existing curated Grammar
  // Practice bank (js/data/grammar-practice-data.js) — no generation
  // needed, that bank already has ~6 hand-written questions per pattern.
  const GRAMMAR_QUESTIONS_PER_PATTERN = 3;
  function buildGrammarQuestions(patterns) {
    const bank = window.GRAMMAR_PRACTICE || {};
    const questions = [];
    patterns.forEach((p) => {
      const bankQuestions = bank[p.pattern];
      if (!bankQuestions || !bankQuestions.length) return;
      const tag = p.lesson !== undefined ? `${p.lesson}課　${p.pattern}` : p.pattern;
      shuffle(bankQuestions)
        .slice(0, Math.min(GRAMMAR_QUESTIONS_PER_PATTERN, bankQuestions.length))
        .forEach((q) => questions.push({ ...q, tag }));
    });
    return questions;
  }

  function startGrammarExam() {
    const patterns = grammarSelectedPatterns();
    if (!patterns.length) {
      showExamError(t("examErrNoContent"));
      return;
    }
    runGrammarExam(patterns);
  }

  function runGrammarExam(patterns) {
    const questions = buildGrammarQuestions(patterns);
    if (!questions.length) {
      showExamError(t("examErrEmpty"));
      return;
    }
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
  }

  // ---------- Conjugation exam ----------
  const MAX_CONJ_QUESTIONS = 20;

  function conjugationSelectedForms() {
    return examState.conjugation.forms.length ? examState.conjugation.forms : FORM_KEYS;
  }

  // Samples real questions straight from the existing curated Conjugation
  // "Sentences" bank (js/data/conjugation-sentences-data.js) — already
  // hand-checked, sentence-based, keyed by form.
  function buildConjugationQuestions(forms) {
    const bank = window.CONJUGATION_SENTENCES || {};
    const questions = [];
    forms.forEach((f) => {
      (bank[f] || []).forEach((q) => questions.push({ ...q, tag: FORM_LABELS[f] || f }));
    });
    return questions;
  }

  function startConjugationExam() {
    runConjugationExam(conjugationSelectedForms());
  }

  function runConjugationExam(forms) {
    const all = buildConjugationQuestions(forms);
    if (!all.length) {
      showExamError(t("examErrEmpty"));
      return;
    }
    const questions = all.length > MAX_CONJ_QUESTIONS ? shuffle(all).slice(0, MAX_CONJ_QUESTIONS) : all;
    runExam(shuffle(questions), {
      phaseTagText: t("examConjugationTag"),
      passThreshold: 0.8,
      onDone: (result) => {
        renderResultBanner(result, {
          passText: t("examPassMsg"),
          failText: t("examFailMsg80"),
          onRetry: { label: t("examTryAgain"), fn: () => runConjugationExam(forms) },
          onBack: { label: t("examBackToSetup"), fn: backToSetup },
        });
      },
    });
  }

  // ---------- public hooks for app.js ----------
  window.JPStudyExam = {
    onTabShow() {},
    onLangChange() {
      if (!examSetupEl.hidden) renderSetupPanel();
    },
  };

  renderSetupPanel();
})();
