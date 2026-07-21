(function () {
  // ---------- UI language (chrome only — not vocab/grammar content) ----------
  const LANG_KEY = "jpstudy_lang_v1";
  let currentLang = "en";
  try {
    currentLang = localStorage.getItem(LANG_KEY) || "en";
  } catch (e) {
    currentLang = "en";
  }
  if (!window.I18N || !window.I18N[currentLang]) currentLang = "en";

  function t(key, vars) {
    const dict = (window.I18N && window.I18N[currentLang]) || {};
    let str = dict[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(`{${k}}`, vars[k]);
      });
    }
    return str;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });
  }

  // ---------- persisted right/wrong progress (per word, per browser) ----------
  const PROGRESS_KEY = "jpstudy_progress_v1";
  let progressStore = {};
  try {
    progressStore = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch (e) {
    progressStore = {}; // storage unavailable (private browsing etc.) — just won't persist
  }
  function getSyncSnapshot() {
    return {
      vocab: JSON.parse(JSON.stringify(progressStore)),
      grammar: JSON.parse(JSON.stringify(grammarProgressStore)),
      streak: JSON.parse(JSON.stringify(streakStore)),
    };
  }

  function applySyncSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return;
    if (snapshot.vocab && typeof snapshot.vocab === "object") {
      progressStore = snapshot.vocab;
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressStore)); } catch (e) {}
    }
    if (snapshot.grammar && typeof snapshot.grammar === "object") {
      grammarProgressStore = snapshot.grammar;
      try { localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(grammarProgressStore)); } catch (e) {}
    }
    if (snapshot.streak && typeof snapshot.streak === "object") {
      streakStore = snapshot.streak;
      try { localStorage.setItem(STREAK_KEY, JSON.stringify(streakStore)); } catch (e) {}
    }
    
    updateProgress();
    refreshWordList();
    if (state.flashcards.current) renderFace(state.flashcards.current);
    
    // FIX: Force the Dashboard to redraw so it instantly shows the newly synced data
    if (typeof renderDashboard === "function") renderDashboard();
  }

  function saveProgress(skipSyncHook) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressStore));
    } catch (e) {
      /* ignore — progress simply won't persist this session */
    }
    // js/sync.js (optional, loaded after this file) can set onLocalChange
    // to push every local update to the cloud. skipSyncHook=true is used
    // when WE are the ones applying data that just came FROM the cloud, so
    // we don't immediately push it right back (see set() below).
    if (!skipSyncHook && window.JPStudyProgress && typeof window.JPStudyProgress.onLocalChange === "function") {
      window.JPStudyProgress.onLocalChange(getSyncSnapshot());
    }
  }
  // Minimal API surface for optional cloud sync (js/sync.js). If that file
  // isn't present, or Firebase isn't configured, nothing calls into this
  // and the app behaves exactly as it does today — local-only.
  window.JPStudyProgress = {
    get() {
      return JSON.parse(JSON.stringify(progressStore));
    },
    getSyncSnapshot() {
      return getSyncSnapshot();
    },
    set(data) {
      if (data && typeof data === "object" && ("vocab" in data || "grammar" in data || "streak" in data)) {
        applySyncSnapshot(data);
        return;
      }
      progressStore = data && typeof data === "object" ? data : {};
      saveProgress(true);
      updateProgress();
      refreshWordList();
      if (state.flashcards.current) renderFace(state.flashcards.current);
    },
    onLocalChange: null,
    t: t, // t() is already defined above — exposed so js/sync.js can translate its own UI text
  };
  // id is level+lesson+word, so progress survives level/lesson filter changes
  // and only resets if you actually edit the word itself in vocab-data.js
  function wordId(item) {
    return `${item.level}::${item.lesson}::${item.word}`;
  }
  function getStats(item) {
    return progressStore[wordId(item)] || { correct: 0, wrong: 0 };
  }
  function recordGrade(item, isCorrect) {
    const id = wordId(item);
    const stats = progressStore[id] || { correct: 0, wrong: 0 };
    if (isCorrect) {
      stats.correct += 1;
    } else {
      stats.wrong += 1;
    }
    stats.lastSeen = new Date().toISOString();
    progressStore[id] = stats;
    saveProgress();
    recordStudyActivity();
  }
  // "Weak" is a pure right/wrong ratio: any word you've attempted at least
  // once where wrongs outnumber corrects.
  function isWeakByRatio(item) {
    const stats = getStats(item);
    if (stats.correct + stats.wrong === 0) return false; // no attempts yet
    return stats.wrong > stats.correct;
  }

  // ---------- persisted grammar practice progress (per pattern) ----------
  // Same shape as vocab progress, but keyed by pattern string (matches
  // grammar-data.js / grammar-practice-data.js exactly) instead of word id.
  // This is new — grammar practice was session-only before the dashboard
  // needed something to actually show. Conjugation stays session-only.
  const GRAMMAR_PROGRESS_KEY = "jpstudy_grammar_progress_v1";
  let grammarProgressStore = {};
  try {
    grammarProgressStore = JSON.parse(localStorage.getItem(GRAMMAR_PROGRESS_KEY) || "{}");
  } catch (e) {
    grammarProgressStore = {};
  }
  function saveGrammarProgress() {
    try {
      localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(grammarProgressStore));
    } catch (e) {
      /* ignore */
    }
    if (window.JPStudyProgress && typeof window.JPStudyProgress.onLocalChange === "function") {
      window.JPStudyProgress.onLocalChange(getSyncSnapshot());
    }
  }
  function getGrammarStats(pattern) {
    return grammarProgressStore[pattern] || { correct: 0, wrong: 0 };
  }
  function recordGrammarGrade(pattern, isCorrect) {
    const stats = grammarProgressStore[pattern] || { correct: 0, wrong: 0 };
    if (isCorrect) stats.correct += 1;
    else stats.wrong += 1;
    stats.lastSeen = new Date().toISOString();
    grammarProgressStore[pattern] = stats;
    saveGrammarProgress();
    recordStudyActivity();
  }

  // ---------- study streak (vocab + grammar activity only) ----------
  const STREAK_KEY = "jpstudy_streak_v1";
  let streakStore = { current: 0, longest: 0, lastDate: null };
  try {
    const saved = JSON.parse(localStorage.getItem(STREAK_KEY) || "null");
    if (saved) streakStore = saved;
  } catch (e) {
    /* ignore */
  }
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }
  function recordStudyActivity() {
    const today = todayStr();
    if (streakStore.lastDate === today) return; // already counted today
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streakStore.current = streakStore.lastDate === yesterday ? streakStore.current + 1 : 1;
    streakStore.longest = Math.max(streakStore.longest, streakStore.current);
    streakStore.lastDate = today;
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(streakStore));
    } catch (e) {
      /* ignore */
    }
    if (window.JPStudyProgress && typeof window.JPStudyProgress.onLocalChange === "function") {
      window.JPStudyProgress.onLocalChange(getSyncSnapshot());
    }
  }

  const state = {
    flashcards: {
      level: "all",
      lessons: [], // empty array = no lesson filter (all lessons); otherwise a list of selected lesson numbers
      isolateMode: false, // when true: deck is limited to low-ratio words, and grading doesn't touch persisted stats
      direction: "word-meaning",
      queue: [], // words still to show this session
      current: null, // word currently on screen
      masteredCount: 0, // retired this session (2 correct answers in a row)
      totalCount: 0,
      flipped: false,
    },
    grammar: { items: [], selectedIndex: null },
  };

  // ---------- view tabs ----------
  const tabs = document.querySelectorAll(".tab");
  const views = document.querySelectorAll(".view");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const target = tab.dataset.view;
      views.forEach((v) => v.classList.toggle("active", v.id === `${target}-view`));
      if (target === "wordlist" && typeof refreshWordList === "function") refreshWordList();
      if (target === "home" && typeof renderDashboard === "function") renderDashboard();
    });
  });

  // ---------- flashcards ----------
  const fcLevelChips = document.querySelectorAll("#fc-level-chips .chip");
  const fcLessonChipsEl = document.getElementById("fc-lesson-chips");
  const dirBtns = document.querySelectorAll("#fc-direction-toggle .dir-btn");
  const isolateToggleBtn = document.getElementById("fc-isolate-toggle");
  const isolateNoteEl = document.getElementById("isolate-note");
  const resetProgressBtn = document.getElementById("fc-reset-progress");
  const cardEl = document.getElementById("flashcard");
  const frontTextEl = document.getElementById("card-front-text");
  const backTextEl = document.getElementById("card-back-text");
  const backReadingEl = document.getElementById("card-back-reading");
  const cardHintEl = document.getElementById("card-hint");
  const gradeButtonsEl = document.getElementById("grade-buttons");
  const gradeWrongBtn = document.getElementById("grade-wrong");
  const gradeRightBtn = document.getElementById("grade-right");
  const progressEl = document.getElementById("fc-progress");

  function buildDeck(level, lessons, isolateMode) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    let items = levels.flatMap((l) => (data[l] || []).map((item) => ({ ...item, level: l })));
    if (lessons && lessons.length) {
      items = items.filter((item) => lessons.includes(item.lesson));
    }
    if (isolateMode) {
      items = items.filter((item) => isWeakByRatio(item));
    }
    return items;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderFace(item) {
    const fc = state.flashcards;
    if (fc.direction === "word-meaning") {
      frontTextEl.textContent = item.word;
      backTextEl.textContent = item.meaning;
      backReadingEl.textContent = item.reading;
    } else {
      frontTextEl.textContent = item.meaning;
      backTextEl.textContent = item.word;
      backReadingEl.textContent = item.reading;
    }
  }

  function resetCardVisual() {
    // Freeze the flip transition while we reset, so a card that was
    // showing its back never reveals the next card's content mid-rotation.
    cardEl.classList.add("no-anim");
    cardEl.classList.remove("flipped");
    state.flashcards.flipped = false;
    gradeButtonsEl.hidden = true;
    cardHintEl.hidden = false;
    void cardEl.offsetWidth; // force layout before re-enabling transitions
    cardEl.classList.remove("no-anim");
  }

  function flashcardEmptyText() {
    const fc = state.flashcards;
    if (fc.totalCount) return t("allMastered");
    return fc.isolateMode ? t("noWeakWords") : t("noCards");
  }

  function updateProgress() {
    const fc = state.flashcards;
    progressEl.textContent = fc.totalCount ? t("masteredProgress", { n: fc.masteredCount, total: fc.totalCount }) : "0 / 0";
    if (!fc.current) {
      frontTextEl.textContent = flashcardEmptyText();
    }
  }

  // Redraws the CURRENT card (e.g. after a direction toggle) without
  // advancing the queue.
  function renderCurrentFace() {
    const fc = state.flashcards;
    resetCardVisual();
    if (!fc.current) {
      cardHintEl.hidden = true;
      frontTextEl.textContent = flashcardEmptyText();
      return;
    }
    renderFace(fc.current);
  }

  // Pulls the next word off the queue and shows it. Called on session
  // start, after every grade, and after skip.
  function showNextCard() {
    const fc = state.flashcards;
    resetCardVisual();
    if (!fc.queue.length) {
      fc.current = null;
      frontTextEl.textContent = flashcardEmptyText();
      backTextEl.textContent = "";
      backReadingEl.textContent = "";
      cardHintEl.hidden = true;
      updateProgress();
      return;
    }
    fc.current = fc.queue.shift();
    renderFace(fc.current);
    updateProgress();
  }

  // Builds a fresh study queue from the current level/lesson/weak filters
  // and resets session progress (mastered count starts back at 0 — it's a
  // per-session tally, separate from the persisted right/wrong stats).
  function startSession() {
    const fc = state.flashcards;
    const items = buildDeck(fc.level, fc.lessons, fc.isolateMode).map((item) => ({ ...item, streak: 0 }));
    fc.queue = items;
    fc.totalCount = items.length;
    fc.masteredCount = 0;
    fc.current = null;
    showNextCard();
  }

  // Wrong → reinsert a few cards ahead so it resurfaces soon.
  // Right → push to the back; after 2 correct answers in a row this
  // session, retire it instead of requeueing (mastered for now).
  // In isolate mode, the queue behavior is identical but recordGrade is
  // skipped — this is deliberately extra practice on already-known-weak
  // words, and shouldn't be able to move the ratio that got them flagged.
  function gradeCurrent(isCorrect) {
    const fc = state.flashcards;
    const item = fc.current;
    if (!item || !fc.flipped) return;
    if (!fc.isolateMode) {
      recordGrade(item, isCorrect);
    }
    if (isCorrect) {
      item.streak = (item.streak || 0) + 1;
      if (item.streak >= 2) {
        fc.masteredCount += 1;
      } else {
        fc.queue.push(item);
      }
    } else {
      item.streak = 0;
      const insertPos = Math.min(3, fc.queue.length);
      fc.queue.splice(insertPos, 0, item);
    }
    showNextCard();
  }

  function renderLessonChips(level) {
    const data = window.VOCAB_DATA || {};
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    // Lessons are scoped to a single level (numbering can repeat across
    // levels), so the lesson filter only appears once a specific level
    // (not "All") is selected.
    if (level === "all") {
      fcLessonChipsEl.innerHTML = "";
      fcLessonChipsEl.hidden = true;
      return;
    }
    const items = data[level] || [];
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort(
      (a, b) => a - b
    );
    if (!lessonNums.length) {
      fcLessonChipsEl.innerHTML = "";
      fcLessonChipsEl.hidden = true;
      return;
    }
    fcLessonChipsEl.hidden = false;
    const selected = state.flashcards.lessons;
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    // Each lesson chip toggles independently — click to add/remove it from
    // the selection, so you can study several 課 together at once.
    const lessonChips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        const isActive = selected.includes(n);
        return `<button class="chip lesson-chip${isActive ? " active" : ""}" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    fcLessonChipsEl.innerHTML = allChip + lessonChips;
    fcLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.lesson === "all") {
          state.flashcards.lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = state.flashcards.lessons.indexOf(n);
          if (idx === -1) {
            state.flashcards.lessons.push(n);
          } else {
            state.flashcards.lessons.splice(idx, 1);
          }
          state.flashcards.lessons.sort((a, b) => a - b);
        }
        renderLessonChips(level);
        startSession();
      });
    });
  }

  fcLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      fcLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.flashcards.level = chip.dataset.level;
      state.flashcards.lessons = [];
      renderLessonChips(chip.dataset.level);
      startSession();
    });
  });

  dirBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dirBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.flashcards.direction = btn.dataset.direction;
      renderCurrentFace();
    });
  });

  isolateToggleBtn.addEventListener("click", () => {
    state.flashcards.isolateMode = !state.flashcards.isolateMode;
    isolateToggleBtn.classList.toggle("active", state.flashcards.isolateMode);
    isolateNoteEl.hidden = !state.flashcards.isolateMode;
    startSession();
  });

resetProgressBtn.addEventListener("click", () => {
    const fc = state.flashcards;
    
    // Change the warning message depending on what is selected
    let confirmMsg = "This clears your right/wrong progress for the currently selected lessons. Continue?";
    if (fc.level === "all" && (!fc.lessons || fc.lessons.length === 0)) {
      confirmMsg = "This clears your right/wrong progress for EVERY word. Continue?";
    }
    
    if (!window.confirm(confirmMsg)) return;

    const now = new Date().toISOString();
    
    // Build a list of all words in the currently selected level & lessons
    // (We pass 'false' at the end to make sure we grab ALL words in the lesson, not just weak ones)
    const targetItems = buildDeck(fc.level, fc.lessons, false);
    
    // Overwrite only the selected words with 0s and a new timestamp
    targetItems.forEach(item => {
      const id = wordId(item);
      progressStore[id] = { correct: 0, wrong: 0, lastSeen: now };
    });

    saveProgress();
    startSession();
    
    // Force the dashboard to redraw immediately in the background
    if (typeof renderDashboard === "function") renderDashboard();
  });

  cardEl.addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.current) return;
    fc.flipped = !fc.flipped;
    cardEl.classList.toggle("flipped", fc.flipped);
    gradeButtonsEl.hidden = !fc.flipped;
    cardHintEl.hidden = fc.flipped;
  });

  gradeWrongBtn.addEventListener("click", () => gradeCurrent(false));
  gradeRightBtn.addEventListener("click", () => gradeCurrent(true));

  document.getElementById("fc-shuffle").addEventListener("click", () => {
    state.flashcards.queue = shuffle(state.flashcards.queue);
  });

  document.getElementById("fc-skip").addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.current) return;
    fc.queue.push(fc.current);
    showNextCard();
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("flashcards-view").classList.contains("active")) return;
    const fc = state.flashcards;
    if (e.code === "Space") {
      e.preventDefault();
      cardEl.click();
    } else if (fc.flipped && e.code === "ArrowRight") {
      gradeCurrent(true);
    } else if (fc.flipped && e.code === "ArrowLeft") {
      gradeCurrent(false);
    }
  });

  renderLessonChips(state.flashcards.level);
  startSession();

  // ---------- grammar ----------
  const grLevelChips = document.querySelectorAll("#gr-level-chips .chip");
  const grammarListEl = document.getElementById("grammar-list");
  const grammarDetailEl = document.getElementById("grammar-detail");

  function renderGrammarList(level) {
    const items = (window.GRAMMAR_DATA && window.GRAMMAR_DATA[level]) || [];
    state.grammar.items = items;
    state.grammar.selectedIndex = null;
    grammarListEl.innerHTML = "";
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "grammar-item";
      li.textContent = item.lesson !== undefined ? `${item.lesson}課　${item.pattern}` : item.pattern;
      li.tabIndex = 0;
      li.addEventListener("click", () => selectGrammarItem(i));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter") selectGrammarItem(i);
      });
      grammarListEl.appendChild(li);
    });
    grammarDetailEl.innerHTML = `<p class="grammar-empty">${t("selectPattern")}</p>`;
  }

  function selectGrammarItem(i) {
    state.grammar.selectedIndex = i;
    [...grammarListEl.children].forEach((li, idx) => li.classList.toggle("active", idx === i));
    const item = state.grammar.items[i];
    const examplesHtml = (item.examples || [])
      .map(
        (ex) => `
      <div class="example">
        <p class="example-jp">${ex.jp}</p>
        <p class="example-en">${ex.en}</p>
      </div>`
      )
      .join("");
    const lessonTag = item.lesson !== undefined ? `<span class="grammar-lesson-tag">${item.lesson}課</span>` : "";
    grammarDetailEl.innerHTML = `
      ${lessonTag}
      <p class="grammar-pattern">${item.pattern}</p>
      <p class="grammar-meaning">${item.meaning}</p>
      <p class="grammar-usage">${item.usage}</p>
      ${examplesHtml ? `<div class="examples">${examplesHtml}</div>` : ""}
    `;
  }

  grLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      grLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderGrammarList(chip.dataset.level);
    });
  });

  renderGrammarList("N5");

  const grModeToggle = document.querySelectorAll("#gr-mode-toggle .dir-btn");
  const grammarReferenceEl = document.getElementById("grammar-reference");
  const grammarPracticeEl = document.getElementById("grammar-practice");
  let grammarPracticeStarted = false;

  grModeToggle.forEach((btn) => {
    btn.addEventListener("click", () => {
      grModeToggle.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      grammarReferenceEl.classList.toggle("active", mode === "reference");
      grammarPracticeEl.classList.toggle("active", mode === "practice");
      if (mode === "practice" && !grammarPracticeStarted) {
        grammarPracticeStarted = true;
        renderGpLessonChips();
        gpQuiz.start(gpBuildDeck);
      }
    });
  });

  // ---------- reusable quiz engine ----------
  // Shared by Grammar Practice and Conjugation "Sentences" mode: both show a
  // Japanese sentence (fill-in-the-blank or multiple-choice), let the user
  // self-grade or pick an answer, and reuse the same wrong-requeues-soon /
  // right-retires-after-two mastery queue as everywhere else in the app.
  function setupQuizMode(ids, options) {
    const onGrade = (options && options.onGrade) || null; // optional: (item, isCorrect) => void, called before the mastery-queue logic runs
    const cardEl = document.getElementById(ids.card);
    const tagEl = document.getElementById(ids.tag);
    const sentenceEl = document.getElementById(ids.sentence);
    const hintEl = document.getElementById(ids.hint);
    const optionsEl = document.getElementById(ids.options);
    const revealBtn = document.getElementById(ids.reveal);
    const answerEl = document.getElementById(ids.answer);
    const gradeButtonsEl = document.getElementById(ids.gradeButtons);
    const gradeWrongBtn = document.getElementById(ids.gradeWrong);
    const gradeRightBtn = document.getElementById(ids.gradeRight);
    const progressEl = document.getElementById(ids.progress);
    const shuffleBtn = document.getElementById(ids.shuffle);
    const skipBtn = document.getElementById(ids.skip);

    const qs = { queue: [], current: null, revealed: false, masteredCount: 0, totalCount: 0 };

    function updateProgress() {
      progressEl.textContent = qs.totalCount ? t("masteredProgress", { n: qs.masteredCount, total: qs.totalCount }) : "0 / 0";
    }

    function resetCardUI() {
      qs.revealed = false;
      tagEl.hidden = true;
      optionsEl.hidden = true;
      optionsEl.innerHTML = "";
      revealBtn.hidden = true;
      answerEl.hidden = true;
      answerEl.textContent = "";
      gradeButtonsEl.hidden = true;
    }

    function showNext() {
      resetCardUI();
      if (!qs.queue.length) {
        qs.current = null;
        tagEl.textContent = "";
        sentenceEl.textContent = qs.totalCount ? t("allMastered") : t("noQuestions");
        hintEl.textContent = "";
        updateProgress();
        return;
      }
      const item = qs.queue.shift();
      qs.current = item;
      tagEl.textContent = item.tag || ""; // set now, but stays hidden (resetCardUI) until answered — avoids spoiling the question
      sentenceEl.textContent = item.jp;
      hintEl.textContent = item.en || "";
      if (item.type === "choice") {
        optionsEl.hidden = false;
        item.options.forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.className = "gp-option-btn";
          btn.textContent = opt;
          btn.addEventListener("click", () => handleChoice(idx));
          optionsEl.appendChild(btn);
        });
      } else {
        revealBtn.hidden = false;
      }
      updateProgress();
    }

    function grade(isCorrect) {
      const item = qs.current;
      if (!item) return;
      if (onGrade) onGrade(item, isCorrect);
      if (isCorrect) {
        item.streak = (item.streak || 0) + 1;
        if (item.streak >= 2) qs.masteredCount += 1;
        else qs.queue.push(item);
      } else {
        item.streak = 0;
        const pos = Math.min(3, qs.queue.length);
        qs.queue.splice(pos, 0, item);
      }
      showNext();
    }

    function handleChoice(idx) {
      if (qs.revealed || !qs.current) return;
      qs.revealed = true;
      tagEl.hidden = false;
      const item = qs.current;
      const buttons = [...optionsEl.children];
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === item.correct) b.classList.add("correct");
        else if (i === idx) b.classList.add("wrong");
      });
      const isCorrect = idx === item.correct;
      setTimeout(() => grade(isCorrect), 700);
    }

    revealBtn.addEventListener("click", () => {
      if (qs.revealed || !qs.current) return;
      qs.revealed = true;
      tagEl.hidden = false;
      answerEl.hidden = false;
      answerEl.textContent = qs.current.answer;
      revealBtn.hidden = true;
      gradeButtonsEl.hidden = false;
    });

    gradeWrongBtn.addEventListener("click", () => grade(false));
    gradeRightBtn.addEventListener("click", () => grade(true));

    if (shuffleBtn) shuffleBtn.addEventListener("click", () => { qs.queue = shuffle(qs.queue); });
    if (skipBtn)
      skipBtn.addEventListener("click", () => {
        if (!qs.current) return;
        qs.queue.push(qs.current);
        showNext();
      });

    function start(buildFn) {
      const items = buildFn().map((q) => ({ ...q, streak: 0 }));
      qs.queue = items;
      qs.totalCount = items.length;
      qs.masteredCount = 0;
      qs.current = null;
      showNext();
    }

    return { start, state: qs, cardEl };
  }

  // ---------- grammar: practice ----------
  const gpLessonChipsEl = document.getElementById("gp-lesson-chips");
  const gpState = { lessons: [] }; // empty = all lessons

  function patternLessonMap() {
    const map = {};
    ((window.GRAMMAR_DATA && window.GRAMMAR_DATA.N4) || []).forEach((e) => {
      if (e.lesson !== undefined) map[e.pattern] = e.lesson;
    });
    return map;
  }

  function gpBuildDeck() {
    const bank = window.GRAMMAR_PRACTICE || {};
    const lessonMap = patternLessonMap();
    const items = [];
    Object.keys(bank).forEach((pattern) => {
      const lesson = lessonMap[pattern];
      if (gpState.lessons.length && !gpState.lessons.includes(lesson)) return;
      bank[pattern].forEach((q) => {
        items.push({ ...q, tag: pattern });
      });
    });
    return items;
  }

  function renderGpLessonChips() {
    const lessonMap = patternLessonMap();
    const lessonNums = [...new Set(Object.values(lessonMap))].sort((a, b) => a - b);
    const selected = gpState.lessons;
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const chips = lessonNums
      .map((n) => {
        const isActive = selected.includes(n);
        return `<button class="chip lesson-chip${isActive ? " active" : ""}" data-lesson="${n}">${n}課</button>`;
      })
      .join("");
    gpLessonChipsEl.innerHTML = allChip + chips;
    gpLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.lesson === "all") {
          gpState.lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = gpState.lessons.indexOf(n);
          if (idx === -1) gpState.lessons.push(n);
          else gpState.lessons.splice(idx, 1);
          gpState.lessons.sort((a, b) => a - b);
        }
        renderGpLessonChips();
        gpQuiz.start(gpBuildDeck);
      });
    });
  }

  const gpQuiz = setupQuizMode(
    {
      card: "gp-card",
      tag: "gp-pattern-tag",
      sentence: "gp-sentence",
      hint: "gp-hint",
      options: "gp-options",
      reveal: "gp-reveal",
      answer: "gp-answer",
      gradeButtons: "gp-grade-buttons",
      gradeWrong: "gp-grade-wrong",
      gradeRight: "gp-grade-right",
      progress: "gp-progress",
      shuffle: "gp-shuffle",
      skip: "gp-skip",
    },
    { onGrade: (item, isCorrect) => recordGrammarGrade(item.tag, isCorrect) }
  );

  // ---------- word list ----------
  const wlLevelChips = document.querySelectorAll("#wl-level-chips .chip");
  const wordlistContainer = document.getElementById("wordlist-container");
  let currentWordListLevel = "all";

  function renderWordList(level) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    wordlistContainer.innerHTML = levels
      .map((l) => {
        const items = data[l] || [];
        if (!items.length) return "";
        const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[l]) || {};
        const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort(
          (a, b) => a - b
        );
        // words without a lesson number (if any) get grouped at the end
        const hasUnlabeled = items.some((item) => item.lesson === undefined);
        const groups = hasUnlabeled ? [...lessonNums, undefined] : lessonNums;

        const lessonBlocks = groups
          .map((lessonNum) => {
            const lessonItems = items.filter((item) => item.lesson === lessonNum);
            if (!lessonItems.length) return "";
            const heading =
              lessonNum === undefined
                ? "Other"
                : lessonTitles[lessonNum]
                ? `${lessonNum}課 ${lessonTitles[lessonNum]}`
                : `${lessonNum}課`;
            const rows = lessonItems
              .map((item) => {
                const idItem = { ...item, level: l };
                const rowClass = isWeakByRatio(idItem) ? ' class="wl-row-weak"' : "";
                return `
              <tr${rowClass}>
                <td class="wl-word">${item.word}</td>
                <td class="wl-reading">${item.reading}</td>
                <td class="wl-meaning">${item.meaning}</td>
              </tr>`;
              })
              .join("");
            return `
              <div class="wordlist-lesson-block">
                <h4 class="wordlist-lesson-heading">${heading}</h4>
                <table class="wordlist-table">
                  <thead><tr><th>${t("wlWord")}</th><th>${t("wlReading")}</th><th>${t("wlMeaning")}</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>`;
          })
          .join("");

        return `
          <div class="wordlist-group">
            <h3 class="wordlist-level-heading ${l.toLowerCase()}">${l}</h3>
            ${lessonBlocks}
          </div>`;
      })
      .join("");
  }

  wlLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      wlLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentWordListLevel = chip.dataset.level;
      renderWordList(currentWordListLevel);
    });
  });

  function refreshWordList() {
    renderWordList(currentWordListLevel);
  }

  renderWordList("all");

  // ---------- conjugation: reference ----------
  const conjModeToggle = document.querySelectorAll("#conj-mode-toggle .dir-btn");
  const conjReferenceEl = document.getElementById("conjugation-reference");
  const conjPracticeEl = document.getElementById("conjugation-practice");
  const conjugationListEl = document.getElementById("conjugation-list");
  const conjugationDetailEl = document.getElementById("conjugation-detail");

  function renderConjugationList() {
    const topics = window.CONJUGATION_TOPICS || [];
    conjugationListEl.innerHTML = "";
    topics.forEach((topic, i) => {
      const li = document.createElement("li");
      li.className = "grammar-item";
      li.textContent = `${topic.number}. ${topic.title}`;
      li.tabIndex = 0;
      li.addEventListener("click", () => selectConjugationTopic(i));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter") selectConjugationTopic(i);
      });
      conjugationListEl.appendChild(li);
    });
  }

  function conjTableHtml(topic, group) {
    if (topic.type === "classification") {
      const rows = group.rows
        .map(
          (row) => `
        <tr>
          <td class="conj-rule">${row.masu} → ${row.dict}</td>
          <td class="conj-examples">${row.examples.join("、")}</td>
        </tr>`
        )
        .join("");
      return `
        <table class="conjugation-table">
          <thead><tr><th>ます形 → 辞書形</th><th>例</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
    }
    const headerCells = ["dictionary form", ...topic.columns].map((c) => `<th>${c}</th>`).join("");
    const rows = group.examples
      .map((ex) => {
        const valueCells = ex.values.map((v) => `<td>${v}</td>`).join("");
        return `<tr><td class="conj-dict">${ex.dict}</td>${valueCells}</tr>`;
      })
      .join("");
    return `
      <table class="conjugation-table">
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function selectConjugationTopic(i) {
    const topics = window.CONJUGATION_TOPICS || [];
    const topic = topics[i];
    [...conjugationListEl.children].forEach((li, idx) => li.classList.toggle("active", idx === i));
    const groupBlocks = topic.groups
      .map(
        (group) => `
        <div class="conjugation-group">
          <h4 class="conjugation-group-label">Group ${group.label}${group.rule ? ` <span class="conj-rule-note">(${group.rule})</span>` : ""}</h4>
          ${conjTableHtml(topic, group)}
        </div>`
      )
      .join("");
    conjugationDetailEl.innerHTML = `
      <p class="grammar-pattern">${topic.title}</p>
      <p class="grammar-meaning">${topic.englishTitle}</p>
      ${topic.intro ? `<p class="grammar-usage">${topic.intro}</p>` : ""}
      ${groupBlocks}
      ${topic.note ? `<p class="conjugation-note">${topic.note}</p>` : ""}
    `;
  }

  conjModeToggle.forEach((btn) => {
    btn.addEventListener("click", () => {
      conjModeToggle.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      conjReferenceEl.classList.toggle("active", mode === "reference");
      conjPracticeEl.classList.toggle("active", mode === "practice");
      if (mode === "practice" && !conjPracticeStarted) {
        conjPracticeStarted = true;
        startConjPractice();
      }
    });
  });

  renderConjugationList();

  // ---------- conjugation: practice drill ----------
  // Session-only (not saved to localStorage) — this is a lighter-weight
  // drill than the vocab flashcards, reusing the same wrong-requeues-soon /
  // right-retires-after-two mechanic.
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
  const FORM_SEQUENCE = Object.keys(FORM_LABELS); // fixed teaching order, used by "By verb" mode
  const conjFormChips = document.querySelectorAll("#conj-form-chips .chip");
  const conjCardEl = document.getElementById("conj-card");
  const conjFormLabelEl = document.getElementById("conj-form-label");
  const conjFrontReadingEl = document.getElementById("conj-front-reading");
  const conjFrontTextEl = document.getElementById("conj-front-text");
  const conjFrontMeaningEl = document.getElementById("conj-front-meaning");
  const conjBackTextEl = document.getElementById("conj-back-text");
  const conjHintEl = document.getElementById("conj-hint");
  const conjGradeButtonsEl = document.getElementById("conj-grade-buttons");
  const conjGradeWrongBtn = document.getElementById("conj-grade-wrong");
  const conjGradeRightBtn = document.getElementById("conj-grade-right");
  const conjProgressEl = document.getElementById("conj-progress");
  let conjPracticeStarted = false;

  const conjState = { form: "all", queue: [], current: null, flipped: false, masteredCount: 0, totalCount: 0 };

  function buildConjDeck(form) {
    const verbs = window.CONJUGATION_PRACTICE_VERBS || [];
    const forms = form === "all" ? Object.keys(FORM_LABELS) : [form];
    const items = [];
    verbs.forEach((verb) => {
      forms.forEach((f) => {
        items.push({
          dict: verb.dict,
          reading: verb.reading,
          meaning: verb.meaning,
          group: verb.group,
          form: f,
          answer: verb[f],
        });
      });
    });
    return items;
  }

  function resetConjCardVisual() {
    conjCardEl.classList.add("no-anim");
    conjCardEl.classList.remove("flipped");
    conjState.flipped = false;
    conjGradeButtonsEl.hidden = true;
    conjHintEl.hidden = false;
    void conjCardEl.offsetWidth;
    conjCardEl.classList.remove("no-anim");
  }

  function conjEmptyText() {
    return conjState.totalCount ? t("allMastered") : t("noVerbs");
  }

  function updateConjProgress() {
    conjProgressEl.textContent = conjState.totalCount
      ? t("masteredProgress", { n: conjState.masteredCount, total: conjState.totalCount })
      : "0 / 0";
    if (!conjState.current) {
      conjFrontTextEl.textContent = conjEmptyText();
    }
  }

  function showNextConjCard() {
    resetConjCardVisual();
    if (!conjState.queue.length) {
      conjState.current = null;
      conjFormLabelEl.textContent = "";
      conjFrontReadingEl.textContent = "";
      conjFrontTextEl.textContent = conjEmptyText();
      conjFrontMeaningEl.textContent = "";
      conjBackTextEl.textContent = "";
      conjHintEl.hidden = true;
      updateConjProgress();
      return;
    }
    conjState.current = conjState.queue.shift();
    conjFormLabelEl.textContent = FORM_LABELS[conjState.current.form];
    conjFrontReadingEl.textContent = conjState.current.reading;
    conjFrontTextEl.textContent = conjState.current.dict;
    conjFrontMeaningEl.textContent = conjState.current.meaning;
    conjBackTextEl.textContent = conjState.current.answer;
    updateConjProgress();
  }

  function startConjPractice() {
    const items = buildConjDeck(conjState.form).map((item) => ({ ...item, streak: 0 }));
    conjState.queue = shuffle(items);
    conjState.totalCount = items.length;
    conjState.masteredCount = 0;
    conjState.current = null;
    showNextConjCard();
  }

  function gradeConjCurrent(isCorrect) {
    const item = conjState.current;
    if (!item || !conjState.flipped) return;
    if (isCorrect) {
      item.streak = (item.streak || 0) + 1;
      if (item.streak >= 2) {
        conjState.masteredCount += 1;
      } else {
        conjState.queue.push(item);
      }
    } else {
      item.streak = 0;
      const insertPos = Math.min(3, conjState.queue.length);
      conjState.queue.splice(insertPos, 0, item);
    }
    showNextConjCard();
  }

  conjFormChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      conjFormChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      conjState.form = chip.dataset.form;
      startConjPractice();
    });
  });

  conjCardEl.addEventListener("click", () => {
    if (!conjState.current) return;
    conjState.flipped = !conjState.flipped;
    conjCardEl.classList.toggle("flipped", conjState.flipped);
    conjGradeButtonsEl.hidden = !conjState.flipped;
    conjHintEl.hidden = conjState.flipped;
  });

  conjGradeWrongBtn.addEventListener("click", () => gradeConjCurrent(false));
  conjGradeRightBtn.addEventListener("click", () => gradeConjCurrent(true));

  document.getElementById("conj-shuffle").addEventListener("click", () => {
    conjState.queue = shuffle(conjState.queue);
  });

  document.getElementById("conj-skip").addEventListener("click", () => {
    if (!conjState.current) return;
    conjState.queue.push(conjState.current);
    showNextConjCard();
  });

  // ---------- conjugation: practice by verb ----------
  // Cycles ONE verb through all 8 forms in a fixed order, so you always
  // know what's coming next (the breadcrumb shows the whole sequence,
  // with the current form highlighted and finished ones marked ✓/✗).
  const conjPracticeModeToggle = document.querySelectorAll("#conj-practice-mode-toggle .dir-btn");
  const conjPracticeByFormEl = document.getElementById("conj-practice-by-form");
  const conjPracticeByVerbEl = document.getElementById("conj-practice-by-verb");
  const conjVerbSelectEl = document.getElementById("conj-verb-select");
  const conjVerbNextBtn = document.getElementById("conj-verb-next");
  const conjFormBreadcrumbEl = document.getElementById("conj-form-breadcrumb");
  const conjVerbCardEl = document.getElementById("conj-verb-card");
  const conjVerbFormLabelEl = document.getElementById("conj-verb-form-label");
  const conjVerbReadingEl = document.getElementById("conj-verb-reading");
  const conjVerbFrontTextEl = document.getElementById("conj-verb-front-text");
  const conjVerbMeaningEl = document.getElementById("conj-verb-meaning");
  const conjVerbBackTextEl = document.getElementById("conj-verb-back-text");
  const conjVerbHintEl = document.getElementById("conj-verb-hint");
  const conjVerbGradeButtonsEl = document.getElementById("conj-verb-grade-buttons");
  const conjVerbGradeWrongBtn = document.getElementById("conj-verb-grade-wrong");
  const conjVerbGradeRightBtn = document.getElementById("conj-verb-grade-right");
  const conjVerbProgressEl = document.getElementById("conj-verb-progress");
  let conjVerbPracticeStarted = false;

  const conjVerbState = { verb: null, formIndex: 0, results: [], flipped: false };

  function populateVerbSelect() {
    const verbs = window.CONJUGATION_PRACTICE_VERBS || [];
    const byGroup = { I: [], II: [], III: [] };
    verbs.forEach((v, i) => {
      if (byGroup[v.group]) byGroup[v.group].push(i);
    });
    conjVerbSelectEl.innerHTML = ["I", "II", "III"]
      .filter((g) => byGroup[g].length)
      .map((g) => {
        const options = byGroup[g]
          .map((i) => `<option value="${i}">${verbs[i].dict}（${verbs[i].reading}）— ${verbs[i].meaning}</option>`)
          .join("");
        return `<optgroup label="Group ${g}">${options}</optgroup>`;
      })
      .join("");
  }

  function renderVerbBreadcrumb() {
    conjFormBreadcrumbEl.innerHTML = FORM_SEQUENCE.map((f, i) => {
      let cls = "breadcrumb-item";
      if (i === conjVerbState.formIndex) cls += " current";
      else if (conjVerbState.results[i] === true) cls += " done-correct";
      else if (conjVerbState.results[i] === false) cls += " done-wrong";
      else cls += " upcoming";
      return `<span class="${cls}">${FORM_LABELS[f]}</span>`;
    }).join("");
  }

  function resetVerbCardVisual() {
    conjVerbCardEl.classList.add("no-anim");
    conjVerbCardEl.classList.remove("flipped");
    conjVerbState.flipped = false;
    conjVerbGradeButtonsEl.hidden = true;
    conjVerbHintEl.hidden = false;
    void conjVerbCardEl.offsetWidth;
    conjVerbCardEl.classList.remove("no-anim");
  }

  function showVerbCard() {
    resetVerbCardVisual();
    renderVerbBreadcrumb();
    const verb = conjVerbState.verb;
    if (conjVerbState.formIndex >= FORM_SEQUENCE.length) {
      const correctCount = conjVerbState.results.filter((r) => r === true).length;
      conjVerbFormLabelEl.textContent = "";
      conjVerbReadingEl.textContent = "";
      conjVerbFrontTextEl.textContent = t("doneWithVerb", { verb: verb.dict, n: correctCount });
      conjVerbMeaningEl.textContent = "";
      conjVerbBackTextEl.textContent = "";
      conjVerbHintEl.hidden = true;
      conjVerbProgressEl.textContent = t("verbProgress", { n: correctCount });
      return;
    }
    const form = FORM_SEQUENCE[conjVerbState.formIndex];
    conjVerbFormLabelEl.textContent = FORM_LABELS[form];
    conjVerbReadingEl.textContent = verb.reading;
    conjVerbFrontTextEl.textContent = verb.dict;
    conjVerbMeaningEl.textContent = verb.meaning;
    conjVerbBackTextEl.textContent = verb[form];
    conjVerbProgressEl.textContent = `${conjVerbState.formIndex + 1} / 8`;
  }

  function startVerbPractice(verbIndex) {
    const verbs = window.CONJUGATION_PRACTICE_VERBS || [];
    conjVerbState.verb = verbs[verbIndex];
    conjVerbState.formIndex = 0;
    conjVerbState.results = FORM_SEQUENCE.map(() => null);
    showVerbCard();
  }

  function gradeVerbCurrent(isCorrect) {
    if (!conjVerbState.verb || !conjVerbState.flipped) return;
    if (conjVerbState.formIndex >= FORM_SEQUENCE.length) return;
    conjVerbState.results[conjVerbState.formIndex] = isCorrect;
    conjVerbState.formIndex += 1;
    showVerbCard();
  }

  const conjPracticeSentencesEl = document.getElementById("conj-practice-sentences");
  let csPracticeStarted = false;

  conjPracticeModeToggle.forEach((btn) => {
    btn.addEventListener("click", () => {
      conjPracticeModeToggle.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.practiceMode;
      conjPracticeByFormEl.classList.toggle("active", mode === "by-form");
      conjPracticeByVerbEl.classList.toggle("active", mode === "by-verb");
      conjPracticeSentencesEl.classList.toggle("active", mode === "sentences");
      if (mode === "by-verb" && !conjVerbPracticeStarted) {
        conjVerbPracticeStarted = true;
        populateVerbSelect();
        startVerbPractice(0);
      }
      if (mode === "sentences" && !csPracticeStarted) {
        csPracticeStarted = true;
        renderCsFormChips();
        csQuiz.start(csBuildDeck);
      }
    });
  });

  // ---------- conjugation: sentence-based practice ----------
  const csFormChipsEl = document.getElementById("cs-form-chips");
  const csState = { form: "all" };

  function csBuildDeck() {
    const bank = window.CONJUGATION_SENTENCES || {};
    const forms = csState.form === "all" ? Object.keys(bank) : [csState.form];
    const items = [];
    forms.forEach((f) => {
      (bank[f] || []).forEach((q) => items.push({ ...q, tag: FORM_LABELS[f] || f }));
    });
    return items;
  }

  function renderCsFormChips() {
    const bank = window.CONJUGATION_SENTENCES || {};
    const forms = Object.keys(FORM_LABELS).filter((f) => bank[f] && bank[f].length);
    const allChip = `<button class="chip${csState.form === "all" ? " active" : ""}" data-form="all">${t("allForms")}</button>`;
    const chips = forms
      .map((f) => `<button class="chip${csState.form === f ? " active" : ""}" data-form="${f}">${FORM_LABELS[f]}</button>`)
      .join("");
    csFormChipsEl.innerHTML = allChip + chips;
    csFormChipsEl.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        csFormChipsEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        csState.form = chip.dataset.form;
        csQuiz.start(csBuildDeck);
      });
    });
  }

  const csQuiz = setupQuizMode({
    card: "cs-card",
    tag: "cs-form-tag",
    sentence: "cs-sentence",
    hint: "cs-hint",
    options: "cs-options",
    reveal: "cs-reveal",
    answer: "cs-answer",
    gradeButtons: "cs-grade-buttons",
    gradeWrong: "cs-grade-wrong",
    gradeRight: "cs-grade-right",
    progress: "cs-progress",
    shuffle: "cs-shuffle",
    skip: "cs-skip",
  });

  conjVerbSelectEl.addEventListener("change", () => {
    startVerbPractice(Number(conjVerbSelectEl.value));
  });

  conjVerbNextBtn.addEventListener("click", () => {
    const verbs = window.CONJUGATION_PRACTICE_VERBS || [];
    if (!verbs.length) return;
    const currentIdx = verbs.indexOf(conjVerbState.verb);
    const nextIdx = (currentIdx + 1) % verbs.length;
    conjVerbSelectEl.value = String(nextIdx);
    startVerbPractice(nextIdx);
  });

  conjVerbCardEl.addEventListener("click", () => {
    if (!conjVerbState.verb || conjVerbState.formIndex >= FORM_SEQUENCE.length) return;
    conjVerbState.flipped = !conjVerbState.flipped;
    conjVerbCardEl.classList.toggle("flipped", conjVerbState.flipped);
    conjVerbGradeButtonsEl.hidden = !conjVerbState.flipped;
    conjVerbHintEl.hidden = conjVerbState.flipped;
  });

  conjVerbGradeWrongBtn.addEventListener("click", () => gradeVerbCurrent(false));
  conjVerbGradeRightBtn.addEventListener("click", () => gradeVerbCurrent(true));

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("conjugation-view").classList.contains("active")) return;
    if (!conjPracticeEl.classList.contains("active")) return;
    const byVerbActive = conjPracticeByVerbEl.classList.contains("active");
    if (byVerbActive) {
      if (e.code === "Space") {
        e.preventDefault();
        conjVerbCardEl.click();
      } else if (conjVerbState.flipped && e.code === "ArrowRight") {
        gradeVerbCurrent(true);
      } else if (conjVerbState.flipped && e.code === "ArrowLeft") {
        gradeVerbCurrent(false);
      }
    } else {
      if (e.code === "Space") {
        e.preventDefault();
        conjCardEl.click();
      } else if (conjState.flipped && e.code === "ArrowRight") {
        gradeConjCurrent(true);
      } else if (conjState.flipped && e.code === "ArrowLeft") {
        gradeConjCurrent(false);
      }
    }
  });

  // ---------- language toggle ----------
  // Switches UI chrome only; re-renders whatever's currently on screen so
  // nobody has to reload or loses their place mid-session.
  const langToggleBtns = document.querySelectorAll("#lang-toggle .dir-btn");
  langToggleBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      try {
        localStorage.setItem(LANG_KEY, currentLang);
      } catch (e) {
        /* ignore — language choice just won't persist */
      }
      langToggleBtns.forEach((b) => b.classList.toggle("active", b === btn));
      applyTranslations();
      updateProgress();
      updateConjProgress();
      if (conjVerbState.verb) showVerbCard();
      refreshWordList();
      if (state.flashcards.level !== "all") renderLessonChips(state.flashcards.level);
      renderDashboard();
    });
  });

  // ---------- dashboard (home) ----------
  // Vocab only, by design — grammar and conjugation both stay out of this
  // view. Organized by level (tabs) then by lesson within that level,
  // matching how the vocab data itself is structured. Reads from the same
  // progress store used everywhere else — nothing new to keep in sync.
  const ALL_LEVELS = ["N5", "N4", "N3", "N2", "N1"];
  let dashSelectedLevel = "N4"; // the only populated level today; will still work once others are added

  function renderDashLessonBreakdown(level) {
    const items = (window.VOCAB_DATA && window.VOCAB_DATA[level]) || [];
    const container = document.getElementById("dash-lesson-breakdown");
    if (!items.length) {
      container.innerHTML = `<p class="dash-empty-note">${t("dashNoVocabYet")}</p>`;
      return;
    }
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
    const rows = lessonNums
      .map((n) => {
        const lessonItems = items.filter((item) => item.lesson === n);
        let studied = 0,
          correctSum = 0,
          totalSum = 0;
        lessonItems.forEach((item) => {
          const stats = getStats({ ...item, level });
          const attempts = stats.correct + stats.wrong;
          if (attempts > 0) {
            studied += 1;
            correctSum += stats.correct;
            totalSum += attempts;
          }
        });
        const total = lessonItems.length;
        const pct = total ? Math.round((studied / total) * 100) : 0;
        const meta = totalSum ? t("dashAccuracyLine", { pct: Math.round((correctSum / totalSum) * 100) }) : t("dashNotStartedYet");
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        return `
        <div class="dash-lesson-row">
          <div class="dash-lesson-row-header">
            <span class="dash-lesson-title">${title}</span>
            <span class="dash-lesson-count">${studied} / ${total}</span>
          </div>
          <div class="dash-progress-track"><div class="dash-progress-fill" style="width:${pct}%"></div></div>
          <p class="dash-subsection-meta">${meta}</p>
        </div>`;
      })
      .join("");
    container.innerHTML = `<div class="dash-lesson-list">${rows}</div>`;
  }

  function renderDashWeakList() {
    const weakVocab = [];
    ALL_LEVELS.forEach((level) => {
      ((window.VOCAB_DATA && window.VOCAB_DATA[level]) || []).forEach((item) => {
        const idItem = { ...item, level };
        const stats = getStats(idItem);
        if (stats.correct + stats.wrong > 0 && stats.wrong > stats.correct) {
          weakVocab.push({ word: item.word, meaning: item.meaning, gap: stats.wrong - stats.correct });
        }
      });
    });
    weakVocab.sort((a, b) => b.gap - a.gap);

    const listEl = document.getElementById("dash-weak-list");
    if (!weakVocab.length) {
      listEl.innerHTML = `<p class="dash-empty-note">${t("dashNoWeak")}</p>`;
      return;
    }
    listEl.innerHTML = `<ul class="dash-weak-simple-list">${weakVocab
      .slice(0, 10)
      .map((w) => `<li><span class="dash-weak-word">${w.word}</span><span class="dash-weak-meaning">${w.meaning}</span></li>`)
      .join("")}</ul>`;
  }

  const dashLevelTabs = document.querySelectorAll("#dash-level-tabs .chip");
  dashLevelTabs.forEach((chip) => {
    chip.addEventListener("click", () => {
      dashLevelTabs.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      dashSelectedLevel = chip.dataset.level;
      renderDashLessonBreakdown(dashSelectedLevel);
    });
  });

  function renderDashboard() {
    document.getElementById("dash-streak-number").textContent = streakStore.current;
    renderDashLessonBreakdown(dashSelectedLevel);
    renderDashWeakList();
  }

  renderDashboard();

  applyTranslations();
})();
