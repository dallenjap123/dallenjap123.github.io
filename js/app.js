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

  // ---------- settings: silent mode + theme ----------
  const SILENT_MODE_KEY = "jpstudy_silent_mode_v1";
  const THEME_KEY = "jpstudy_theme_v1";
  const COLOR_THEME_KEY = "jpstudy_color_theme_v1";
  const COLOR_THEMES = ["slate", "pastel", "warm", "sumi", "matcha"];
  let silentMode = false;
  try {
    silentMode = localStorage.getItem(SILENT_MODE_KEY) === "1";
  } catch (e) {
    silentMode = false;
  }
  let currentTheme = "light";
  try {
    currentTheme = localStorage.getItem(THEME_KEY) || "light";
  } catch (e) {
    currentTheme = "light";
  }
  let currentColorTheme = "slate";
  try {
    const saved = localStorage.getItem(COLOR_THEME_KEY);
    currentColorTheme = COLOR_THEMES.includes(saved) ? saved : "slate";
  } catch (e) {
    currentColorTheme = "slate";
  }
  function applyTheme() {
    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.dataset.colorTheme = currentColorTheme;
  }
  applyTheme();

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
    return progressStore[wordId(item)] || {};
  }
  // Each flashcard session shows a word exactly twice (see gradeCurrent) and
  // that single sitting decides its fate: both correct → mastered, anything
  // else → weak. No running right/wrong ratio, no cross-session streak —
  // just "did you get it, both times, just now."
  function recordSessionResult(item, masteredThisSitting) {
    const id = wordId(item);
    const stats = progressStore[id] || {};
    stats.mastered = masteredThisSitting;
    stats.weak = !masteredThisSitting;
    stats.lastSeen = new Date().toISOString();
    progressStore[id] = stats;
    saveProgress();
    recordStudyActivity();
  }
  // "Weak" = the last time you sat down with this word, you didn't get both
  // reps right. Clears the moment you master it in a later sitting.
  function isWeak(item) {
    return !!getStats(item).weak;
  }
  // "Mastered" = the last time you sat down with this word, you got both
  // reps right.
  function isMastered(item) {
    return !!getStats(item).mastered;
  }

  // ---------- persisted grammar practice progress (per pattern) ----------
  // Legacy: kept only so cloud-sync restores of older snapshots (which may
  // include a "grammar" field) don't lose data. Nothing writes to this
  // anymore now that Grammar Practice has been removed.
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
      shuffleOn: true,
      queue: [], // words still to show this session
      sessionItems: [], // full deck this session started with — stays intact while queue empties, so lesson-completion can be checked against it
      current: null, // word currently on screen
      masteredCount: 0, // retired this session (2 correct answers in a row)
      totalCount: 0,
      flipped: false,
    },
    grammar: { items: [], selectedIndex: null },
    kanjiWrite: {
      level: "all",
      lessons: [],
      isolateMode: false,
      shuffleOn: true,
      queue: [],
      sessionItems: [],
      current: null,
      revealed: false,
      masteredCount: 0,
      totalCount: 0,
    },
    furigana: {
      level: "all",
      lessons: [],
      isolateMode: false,
      shuffleOn: true,
      queue: [],
      sessionItems: [],
      current: null,
      submitted: false,
      masteredCount: 0,
      totalCount: 0,
    },
    grammarPractice: {
      level: "N4",
      lessons: [],
      srsOn: true,
      shuffleOn: true,
      queue: [],
      sessionItems: [],
      current: null,
      answered: false,
      masteredCount: 0,
      totalCount: 0,
    },
  };

  // ---------- view tabs ----------
  // Just 2 top-level tabs (Vocab / Grammar); Word List/Flashcards/Writing/
  // Furigana and Grammar/Conjugation each live as .subview sections switched
  // by their own in-view .subnav instead of eating a slot in the main tab bar.
  const tabs = document.querySelectorAll(".tab");
  const views = document.querySelectorAll(".view");
  const tabIndicatorEl = document.getElementById("tab-indicator");

  function moveTabIndicator(tab) {
    if (!tabIndicatorEl) return;
    if (!tab) {
      tabIndicatorEl.style.width = "0px";
      return;
    }
    tabIndicatorEl.style.left = `${tab.offsetLeft}px`;
    tabIndicatorEl.style.width = `${tab.offsetWidth}px`;
  }

  // Runs whenever the Word List/Flashcards/Writing subview becomes
  // visible, whether that's from clicking its own sub-tab or from
  // re-clicking "Vocab" while that subview was already selected.
  function vocabSubShow(sub) {
    if (sub === "wordlist" && typeof refreshWordList === "function") refreshWordList();
    if (sub === "kanjiwrite" && typeof kwOnTabShow === "function") kwOnTabShow();
    if (sub === "furigana" && state.furigana.current) {
      const fgFieldEl = document.getElementById("fg-field");
      if (fgFieldEl) setTimeout(() => fgFieldEl.focus(), 0);
    }
  }

  // ---------- lesson mastery tracking (Flashcards / Writing / Furigana) ----------
  // Each of the three vocab practice modes tracks its own "passed" set,
  // per level+lesson: a lesson counts as passed for a mode once every word
  // in it has gone through exactly two exposures in a single session with
  // both correct — same "twice, no do-overs" rule each mode already uses
  // for its own mastered/weak per-word tracking, just rolled up to the
  // lesson level. The Word List's golden-shine state (all three modes
  // passed) reads all three stores together.
  function makeLessonMastery(storageKey) {
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (e) {
      store = {};
    }
    function key(level, lesson) {
      return `${level}::${lesson}`;
    }
    return {
      isPassed(level, lesson) {
        return !!store[key(level, lesson)];
      },
      markPassed(level, lesson) {
        const k = key(level, lesson);
        if (store[k]) return false; // already marked — no need to re-save or re-celebrate
        store[k] = true;
        try {
          localStorage.setItem(storageKey, JSON.stringify(store));
        } catch (e) {
          /* ignore */
        }
        return true;
      },
    };
  }
  const fcMastery = makeLessonMastery("jpstudy_fc_lesson_passed_v1");
  const kwMastery = makeLessonMastery("jpstudy_kw_lesson_passed_v1");
  const fgMastery = makeLessonMastery("jpstudy_fg_lesson_passed_v1");
  // Grammar practice keeps its own store and deliberately stays OUT of
  // isFullyMastered below — that golden shine is the Word List's "you know
  // this vocab lesson" signal, and grammar lessons are numbered separately
  // from vocab lessons, so mixing them would make the gold meaningless.
  const gpMastery = makeLessonMastery("jpstudy_gp_lesson_passed_v1");

  function isFullyMastered(level, lesson) {
    return fcMastery.isPassed(level, lesson) && kwMastery.isPassed(level, lesson) && fgMastery.isPassed(level, lesson);
  }

  // Call after an item finishes its two exposures this session (attempts>=2).
  // sessionItems is the full deck the session started with (not the live
  // queue, which empties as you go) so we can tell whether every word from
  // this item's lesson has now also finished, all correct.
  function checkLessonComplete(mastery, sessionItems, level, lesson) {
    if (lesson === undefined) return;
    const lessonItems = sessionItems.filter((i) => i.level === level && i.lesson === lesson);
    if (!lessonItems.length) return;
    const allPassed = lessonItems.every((i) => i.attempts >= 2 && i.correctAttempts === 2);
    if (allPassed) mastery.markPassed(level, lesson);
  }

  function setupSubnav(navId, onShow) {
    const nav = document.getElementById(navId);
    const container = nav.parentElement;
    const btns = nav.querySelectorAll(".subnav-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const sub = btn.dataset.subview;
        container.querySelectorAll(".subview").forEach((el) => {
          el.classList.toggle("active", el.id === `${sub}-subview`);
        });
        if (onShow) onShow(sub);
      });
    });
  }
  setupSubnav("vocab-subnav", vocabSubShow);
  setupSubnav("grammar-subnav", null);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      moveTabIndicator(tab);
      const target = tab.dataset.view;
      views.forEach((v) => v.classList.toggle("active", v.id === `${target}-view`));
      if (target === "vocab") {
        const activeSub = document.querySelector("#vocab-view .subview.active");
        if (activeSub) vocabSubShow(activeSub.id.replace("-subview", ""));
      }
    });
  });

  moveTabIndicator(document.querySelector(".tab.active"));
  window.addEventListener("resize", () => moveTabIndicator(document.querySelector(".tab.active")));

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
      items = items.filter((item) => isWeak(item));
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

  // ---------- pronunciation audio (Web Speech API — no key, no backend) ----------
  function speakJapanese(text) {
    if (silentMode || !text || !window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return;
    try {
      window.speechSynthesis.cancel(); // don't stack up overlapping utterances
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      window.speechSynthesis.speak(utter);
    } catch (e) {
      /* speech synthesis unavailable on this browser — silently skip */
    }
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
    cardEl.classList.remove("flipped", "card-refresh");
    state.flashcards.flipped = false;
    gradeButtonsEl.hidden = true;
    cardHintEl.hidden = false;
    void cardEl.offsetWidth; // force layout before re-enabling transitions
    cardEl.classList.remove("no-anim");
    cardEl.classList.add("card-refresh"); // replays the front-face entrance animation
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
  // per-session tally, separate from the persisted mastered/weak flags).
  function startSession() {
    const fc = state.flashcards;
    const items = buildDeck(fc.level, fc.lessons, fc.isolateMode).map((item) => ({ ...item, attempts: 0, correctAttempts: 0 }));
    fc.sessionItems = items;
    fc.queue = fc.shuffleOn ? shuffle(items) : items.slice();
    fc.totalCount = items.length;
    fc.masteredCount = 0;
    fc.current = null;
    showNextCard();
  }

  // Every word gets exactly two presentations per sitting, right or wrong —
  // no requeueing a miss to resurface a few cards later. The first
  // presentation always goes back to the end of the queue for its second
  // showing; the second presentation is the verdict: both correct this
  // sitting → mastered, anything else → weak. Isolate mode (practicing the
  // weak pile) uses the same rule, so mastering a weak word there clears it
  // from the pile — that's the point of practicing it.
  function gradeCurrent(isCorrect) {
    const fc = state.flashcards;
    const item = fc.current;
    if (!item || !fc.flipped) return;
    item.attempts += 1;
    if (isCorrect) item.correctAttempts += 1;
    if (item.attempts < 2) {
      fc.queue.push(item);
    } else {
      const masteredThisSitting = item.correctAttempts === 2;
      recordSessionResult(item, masteredThisSitting);
      if (masteredThisSitting) fc.masteredCount += 1;
      // Isolate mode's session deck is only the weak subset of a lesson, not
      // the whole thing, so "everyone in this session passed" wouldn't mean
      // the lesson itself is mastered — skip the lesson-complete check there.
      if (!fc.isolateMode) {
        checkLessonComplete(fcMastery, fc.sessionItems, item.level, item.lesson);
        renderLessonChips(fc.level);
      }
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
        const passedClass = fcMastery.isPassed(level, n) ? " chip-passed" : "";
        return `<button class="chip lesson-chip${isActive ? " active" : ""}${passedClass}" data-lesson="${n}" title="${title}">${n}課</button>`;
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
      progressStore[id] = { correct: 0, wrong: 0, streak: 0, lastSeen: now };
    });

    saveProgress();
    startSession();
  });

  cardEl.addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.current) return;
    fc.flipped = !fc.flipped;
    cardEl.classList.toggle("flipped", fc.flipped);
    gradeButtonsEl.hidden = !fc.flipped;
    cardHintEl.hidden = fc.flipped;
    speakJapanese(fc.current.reading || fc.current.word);
  });

  gradeWrongBtn.addEventListener("click", () => gradeCurrent(false));
  gradeRightBtn.addEventListener("click", () => gradeCurrent(true));

  const fcShuffleToggleBtn = document.getElementById("fc-shuffle-toggle");
  fcShuffleToggleBtn.addEventListener("click", () => {
    state.flashcards.shuffleOn = !state.flashcards.shuffleOn;
    fcShuffleToggleBtn.classList.toggle("active", state.flashcards.shuffleOn);
    fcShuffleToggleBtn.textContent = t(state.flashcards.shuffleOn ? "shuffleOn" : "shuffleOff");
    if (state.flashcards.shuffleOn) state.flashcards.queue = shuffle(state.flashcards.queue);
  });

  document.getElementById("fc-skip").addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.current) return;
    fc.queue.push(fc.current);
    showNextCard();
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("vocab-view").classList.contains("active")) return;
    if (!document.getElementById("flashcards-subview").classList.contains("active")) return;
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

  // ---------- kanji writing practice ----------
  // Same word pool as flashcards, filtered down to entries that actually
  // have a kanji form to draw (pure-kana entries like サンドイッチ or もらう
  // have nothing to write), tested by recalling the kanji from its reading
  // alone and self-graded against a reveal — there's no OCR, so "correct"
  // is on the honor system, same as flashcards' knew-it/didn't-know-it.
  const KANJI_PROGRESS_KEY = "jpstudy_kanji_progress_v1";
  let kanjiProgressStore = {};
  try {
    kanjiProgressStore = JSON.parse(localStorage.getItem(KANJI_PROGRESS_KEY) || "{}");
  } catch (e) {
    kanjiProgressStore = {};
  }
  function saveKanjiProgress() {
    try {
      localStorage.setItem(KANJI_PROGRESS_KEY, JSON.stringify(kanjiProgressStore));
    } catch (e) {
      /* ignore — progress simply won't persist this session */
    }
  }
  function getKwStats(item) {
    return kanjiProgressStore[wordId(item)] || {};
  }
  function isKwWeak(item) {
    return !!getKwStats(item).weak;
  }
  function isKwMastered(item) {
    return !!getKwStats(item).mastered;
  }
  function recordKwResult(item, correct) {
    const id = wordId(item);
    const stats = kanjiProgressStore[id] || {};
    stats.mastered = correct;
    stats.weak = !correct;
    stats.lastSeen = new Date().toISOString();
    kanjiProgressStore[id] = stats;
    saveKanjiProgress();
    recordStudyActivity();
  }

  function hasKanji(word) {
    return /[一-龯]/.test(word || "");
  }
  function kwBuildDeck(level, lessons, isolateMode) {
    let items = buildDeck(level, lessons, false).filter((item) => hasKanji(item.word));
    if (isolateMode) items = items.filter((item) => isKwWeak(item));
    return items;
  }

  const kwLevelChips = document.querySelectorAll("#kw-level-chips .chip");
  const kwLessonChipsEl = document.getElementById("kw-lesson-chips");
  const kwIsolateToggleBtn = document.getElementById("kw-isolate-toggle");
  const kwIsolateNoteEl = document.getElementById("kw-isolate-note");
  const kwResetProgressBtn = document.getElementById("kw-reset-progress");
  const kwReadingEl = document.getElementById("kw-reading");
  const kwMeaningEl = document.getElementById("kw-meaning");
  const kwCanvas = document.getElementById("kw-canvas");
  const kwCtx = kwCanvas.getContext("2d");
  const kwClearBtn = document.getElementById("kw-clear");
  const kwRevealBtn = document.getElementById("kw-reveal");
  const kwAnswerEl = document.getElementById("kw-answer");
  const kwAnswerWordEl = document.getElementById("kw-answer-word");
  const kwAnswerReadingEl = document.getElementById("kw-answer-reading");
  const kwGradeButtonsEl = document.getElementById("kw-grade-buttons");
  const kwGradeWrongBtn = document.getElementById("kw-grade-wrong");
  const kwGradeRightBtn = document.getElementById("kw-grade-right");
  const kwProgressEl = document.getElementById("kw-progress");

  // Canvas backing-store size has to be set in real pixels (not CSS ones)
  // for crisp strokes on high-DPI phone screens, which also means the
  // context's scale/stroke style get reset every time this runs — so it's
  // called on load, on resize, and whenever the tab becomes visible again
  // (a canvas sized while its view was display:none reports a 0×0 rect).
  function kwSetupCanvas() {
    const rect = kwCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    kwCanvas.width = rect.width * dpr;
    kwCanvas.height = rect.height * dpr;
    kwCtx.scale(dpr, dpr);
    const inkColor = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
    kwCtx.strokeStyle = inkColor || "#23241F";
    kwCtx.lineWidth = 6;
    kwCtx.lineCap = "round";
    kwCtx.lineJoin = "round";
  }
  function kwClearCanvas() {
    kwCtx.clearRect(0, 0, kwCanvas.width, kwCanvas.height);
  }

  let kwDrawing = false;
  function kwPointerPos(e) {
    const rect = kwCanvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  kwCanvas.addEventListener("pointerdown", (e) => {
    kwDrawing = true;
    const p = kwPointerPos(e);
    kwCtx.beginPath();
    kwCtx.moveTo(p.x, p.y);
    kwCanvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  kwCanvas.addEventListener("pointermove", (e) => {
    if (!kwDrawing) return;
    const p = kwPointerPos(e);
    kwCtx.lineTo(p.x, p.y);
    kwCtx.stroke();
    e.preventDefault();
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((evt) => {
    kwCanvas.addEventListener(evt, () => { kwDrawing = false; });
  });
  kwClearBtn.addEventListener("click", kwClearCanvas);
  window.addEventListener("resize", () => {
    if (
      document.getElementById("vocab-view").classList.contains("active") &&
      document.getElementById("kanjiwrite-subview").classList.contains("active")
    ) {
      kwSetupCanvas();
    }
  });
  function kwOnTabShow() {
    kwSetupCanvas();
  }

  function kwEmptyText() {
    const kw = state.kanjiWrite;
    if (kw.totalCount) return t("allMastered");
    return kw.isolateMode ? t("noWeakWords") : t("noCards");
  }
  function kwUpdateProgress() {
    const kw = state.kanjiWrite;
    kwProgressEl.textContent = kw.totalCount ? t("masteredProgress", { n: kw.masteredCount, total: kw.totalCount }) : "0 / 0";
  }
  function kwShowNext() {
    const kw = state.kanjiWrite;
    kwSetupCanvas();
    kwClearCanvas();
    kw.revealed = false;
    kwAnswerEl.hidden = true;
    kwGradeButtonsEl.hidden = true;
    kwRevealBtn.hidden = false;
    if (!kw.queue.length) {
      kw.current = null;
      kwReadingEl.textContent = kwEmptyText();
      kwMeaningEl.textContent = "";
      kwRevealBtn.hidden = true;
      kwUpdateProgress();
      return;
    }
    kw.current = kw.queue.shift();
    kwReadingEl.textContent = kw.current.reading;
    kwMeaningEl.textContent = kw.current.meaning;
    kwUpdateProgress();
  }
  function kwStartSession() {
    const kw = state.kanjiWrite;
    const items = kwBuildDeck(kw.level, kw.lessons, kw.isolateMode).map((item) => ({ ...item, attempts: 0, correctAttempts: 0 }));
    kw.sessionItems = items;
    kw.queue = kw.shuffleOn ? shuffle(items) : items.slice();
    kw.totalCount = items.length;
    kw.masteredCount = 0;
    kw.current = null;
    kwShowNext();
  }

  function kwRenderLessonChips(level) {
    const data = window.VOCAB_DATA || {};
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    if (level === "all") {
      kwLessonChipsEl.innerHTML = "";
      kwLessonChipsEl.hidden = true;
      return;
    }
    const items = data[level] || [];
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort(
      (a, b) => a - b
    );
    if (!lessonNums.length) {
      kwLessonChipsEl.innerHTML = "";
      kwLessonChipsEl.hidden = true;
      return;
    }
    kwLessonChipsEl.hidden = false;
    const selected = state.kanjiWrite.lessons;
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const lessonChips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        const isActive = selected.includes(n);
        const passedClass = kwMastery.isPassed(level, n) ? " chip-passed" : "";
        return `<button class="chip lesson-chip${isActive ? " active" : ""}${passedClass}" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    kwLessonChipsEl.innerHTML = allChip + lessonChips;
    kwLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.lesson === "all") {
          state.kanjiWrite.lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = state.kanjiWrite.lessons.indexOf(n);
          if (idx === -1) state.kanjiWrite.lessons.push(n);
          else state.kanjiWrite.lessons.splice(idx, 1);
          state.kanjiWrite.lessons.sort((a, b) => a - b);
        }
        kwRenderLessonChips(level);
        kwStartSession();
      });
    });
  }

  kwLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      kwLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.kanjiWrite.level = chip.dataset.level;
      state.kanjiWrite.lessons = [];
      kwRenderLessonChips(chip.dataset.level);
      kwStartSession();
    });
  });

  kwIsolateToggleBtn.addEventListener("click", () => {
    state.kanjiWrite.isolateMode = !state.kanjiWrite.isolateMode;
    kwIsolateToggleBtn.classList.toggle("active", state.kanjiWrite.isolateMode);
    kwIsolateNoteEl.hidden = !state.kanjiWrite.isolateMode;
    kwStartSession();
  });

  kwResetProgressBtn.addEventListener("click", () => {
    const kw = state.kanjiWrite;
    let confirmMsg = "This clears your kanji-writing progress for the currently selected lessons. Continue?";
    if (kw.level === "all" && (!kw.lessons || kw.lessons.length === 0)) {
      confirmMsg = "This clears your kanji-writing progress for EVERY word. Continue?";
    }
    if (!window.confirm(confirmMsg)) return;
    const now = new Date().toISOString();
    const targetItems = kwBuildDeck(kw.level, kw.lessons, false);
    targetItems.forEach((item) => {
      kanjiProgressStore[wordId(item)] = { mastered: false, weak: false, lastSeen: now };
    });
    saveKanjiProgress();
    kwStartSession();
  });

  kwRevealBtn.addEventListener("click", () => {
    const kw = state.kanjiWrite;
    if (!kw.current) return;
    kw.revealed = true;
    kwAnswerWordEl.textContent = kw.current.word;
    kwAnswerReadingEl.textContent = kw.current.reading;
    kwAnswerEl.hidden = false;
    kwRevealBtn.hidden = true;
    kwGradeButtonsEl.hidden = false;
    speakJapanese(kw.current.reading || kw.current.word);
  });

  function kwGradeCurrent(isCorrect) {
    const kw = state.kanjiWrite;
    const item = kw.current;
    if (!item || !kw.revealed) return;
    item.attempts += 1;
    if (isCorrect) item.correctAttempts += 1;
    if (item.attempts < 2) {
      kw.queue.push(item);
    } else {
      const masteredThisSitting = item.correctAttempts === 2;
      recordKwResult(item, masteredThisSitting);
      if (masteredThisSitting) kw.masteredCount += 1;
      if (!kw.isolateMode) {
        checkLessonComplete(kwMastery, kw.sessionItems, item.level, item.lesson);
        kwRenderLessonChips(kw.level);
      }
    }
    kwShowNext();
  }
  kwGradeWrongBtn.addEventListener("click", () => kwGradeCurrent(false));
  kwGradeRightBtn.addEventListener("click", () => kwGradeCurrent(true));

  const kwShuffleToggleBtn = document.getElementById("kw-shuffle-toggle");
  kwShuffleToggleBtn.addEventListener("click", () => {
    state.kanjiWrite.shuffleOn = !state.kanjiWrite.shuffleOn;
    kwShuffleToggleBtn.classList.toggle("active", state.kanjiWrite.shuffleOn);
    kwShuffleToggleBtn.textContent = t(state.kanjiWrite.shuffleOn ? "shuffleOn" : "shuffleOff");
    if (state.kanjiWrite.shuffleOn) state.kanjiWrite.queue = shuffle(state.kanjiWrite.queue);
  });
  document.getElementById("kw-skip").addEventListener("click", () => {
    const kw = state.kanjiWrite;
    if (!kw.current) return;
    kw.queue.push(kw.current);
    kwShowNext();
  });

  kwRenderLessonChips(state.kanjiWrite.level);
  kwStartSession();

  // ---------- furigana practice ----------
  // Type the reading for a kanji word from memory, auto-graded against the
  // word's own `reading` field — no self-honesty needed, unlike flashcards
  // and writing practice. Pure-kana words (empty `reading`) are skipped,
  // same as the kanji-writing deck skips words with no kanji to draw.
  const FURIGANA_PROGRESS_KEY = "jpstudy_furigana_progress_v1";
  let furiganaProgressStore = {};
  try {
    furiganaProgressStore = JSON.parse(localStorage.getItem(FURIGANA_PROGRESS_KEY) || "{}");
  } catch (e) {
    furiganaProgressStore = {};
  }
  function saveFuriganaProgress() {
    try {
      localStorage.setItem(FURIGANA_PROGRESS_KEY, JSON.stringify(furiganaProgressStore));
    } catch (e) {
      /* ignore */
    }
  }
  function getFgStats(item) {
    return furiganaProgressStore[wordId(item)] || {};
  }
  function isFgWeak(item) {
    return !!getFgStats(item).weak;
  }
  function recordFgResult(item, correct) {
    const id = wordId(item);
    const stats = furiganaProgressStore[id] || {};
    stats.mastered = correct;
    stats.weak = !correct;
    stats.lastSeen = new Date().toISOString();
    furiganaProgressStore[id] = stats;
    saveFuriganaProgress();
    recordStudyActivity();
  }

  function fgBuildDeck(level, lessons, isolateMode) {
    let items = buildDeck(level, lessons, false).filter((item) => item.reading && item.reading.trim());
    if (isolateMode) items = items.filter((item) => isFgWeak(item));
    return items;
  }

  function normalizeReading(str) {
    return (str || "").replace(/[()（）\s　]/g, "").trim();
  }

  const fgLevelChips = document.querySelectorAll("#fg-level-chips .chip");
  const fgLessonChipsEl = document.getElementById("fg-lesson-chips");
  const fgIsolateToggleBtn = document.getElementById("fg-isolate-toggle");
  const fgIsolateNoteEl = document.getElementById("fg-isolate-note");
  const fgResetProgressBtn = document.getElementById("fg-reset-progress");
  const fgWordEl = document.getElementById("fg-word");
  const fgMeaningEl = document.getElementById("fg-meaning");
  const fgFieldEl = document.getElementById("fg-field");
  const fgSubmitBtn = document.getElementById("fg-submit");
  const fgAnswerEl = document.getElementById("fg-answer");
  const fgAnswerWordEl = document.getElementById("fg-answer-word");
  const fgProgressEl = document.getElementById("fg-progress");

  function fgEmptyText() {
    const fg = state.furigana;
    if (fg.totalCount) return t("allMastered");
    return fg.isolateMode ? t("noWeakWords") : t("noCards");
  }
  function fgUpdateProgress() {
    const fg = state.furigana;
    fgProgressEl.textContent = fg.totalCount ? t("masteredProgress", { n: fg.masteredCount, total: fg.totalCount }) : "0 / 0";
  }
  function fgShowNext() {
    const fg = state.furigana;
    fg.submitted = false;
    fgFieldEl.value = "";
    fgFieldEl.disabled = false;
    fgFieldEl.classList.remove("fg-input-correct", "fg-input-wrong");
    fgAnswerEl.hidden = true;
    if (!fg.queue.length) {
      fg.current = null;
      fgWordEl.textContent = fgEmptyText();
      fgMeaningEl.textContent = "";
      fgUpdateProgress();
      return;
    }
    fg.current = fg.queue.shift();
    fgWordEl.textContent = fg.current.word;
    fgMeaningEl.textContent = fg.current.meaning;
    fgUpdateProgress();
    setTimeout(() => fgFieldEl.focus(), 0);
  }
  function fgStartSession() {
    const fg = state.furigana;
    const items = fgBuildDeck(fg.level, fg.lessons, fg.isolateMode).map((item) => ({ ...item, attempts: 0, correctAttempts: 0 }));
    fg.sessionItems = items;
    fg.queue = fg.shuffleOn ? shuffle(items) : items.slice();
    fg.totalCount = items.length;
    fg.masteredCount = 0;
    fg.current = null;
    fgShowNext();
  }

  function fgRenderLessonChips(level) {
    const data = window.VOCAB_DATA || {};
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    if (level === "all") {
      fgLessonChipsEl.innerHTML = "";
      fgLessonChipsEl.hidden = true;
      return;
    }
    const items = data[level] || [];
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
    if (!lessonNums.length) {
      fgLessonChipsEl.innerHTML = "";
      fgLessonChipsEl.hidden = true;
      return;
    }
    fgLessonChipsEl.hidden = false;
    const selected = state.furigana.lessons;
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const lessonChips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        const isActive = selected.includes(n);
        const passedClass = fgMastery.isPassed(level, n) ? " chip-passed" : "";
        return `<button class="chip lesson-chip${isActive ? " active" : ""}${passedClass}" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    fgLessonChipsEl.innerHTML = allChip + lessonChips;
    fgLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.lesson === "all") {
          state.furigana.lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = state.furigana.lessons.indexOf(n);
          if (idx === -1) state.furigana.lessons.push(n);
          else state.furigana.lessons.splice(idx, 1);
          state.furigana.lessons.sort((a, b) => a - b);
        }
        fgRenderLessonChips(level);
        fgStartSession();
      });
    });
  }

  fgLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      fgLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.furigana.level = chip.dataset.level;
      state.furigana.lessons = [];
      fgRenderLessonChips(chip.dataset.level);
      fgStartSession();
    });
  });

  fgIsolateToggleBtn.addEventListener("click", () => {
    state.furigana.isolateMode = !state.furigana.isolateMode;
    fgIsolateToggleBtn.classList.toggle("active", state.furigana.isolateMode);
    fgIsolateNoteEl.hidden = !state.furigana.isolateMode;
    fgStartSession();
  });

  fgResetProgressBtn.addEventListener("click", () => {
    const fg = state.furigana;
    let confirmMsg = "This clears your furigana-practice progress for the currently selected lessons. Continue?";
    if (fg.level === "all" && (!fg.lessons || fg.lessons.length === 0)) {
      confirmMsg = "This clears your furigana-practice progress for EVERY word. Continue?";
    }
    if (!window.confirm(confirmMsg)) return;
    const now = new Date().toISOString();
    const targetItems = fgBuildDeck(fg.level, fg.lessons, false);
    targetItems.forEach((item) => {
      furiganaProgressStore[wordId(item)] = { mastered: false, weak: false, lastSeen: now };
    });
    saveFuriganaProgress();
    fgStartSession();
  });

  function fgSubmit() {
    const fg = state.furigana;
    const item = fg.current;
    if (!item || fg.submitted) return;
    fg.submitted = true;
    const isCorrect = normalizeReading(fgFieldEl.value) === normalizeReading(item.reading);
    fgFieldEl.classList.add(isCorrect ? "fg-input-correct" : "fg-input-wrong");
    fgFieldEl.disabled = true;
    if (!isCorrect) {
      fgAnswerEl.hidden = false;
      fgAnswerWordEl.textContent = item.reading;
    }
    item.attempts += 1;
    if (isCorrect) item.correctAttempts += 1;
    if (item.attempts < 2) {
      fg.queue.push(item);
    } else {
      const masteredThisSitting = item.correctAttempts === 2;
      recordFgResult(item, masteredThisSitting);
      if (masteredThisSitting) fg.masteredCount += 1;
      if (!fg.isolateMode) {
        checkLessonComplete(fgMastery, fg.sessionItems, item.level, item.lesson);
        fgRenderLessonChips(fg.level);
      }
    }
    setTimeout(fgShowNext, isCorrect ? 350 : 1500);
  }
  fgSubmitBtn.addEventListener("click", fgSubmit);
  fgFieldEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fgSubmit();
    }
  });

  const fgShuffleToggleBtn = document.getElementById("fg-shuffle-toggle");
  fgShuffleToggleBtn.addEventListener("click", () => {
    state.furigana.shuffleOn = !state.furigana.shuffleOn;
    fgShuffleToggleBtn.classList.toggle("active", state.furigana.shuffleOn);
    fgShuffleToggleBtn.textContent = t(state.furigana.shuffleOn ? "shuffleOn" : "shuffleOff");
    if (state.furigana.shuffleOn) state.furigana.queue = shuffle(state.furigana.queue);
  });
  document.getElementById("fg-skip").addEventListener("click", () => {
    const fg = state.furigana;
    if (!fg.current) return;
    fg.queue.push(fg.current);
    fgShowNext();
  });

  fgRenderLessonChips(state.furigana.level);
  fgStartSession();

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

  function renderExamplesHtml(examples) {
    return (examples || [])
      .map(
        (ex) => `
      <div class="example">
        <p class="example-jp">${ex.jp}</p>
        <p class="example-en">${ex.en}</p>
      </div>`
      )
      .join("");
  }

  function selectGrammarItem(i) {
    state.grammar.selectedIndex = i;
    [...grammarListEl.children].forEach((li, idx) => li.classList.toggle("active", idx === i));
    const item = state.grammar.items[i];
    const lessonTag = item.lesson !== undefined ? `<span class="grammar-lesson-tag">${item.lesson}課</span>` : "";

    // legacy entries (flat usage/examples, not yet migrated to uses[]/commonMistakes[])
    const usesHtml = item.uses
      ? item.uses
          .map(
            (use) => `
        <div class="grammar-use">
          <p class="grammar-use-label">${use.label}</p>
          <p class="grammar-use-explanation">${use.explanation}</p>
          ${use.examples && use.examples.length ? `<div class="examples">${renderExamplesHtml(use.examples)}</div>` : ""}
        </div>`
          )
          .join("")
      : `<p class="grammar-usage">${item.usage || ""}</p>${item.examples && item.examples.length ? `<div class="examples">${renderExamplesHtml(item.examples)}</div>` : ""}`;

    const mistakesHtml = (item.commonMistakes || [])
      .map(
        (m) => `
      <div class="grammar-mistake">
        <p class="grammar-mistake-wrong">✗ ${m.wrong}</p>
        <p class="grammar-mistake-explanation">${m.explanation}</p>
      </div>`
      )
      .join("");

    grammarDetailEl.innerHTML = `
      ${lessonTag}
      <p class="grammar-pattern">${item.pattern}</p>
      <p class="grammar-meaning">${item.meaning}</p>
      <div class="grammar-uses">
        <h4 class="grammar-section-heading">${t("grammarUsesHeading")}</h4>
        ${usesHtml}
      </div>
      ${mistakesHtml ? `<div class="grammar-mistakes"><h4 class="grammar-section-heading">${t("grammarMistakesHeading")}</h4>${mistakesHtml}</div>` : ""}
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

  // ---------- grammar practice ----------
  // Quizzes the hand-written questions in grammar-practice-data.js, keyed by
  // level+lesson. Unlike the other practice modes this one always shows the
  // explanation after answering and waits for an explicit "Next" — the point
  // is to teach why まで beats までに here, not to drill for speed, so
  // auto-advancing past the explanation would defeat the whole mode.
  const gpLevelChips = document.querySelectorAll("#gp-level-chips .chip");
  const gpLessonChipsEl = document.getElementById("gp-lesson-chips");
  const gpTagEl = document.getElementById("gp-tag");
  const gpPromptEl = document.getElementById("gp-prompt");
  const gpSentenceEl = document.getElementById("gp-sentence");
  const gpHintEl = document.getElementById("gp-hint");
  const gpOptionsEl = document.getElementById("gp-options");
  const gpInputRowEl = document.getElementById("gp-input-row");
  const gpFieldEl = document.getElementById("gp-field");
  const gpSubmitBtn = document.getElementById("gp-submit");
  const gpFeedbackEl = document.getElementById("gp-feedback");
  const gpVerdictEl = document.getElementById("gp-verdict");
  const gpAnswerEl = document.getElementById("gp-answer");
  const gpExplainEl = document.getElementById("gp-explain");
  const gpNextBtn = document.getElementById("gp-next");
  const gpProgressEl = document.getElementById("gp-progress");
  const gpShuffleToggleBtn = document.getElementById("gp-shuffle-toggle");
  const gpSrsToggleBtn = document.getElementById("gp-srs-toggle");
  const gpDueNoteEl = document.getElementById("gp-due-note");

  // ---- spaced repetition ----
  // An SM-2-lite scheduler, one record per question id:
  //   { ease, interval (days), due (ms epoch), reps, lapses }
  // Answer it right and the gap to the next showing stretches by the card's
  // own ease factor; get it wrong and the card resets to "due now" and its
  // ease drops, so questions you keep missing keep coming back sooner than
  // ones you know cold.
  const GP_SRS_KEY = "jpstudy_gp_srs_v1";
  const GP_DAY_MS = 24 * 60 * 60 * 1000;
  let gpSrsStore = {};
  try {
    gpSrsStore = JSON.parse(localStorage.getItem(GP_SRS_KEY) || "{}");
  } catch (e) {
    gpSrsStore = {};
  }
  function gpSaveSrs() {
    try {
      localStorage.setItem(GP_SRS_KEY, JSON.stringify(gpSrsStore));
    } catch (e) {
      /* ignore */
    }
  }
  function gpIsDue(qid, now) {
    const rec = gpSrsStore[qid];
    if (!rec) return true; // never seen — new cards are always fair game
    return rec.due <= now;
  }
  function gpIsNew(qid) {
    return !gpSrsStore[qid];
  }
  // Called once per question per run, on the FIRST answer only — that's the
  // honest recall test. The second exposure in the same run is reinforcement
  // and must not inflate the schedule.
  function gpScheduleCard(qid, isCorrect) {
    const now = Date.now();
    const rec = gpSrsStore[qid] || { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0 };
    if (isCorrect) {
      rec.reps += 1;
      if (rec.reps === 1) rec.interval = 1;
      else if (rec.reps === 2) rec.interval = 3;
      else rec.interval = Math.round(rec.interval * rec.ease);
      rec.ease = Math.min(2.8, rec.ease + 0.1);
    } else {
      rec.reps = 0;
      rec.lapses += 1;
      rec.interval = 0; // back in the pile for the next session
      rec.ease = Math.max(1.3, rec.ease - 0.2);
    }
    rec.due = now + rec.interval * GP_DAY_MS;
    gpSrsStore[qid] = rec;
    gpSaveSrs();
  }

  function gpLessonsFor(level) {
    const byLesson = (window.GRAMMAR_PRACTICE && window.GRAMMAR_PRACTICE[level]) || {};
    return Object.keys(byLesson)
      .map(Number)
      .filter((n) => (byLesson[n] || []).length)
      .sort((a, b) => a - b);
  }

  function gpAllQuestions(level, lessons) {
    const byLesson = (window.GRAMMAR_PRACTICE && window.GRAMMAR_PRACTICE[level]) || {};
    const wanted = lessons && lessons.length ? lessons : gpLessonsFor(level);
    const out = [];
    wanted.forEach((n) => {
      (byLesson[n] || []).forEach((q, idx) => {
        out.push({ ...q, level, lesson: n, qid: `${level}::${n}::${idx}` });
      });
    });
    return out;
  }

  // In review mode the deck is only what the scheduler says is due (plus
  // anything never seen). With review mode off you get every question in the
  // selected lessons, which is what you want when cramming a specific lesson
  // rather than doing your daily review.
  function gpBuildDeck(level, lessons) {
    const all = gpAllQuestions(level, lessons);
    if (!state.grammarPractice.srsOn) return all;
    const now = Date.now();
    return all.filter((q) => gpIsDue(q.qid, now));
  }

  function gpDueCounts(level, lessons) {
    const all = gpAllQuestions(level, lessons);
    const now = Date.now();
    let due = 0;
    let fresh = 0;
    all.forEach((q) => {
      if (gpIsNew(q.qid)) fresh += 1;
      else if (gpSrsStore[q.qid].due <= now) due += 1;
    });
    return { due, fresh, total: all.length };
  }

  // Typed answers are compared loosely: trim, drop spaces, and treat the
  // full-width blank characters as absent so pasting the sentence back in
  // doesn't count as wrong.
  function gpNormalize(str) {
    return (str || "").trim().replace(/[\s　＿_]/g, "");
  }

  function gpUpdateProgress() {
    const gp = state.grammarPractice;
    gpProgressEl.textContent = gp.totalCount ? t("masteredProgress", { n: gp.masteredCount, total: gp.totalCount }) : "0 / 0";
    gpUpdateDueNote();
  }

  function gpUpdateDueNote() {
    const gp = state.grammarPractice;
    if (!gpDueNoteEl) return;
    if (!gp.srsOn) {
      gpDueNoteEl.hidden = true;
      return;
    }
    const { due, fresh } = gpDueCounts(gp.level, gp.lessons);
    gpDueNoteEl.hidden = false;
    gpDueNoteEl.textContent = t("gpDueNote", { due, fresh });
  }

  function gpResetCardUI() {
    gpTagEl.hidden = true;
    gpOptionsEl.hidden = true;
    gpOptionsEl.innerHTML = "";
    gpInputRowEl.hidden = true;
    gpFieldEl.value = "";
    gpFieldEl.disabled = false;
    gpFieldEl.classList.remove("fg-input-correct", "fg-input-wrong");
    gpFeedbackEl.hidden = true;
    gpAnswerEl.hidden = true;
    gpAnswerEl.textContent = "";
    gpExplainEl.textContent = "";
    gpVerdictEl.textContent = "";
    gpVerdictEl.className = "gp-verdict";
  }

  function gpShowNext() {
    const gp = state.grammarPractice;
    gpResetCardUI();
    if (!gp.queue.length) {
      gp.current = null;
      gp.answered = false;
      if (gp.totalCount) gpPromptEl.textContent = t("allMastered");
      else if (gp.srsOn && gpDueCounts(gp.level, gp.lessons).total) gpPromptEl.textContent = t("gpAllCaughtUp");
      else gpPromptEl.textContent = t("gpNoQuestions");
      gpSentenceEl.textContent = "";
      gpHintEl.textContent = "";
      gpUpdateProgress();
      return;
    }
    const item = gp.queue.shift();
    gp.current = item;
    gp.answered = false;
    gpTagEl.textContent = item.tag || "";
    gpPromptEl.textContent = item.prompt || "";
    gpSentenceEl.innerHTML = item.jp ? furiganaToHtml(item.jp) : "";
    gpHintEl.textContent = item.en || "";
    if (item.type === "choice") {
      gpOptionsEl.hidden = false;
      // Options are shuffled every time a question is shown. The source data
      // keeps its authored order (which for the N3 questions is the
      // textbook's own a/b/c order), but a fixed order would be learnable on
      // its own — answer position must never be a hint.
      const order = shuffle(item.options.map((_, i) => i));
      item._correctPos = order.indexOf(item.correct);
      order.forEach((srcIdx, pos) => {
        const btn = document.createElement("button");
        btn.className = "gp-option-btn";
        btn.textContent = item.options[srcIdx];
        btn.addEventListener("click", () => gpAnswer(srcIdx === item.correct, pos));
        gpOptionsEl.appendChild(btn);
      });
    } else {
      gpInputRowEl.hidden = false;
      gpFieldEl.placeholder = t("gpPlaceholder");
      setTimeout(() => gpFieldEl.focus(), 0);
    }
    gpUpdateProgress();
  }

  // Records the result against the twice-per-run rule shared with the vocab
  // practice modes, then shows the explanation and waits for "Next".
  function gpAnswer(isCorrect, chosenIdx) {
    const gp = state.grammarPractice;
    const item = gp.current;
    if (!item || gp.answered) return;
    gp.answered = true;

    if (item.type === "choice") {
      [...gpOptionsEl.children].forEach((b, i) => {
        b.disabled = true;
        if (i === item._correctPos) b.classList.add("correct");
        else if (i === chosenIdx) b.classList.add("wrong");
      });
    } else {
      gpFieldEl.disabled = true;
      gpFieldEl.classList.add(isCorrect ? "fg-input-correct" : "fg-input-wrong");
      if (!isCorrect) {
        gpAnswerEl.hidden = false;
        gpAnswerEl.textContent = `${t("gpAnswerLabel")} ${item.answers[0]}`;
      }
    }

    gpTagEl.hidden = false;
    gpVerdictEl.textContent = t(isCorrect ? "gpCorrect" : "gpWrong");
    gpVerdictEl.className = `gp-verdict ${isCorrect ? "gp-verdict-correct" : "gp-verdict-wrong"}`;
    gpExplainEl.textContent = item.explain || "";
    gpFeedbackEl.hidden = false;
    gpNextBtn.focus();

    item.attempts += 1;
    if (isCorrect) item.correctAttempts += 1;
    // Schedule off the first answer only — the second pass this run is
    // reinforcement, and counting it would let a card you just fumbled ride
    // its immediate re-answer into a long interval.
    if (item.attempts === 1) gpScheduleCard(item.qid, isCorrect);
    if (item.attempts < 2) {
      gp.queue.push(item);
    } else {
      if (item.correctAttempts === 2) gp.masteredCount += 1;
      checkLessonComplete(gpMastery, gp.sessionItems, item.level, item.lesson);
      gpRenderLessonChips(gp.level);
    }
    gpUpdateProgress();
  }

  function gpSubmitTyped() {
    const gp = state.grammarPractice;
    const item = gp.current;
    if (!item || gp.answered || item.type !== "fill") return;
    const given = gpNormalize(gpFieldEl.value);
    if (!given) return;
    gpAnswer(item.answers.some((a) => gpNormalize(a) === given));
  }

  function gpStartSession() {
    const gp = state.grammarPractice;
    const items = gpBuildDeck(gp.level, gp.lessons).map((q) => ({ ...q, attempts: 0, correctAttempts: 0 }));
    gp.sessionItems = items;
    gp.queue = gp.shuffleOn ? shuffle(items) : items.slice();
    gp.totalCount = items.length;
    gp.masteredCount = 0;
    gp.current = null;
    gpShowNext();
  }

  function gpRenderLessonChips(level) {
    const lessonNums = gpLessonsFor(level);
    if (!lessonNums.length) {
      gpLessonChipsEl.innerHTML = "";
      gpLessonChipsEl.hidden = true;
      return;
    }
    gpLessonChipsEl.hidden = false;
    const selected = state.grammarPractice.lessons;
    const allActive = selected.length === 0;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const lessonChips = lessonNums
      .map((n) => {
        const isActive = selected.includes(n);
        const passedClass = gpMastery.isPassed(level, n) ? " chip-passed" : "";
        return `<button class="chip lesson-chip${isActive ? " active" : ""}${passedClass}" data-lesson="${n}">${n}課</button>`;
      })
      .join("");
    gpLessonChipsEl.innerHTML = allChip + lessonChips;
    gpLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const gp = state.grammarPractice;
        if (chip.dataset.lesson === "all") {
          gp.lessons = [];
        } else {
          const n = Number(chip.dataset.lesson);
          const idx = gp.lessons.indexOf(n);
          if (idx === -1) gp.lessons.push(n);
          else gp.lessons.splice(idx, 1);
          gp.lessons.sort((a, b) => a - b);
        }
        gpRenderLessonChips(level);
        gpStartSession();
      });
    });
  }

  gpLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      gpLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const gp = state.grammarPractice;
      gp.level = chip.dataset.level;
      gp.lessons = [];
      gpRenderLessonChips(gp.level);
      gpStartSession();
    });
  });

  gpSubmitBtn.addEventListener("click", gpSubmitTyped);
  gpFieldEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      gpSubmitTyped();
    }
  });
  gpNextBtn.addEventListener("click", gpShowNext);

  gpSrsToggleBtn.addEventListener("click", () => {
    const gp = state.grammarPractice;
    gp.srsOn = !gp.srsOn;
    gpSrsToggleBtn.classList.toggle("active", gp.srsOn);
    gpSrsToggleBtn.textContent = t(gp.srsOn ? "gpSrsOn" : "gpSrsOff");
    try {
      localStorage.setItem("jpstudy_gp_srs_mode_v1", gp.srsOn ? "1" : "0");
    } catch (e) {
      /* ignore */
    }
    gpStartSession();
  });

  gpShuffleToggleBtn.addEventListener("click", () => {
    const gp = state.grammarPractice;
    gp.shuffleOn = !gp.shuffleOn;
    gpShuffleToggleBtn.classList.toggle("active", gp.shuffleOn);
    gpShuffleToggleBtn.textContent = t(gp.shuffleOn ? "shuffleOn" : "shuffleOff");
    if (gp.shuffleOn) gp.queue = shuffle(gp.queue);
  });

  document.getElementById("gp-skip").addEventListener("click", () => {
    const gp = state.grammarPractice;
    if (!gp.current) return;
    // Requeue untouched: a skip shouldn't count as one of the two exposures.
    gp.queue.push(gp.current);
    gpShowNext();
  });

  document.getElementById("gp-reset-progress").addEventListener("click", () => {
    if (!window.confirm("This clears your grammar-practice review schedule AND the green 'lesson passed' marks. Continue?")) return;
    try {
      localStorage.removeItem("jpstudy_gp_lesson_passed_v1");
      localStorage.removeItem(GP_SRS_KEY);
    } catch (e) {
      /* ignore */
    }
    window.location.reload();
  });

  try {
    if (localStorage.getItem("jpstudy_gp_srs_mode_v1") === "0") state.grammarPractice.srsOn = false;
  } catch (e) {
    /* ignore */
  }
  gpSrsToggleBtn.classList.toggle("active", state.grammarPractice.srsOn);
  gpSrsToggleBtn.textContent = t(state.grammarPractice.srsOn ? "gpSrsOn" : "gpSrsOff");
  gpRenderLessonChips(state.grammarPractice.level);
  gpStartSession();

  // Turns "漢字[かんじ]" bracket notation into <ruby><rt> furigana — escape
  // first so any stray < > & in the source text can't leak into the markup.
  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function furiganaToHtml(text) {
    return escapeHtml(text).replace(/([一-龯々〆〇]+)\[([^\]<>]+)\]/g, "<ruby>$1<rt>$2</rt></ruby>");
  }

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
    const shuffleToggleBtn = document.getElementById(ids.shuffleToggle);
    const skipBtn = document.getElementById(ids.skip);

    const qs = { queue: [], current: null, revealed: false, masteredCount: 0, totalCount: 0, shuffleOn: true };

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
      sentenceEl.innerHTML = furiganaToHtml(item.jp);
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

    if (shuffleToggleBtn) {
      shuffleToggleBtn.addEventListener("click", () => {
        qs.shuffleOn = !qs.shuffleOn;
        shuffleToggleBtn.classList.toggle("active", qs.shuffleOn);
        shuffleToggleBtn.textContent = t(qs.shuffleOn ? "shuffleOn" : "shuffleOff");
        if (qs.shuffleOn) qs.queue = shuffle(qs.queue);
      });
    }
    if (skipBtn)
      skipBtn.addEventListener("click", () => {
        if (!qs.current) return;
        qs.queue.push(qs.current);
        showNext();
      });

    function start(buildFn) {
      const items = buildFn().map((q) => ({ ...q, streak: 0 }));
      qs.queue = qs.shuffleOn ? shuffle(items) : items.slice();
      qs.totalCount = items.length;
      qs.masteredCount = 0;
      qs.current = null;
      showNext();
    }

    return { start, state: qs, cardEl };
  }

  // ---------- word list ----------
  const wlLevelChips = document.querySelectorAll("#wl-level-chips .chip");
  const wlLessonChipsEl = document.getElementById("wl-lesson-chips");
  const wlSearchInputEl = document.getElementById("wl-search-input");
  const wordlistContainer = document.getElementById("wordlist-container");
  let currentWordListLevel = "all";
  let currentWordListLesson = null; // null = "all lessons" for the selected level
  let wlSearchQuery = "";

  // Single search box that auto-detects what kind of query it is: any kanji
  // character means "search word text" (substring anywhere, but results
  // ranked by how early the match falls — a match at the front of the word
  // outranks one buried in the middle); any kana means "search reading"
  // (plain substring — a reading match is inherently in-order since kana
  // readings are just the pronunciation spelled out left to right); anything
  // else is treated as an English meaning search.
  function wlQueryKind(query) {
    if (/[一-龯]/.test(query)) return "kanji";
    if (/[ぁ-んァ-ヶーゝゞ]/.test(query)) return "reading";
    return "meaning";
  }
  function wlMatchesQuery(item, query, kind) {
    if (kind === "kanji") return item.word.includes(query);
    if (kind === "reading") return (item.reading || item.word).includes(query);
    return (item.meaning || "").toLowerCase().includes(query.toLowerCase());
  }
  function wlSearchResults(levels, data, query) {
    const kind = wlQueryKind(query);
    const matches = [];
    levels.forEach((l) => {
      (data[l] || []).forEach((item) => {
        if (wlMatchesQuery(item, query, kind)) matches.push({ ...item, level: l });
      });
    });
    if (kind === "kanji") {
      matches.sort((a, b) => a.word.indexOf(query) - b.word.indexOf(query));
    }
    return matches;
  }

  function wlRowHtml(item) {
    const rowClass = isWeak(item) ? ' class="wl-row-weak"' : "";
    return `
      <tr${rowClass}>
        <td class="wl-word">${item.word}</td>
        <td class="wl-reading">${item.reading}</td>
        <td class="wl-meaning">${item.meaning}</td>
      </tr>`;
  }
  function wlTableHtml(rowsHtml) {
    return `
      <table class="wordlist-table">
        <thead><tr><th>${t("wlWord")}</th><th>${t("wlReading")}</th><th>${t("wlMeaning")}</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>`;
  }

  function renderWlLessonChips(level) {
    if (level === "all") {
      wlLessonChipsEl.innerHTML = "";
      wlLessonChipsEl.hidden = true;
      return;
    }
    const data = window.VOCAB_DATA || {};
    const items = data[level] || [];
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
    if (!lessonNums.length) {
      wlLessonChipsEl.innerHTML = "";
      wlLessonChipsEl.hidden = true;
      return;
    }
    wlLessonChipsEl.hidden = false;
    const allActive = currentWordListLesson === null;
    const allChip = `<button class="chip lesson-chip${allActive ? " active" : ""}" data-lesson="all">${t("allLessons")}</button>`;
    const chips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        const isActive = currentWordListLesson === n;
        const goldClass = isFullyMastered(level, n) ? " chip-golden" : "";
        return `<button class="chip lesson-chip${isActive ? " active" : ""}${goldClass}" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    wlLessonChipsEl.innerHTML = allChip + chips;
    wlLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        currentWordListLesson = chip.dataset.lesson === "all" ? null : Number(chip.dataset.lesson);
        renderWlLessonChips(level);
        renderWordList(level);
      });
    });
  }

  function renderWordList(level) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    const query = wlSearchQuery.trim();

    // A search query is a global filter across the selected level(s) —
    // it ignores the lesson-chip selection and shows one flat, relevance-
    // ranked result list instead of the lesson-by-lesson breakdown.
    if (query) {
      const matches = wlSearchResults(levels, data, query);
      wordlistContainer.innerHTML = matches.length
        ? wlTableHtml(matches.map(wlRowHtml).join(""))
        : `<p class="wl-empty-note">${t("wlNoResults")}</p>`;
      return;
    }

    if (level === "all") {
      // No single level selected — no lesson chips to drive this (lesson
      // numbers aren't unique across levels), so show everything stacked.
      wordlistContainer.innerHTML = levels
        .map((l) => {
          const items = data[l] || [];
          if (!items.length) return "";
          const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[l]) || {};
          const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort(
            (a, b) => a - b
          );
          const hasUnlabeled = items.some((item) => item.lesson === undefined);
          const groups = hasUnlabeled ? [...lessonNums, undefined] : lessonNums;
          const lessonBlocks = groups
            .map((lessonNum) => {
              const lessonItems = items.filter((item) => item.lesson === lessonNum).map((item) => ({ ...item, level: l }));
              if (!lessonItems.length) return "";
              const heading =
                lessonNum === undefined ? "Other" : lessonTitles[lessonNum] ? `${lessonNum}課 ${lessonTitles[lessonNum]}` : `${lessonNum}課`;
              return `
                <div class="wordlist-lesson-block">
                  <h4 class="wordlist-lesson-heading">${heading}</h4>
                  ${wlTableHtml(lessonItems.map(wlRowHtml).join(""))}
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
      return;
    }

    // A specific level: lesson chips drive which lesson(s) are shown, so
    // you jump straight to one instead of scrolling through the whole level.
    const items = (data[level] || []).map((item) => ({ ...item, level }));
    if (!items.length) {
      wordlistContainer.innerHTML = "";
      return;
    }
    const lessonTitles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    const lessonNums = [...new Set(items.map((item) => item.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
    const hasUnlabeled = items.some((item) => item.lesson === undefined);
    const groups =
      currentWordListLesson === null ? (hasUnlabeled ? [...lessonNums, undefined] : lessonNums) : [currentWordListLesson];
    const lessonBlocks = groups
      .map((lessonNum) => {
        const lessonItems = items.filter((item) => item.lesson === lessonNum);
        if (!lessonItems.length) return "";
        const heading =
          lessonNum === undefined ? "Other" : lessonTitles[lessonNum] ? `${lessonNum}課 ${lessonTitles[lessonNum]}` : `${lessonNum}課`;
        return `
          <div class="wordlist-lesson-block">
            <h4 class="wordlist-lesson-heading">${heading}</h4>
            ${wlTableHtml(lessonItems.map(wlRowHtml).join(""))}
          </div>`;
      })
      .join("");
    wordlistContainer.innerHTML = lessonBlocks;
  }

  wlLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      wlLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentWordListLevel = chip.dataset.level;
      currentWordListLesson = null;
      renderWlLessonChips(currentWordListLevel);
      renderWordList(currentWordListLevel);
    });
  });

  wlSearchInputEl.addEventListener("input", () => {
    wlSearchQuery = wlSearchInputEl.value;
    renderWordList(currentWordListLevel);
  });

  function refreshWordList() {
    renderWordList(currentWordListLevel);
  }

  renderWlLessonChips(currentWordListLevel);
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

  const conjState = { form: "all", shuffleOn: true, queue: [], current: null, flipped: false, masteredCount: 0, totalCount: 0 };

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
    conjCardEl.classList.remove("flipped", "card-refresh");
    conjState.flipped = false;
    conjGradeButtonsEl.hidden = true;
    conjHintEl.hidden = false;
    void conjCardEl.offsetWidth;
    conjCardEl.classList.remove("no-anim");
    conjCardEl.classList.add("card-refresh");
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
    conjState.queue = conjState.shuffleOn ? shuffle(items) : items.slice();
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

  const conjShuffleToggleBtn = document.getElementById("conj-shuffle-toggle");
  conjShuffleToggleBtn.addEventListener("click", () => {
    conjState.shuffleOn = !conjState.shuffleOn;
    conjShuffleToggleBtn.classList.toggle("active", conjState.shuffleOn);
    conjShuffleToggleBtn.textContent = t(conjState.shuffleOn ? "shuffleOn" : "shuffleOff");
    if (conjState.shuffleOn) conjState.queue = shuffle(conjState.queue);
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
    conjVerbCardEl.classList.remove("flipped", "card-refresh");
    conjVerbState.flipped = false;
    conjVerbGradeButtonsEl.hidden = true;
    conjVerbHintEl.hidden = false;
    void conjVerbCardEl.offsetWidth;
    conjVerbCardEl.classList.remove("no-anim");
    conjVerbCardEl.classList.add("card-refresh");
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
    shuffleToggle: "cs-shuffle-toggle",
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
    if (!document.getElementById("grammar-view").classList.contains("active")) return;
    if (!document.getElementById("conjugation-subview").classList.contains("active")) return;
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
      if (state.kanjiWrite.level !== "all") kwRenderLessonChips(state.kanjiWrite.level);
      if (state.furigana.level !== "all") fgRenderLessonChips(state.furigana.level);
      // The timeline builds its text in JS rather than from data-i18n
      // attributes, so applyTranslations() alone can't reach it.
      renderTimeline();
    });
  });

  // ---------- settings modal (gear icon: silent mode + dark mode) ----------
  const settingsOpenBtn = document.getElementById("settings-open-btn");
  const settingsModal = document.getElementById("settings-modal");
  const settingsCloseX = document.getElementById("settings-close-x");
  const settingsSilentToggle = document.getElementById("settings-silent-toggle");
  const settingsDarkToggle = document.getElementById("settings-dark-toggle");
  const themeSwatches = document.querySelectorAll(".theme-swatch");

  function syncSettingsToggleUI() {
    if (settingsSilentToggle) {
      settingsSilentToggle.classList.toggle("active", silentMode);
      settingsSilentToggle.setAttribute("aria-checked", String(silentMode));
    }
    if (settingsDarkToggle) {
      const isDark = currentTheme === "dark";
      settingsDarkToggle.classList.toggle("active", isDark);
      settingsDarkToggle.setAttribute("aria-checked", String(isDark));
    }
    themeSwatches.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.colorTheme === currentColorTheme);
    });
  }
  syncSettingsToggleUI();

  themeSwatches.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentColorTheme = btn.dataset.colorTheme;
      try {
        localStorage.setItem(COLOR_THEME_KEY, currentColorTheme);
      } catch (e) {
        /* ignore — theme choice just won't persist */
      }
      applyTheme();
      syncSettingsToggleUI();
    });
  });

  if (settingsOpenBtn && settingsModal) {
    settingsOpenBtn.addEventListener("click", () => {
      settingsModal.hidden = false;
    });
  }
  if (settingsCloseX && settingsModal) {
    settingsCloseX.addEventListener("click", () => {
      settingsModal.hidden = true;
    });
  }
  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) settingsModal.hidden = true;
    });
  }
  if (settingsSilentToggle) {
    settingsSilentToggle.addEventListener("click", () => {
      silentMode = !silentMode;
      try {
        localStorage.setItem(SILENT_MODE_KEY, silentMode ? "1" : "0");
      } catch (e) {
        /* ignore — silent mode choice just won't persist */
      }
      if (silentMode && window.speechSynthesis) window.speechSynthesis.cancel();
      syncSettingsToggleUI();
    });
  }
  if (settingsDarkToggle) {
    settingsDarkToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, currentTheme);
      } catch (e) {
        /* ignore — theme choice just won't persist */
      }
      applyTheme();
      syncSettingsToggleUI();
    });
  }

  // ---------- home: study timeline ----------
  // A two-phase plan built backwards from the exam date. Phase 1 "learn"
  // walks every vocab and grammar lesson once at a chosen daily pace; phase 2
  // "review" starts the day after the learning deadline and is recurring
  // habits rather than new material.
  //
  // The daily checklist deliberately shows the NEXT undone lessons rather than
  // whatever the calendar says you should have done on this exact date. Miss a
  // few days and a date-keyed plan strands you on lessons you'll never open
  // again; this way you always get the next chunk, and "how far behind am I"
  // is reported separately instead of being baked into the list.
  const PLAN_KEY = "jpstudy_plan_v1";
  const PLAN_DONE_KEY = "jpstudy_plan_done_v1";
  const PLAN_DAILY_KEY = "jpstudy_plan_daily_v1";
  const PLAN_DEFAULTS = {
    startDate: todayISO(),
    studyEnd: "2026-09-30",
    examDate: "2026-12-06",
    vocabPerDay: 3,
    grammarPerDay: 2,
  };

  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  // Dates are handled as local midnight rather than through Date.parse on the
  // bare ISO string, which JS reads as UTC and would shift the day for anyone
  // west of Greenwich.
  function parseISO(iso) {
    const [y, m, d] = String(iso).split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }
  function daysBetween(aISO, bISO) {
    return Math.round((parseISO(bISO) - parseISO(aISO)) / 86400000);
  }
  function addDaysISO(iso, n) {
    const d = parseISO(iso);
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function fmtDate(iso) {
    const d = parseISO(iso);
    return d.toLocaleDateString(currentLang === "ja" ? "ja-JP" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  function fmtShort(iso) {
    const d = parseISO(iso);
    return d.toLocaleDateString(currentLang === "ja" ? "ja-JP" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  let plan = { ...PLAN_DEFAULTS };
  try {
    const saved = JSON.parse(localStorage.getItem(PLAN_KEY) || "null");
    if (saved) plan = { ...PLAN_DEFAULTS, ...saved };
  } catch (e) {
    plan = { ...PLAN_DEFAULTS };
  }
  function savePlan() {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch (e) {
      /* ignore */
    }
  }
  savePlan(); // pins startDate on first ever load

  let planDone = {};
  try {
    planDone = JSON.parse(localStorage.getItem(PLAN_DONE_KEY) || "{}");
  } catch (e) {
    planDone = {};
  }
  function savePlanDone() {
    try {
      localStorage.setItem(PLAN_DONE_KEY, JSON.stringify(planDone));
    } catch (e) {
      /* ignore */
    }
  }

  let planDaily = {};
  try {
    planDaily = JSON.parse(localStorage.getItem(PLAN_DAILY_KEY) || "{}");
  } catch (e) {
    planDaily = {};
  }
  function savePlanDaily() {
    try {
      localStorage.setItem(PLAN_DAILY_KEY, JSON.stringify(planDaily));
    } catch (e) {
      /* ignore */
    }
  }

  // The queues are derived from the data files, not hard-coded, so adding a
  // lesson to vocab-data.js or grammar-practice-data.js lengthens the plan
  // automatically instead of silently falling outside it.
  const PLAN_LEVELS = ["N4", "N3"];
  function buildVocabQueue() {
    const data = window.VOCAB_DATA || {};
    const out = [];
    PLAN_LEVELS.forEach((lvl) => {
      const nums = [...new Set((data[lvl] || []).map((i) => i.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
      nums.forEach((n) => out.push({ kind: "vocab", level: lvl, lesson: n }));
    });
    return out;
  }
  function buildGrammarQueue() {
    const data = window.GRAMMAR_DATA || {};
    const out = [];
    PLAN_LEVELS.forEach((lvl) => {
      const nums = [...new Set((data[lvl] || []).map((i) => i.lesson).filter((n) => n !== undefined))].sort((a, b) => a - b);
      nums.forEach((n) => out.push({ kind: "grammar", level: lvl, lesson: n }));
    });
    return out;
  }
  const vocabQueue = buildVocabQueue();
  const grammarQueue = buildGrammarQueue();
  const taskKey = (t) => `${t.kind}:${t.level}:${t.lesson}`;
  // planDone stores the ISO date a lesson was ticked, not just true, so the
  // plan can tell "finished today's three" from "finished three at some point".
  // Older saves used a bare true; those stay done, they just don't count
  // toward today's quota (which is the safe direction to be wrong in).
  const isTaskDone = (t) => !!planDone[taskKey(t)];
  const doneOn = (t) => {
    const v = planDone[taskKey(t)];
    return typeof v === "string" ? v : null;
  };
  const doneTodayCount = (queue, today) => queue.filter((t) => doneOn(t) === today).length;

  // Everything still to do, and how much of today's quota is already spent.
  // Doing a fourth lesson today doesn't just tick a box — it shortens the
  // queue, so tomorrow starts one lesson further along and the finish date
  // moves in by a day for every full extra day's worth you get through.
  function projectDays(queueLeft, perDay, doneToday, dayCount) {
    const out = [];
    let i = Math.max(0, 0);
    const todayQuota = Math.max(0, perDay - doneToday);
    out.push(queueLeft.slice(0, todayQuota));
    i = todayQuota;
    for (let d = 1; d < dayCount; d++) {
      out.push(queueLeft.slice(i, i + perDay));
      i += perDay;
    }
    return out;
  }
  function finishDateFor(leftCount, perDay, doneToday, today) {
    if (leftCount <= 0) return today;
    const todayQuota = Math.max(0, perDay - doneToday);
    if (leftCount <= todayQuota) return today;
    return addDaysISO(today, Math.ceil((leftCount - todayQuota) / Math.max(1, perDay)));
  }

  function vocabLessonTitle(level, lesson) {
    const titles = (window.VOCAB_LESSONS && window.VOCAB_LESSONS[level]) || {};
    return titles[lesson] ? `${level} ${lesson}課 ${titles[lesson]}` : `${level} ${lesson}課`;
  }
  function vocabWordCount(level, lesson) {
    return ((window.VOCAB_DATA || {})[level] || []).filter((i) => i.lesson === lesson).length;
  }
  function grammarPatternCount(level, lesson) {
    return ((window.GRAMMAR_DATA || {})[level] || []).filter((i) => i.lesson === lesson).length;
  }

  function planPhase(iso) {
    if (daysBetween(iso, plan.studyEnd) >= 0) return "learn";
    if (daysBetween(iso, plan.examDate) >= 0) return "review";
    return "done";
  }

  // Review-phase habits repeat daily, so they're keyed by date rather than by
  // lesson the way phase-1 tasks are.
  const REVIEW_HABITS = [
    { id: "srs", i18n: "tlHabitSrs", go: () => goTo("grammar", "grammarpractice") },
    { id: "weak", i18n: "tlHabitWeak", go: () => goTo("vocab", "flashcards") },
    { id: "furigana", i18n: "tlHabitFurigana", go: () => goTo("vocab", "furigana") },
    { id: "writing", i18n: "tlHabitWriting", go: () => goTo("vocab", "kanjiwrite") },
  ];

  function goTo(view, subview) {
    const tab = document.querySelector(`.tab[data-view="${view}"]`);
    if (tab) tab.click();
    if (subview) {
      const btn = document.querySelector(`#${view}-subnav .subnav-btn[data-subview="${subview}"]`);
      if (btn) btn.click();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Jumps straight into one lesson: switches tab + subview, then sets the
  // level/lesson selection directly rather than synthesising chip clicks,
  // since the chips toggle and would otherwise need clearing first.
  function openLesson(task) {
    if (task.kind === "vocab") {
      goTo("vocab", "flashcards");
      state.flashcards.level = task.level;
      state.flashcards.lessons = [task.lesson];
      state.flashcards.isolateMode = false;
      fcLevelChips.forEach((c) => c.classList.toggle("active", c.dataset.level === task.level));
      renderLessonChips(task.level);
      startSession();
    } else {
      goTo("grammar", "grammarpractice");
      state.grammarPractice.level = task.level;
      state.grammarPractice.lessons = [task.lesson];
      gpLevelChips.forEach((c) => c.classList.toggle("active", c.dataset.level === task.level));
      gpRenderLessonChips(task.level);
      gpStartSession();
    }
  }

  const tlDaysExamEl = document.getElementById("tl-days-exam");
  const tlDaysStudyEl = document.getElementById("tl-days-study");
  const tlExamDateEl = document.getElementById("tl-exam-date");
  const tlStudyDateEl = document.getElementById("tl-study-date");
  const tlQuotaNumEl = document.getElementById("tl-quota-num");
  const tlQuotaSplitEl = document.getElementById("tl-quota-split");
  const tlQuotaSubEl = document.getElementById("tl-quota-sub");
  const tlQuotaCardEl = document.getElementById("tl-quota-card");
  const tlMapEl = document.getElementById("tl-map");
  const tlTodayDateEl = document.getElementById("tl-today-date");
  const tlStatusEl = document.getElementById("tl-status");
  const tlTasksEl = document.getElementById("tl-tasks");
  const tlTasksEmptyEl = document.getElementById("tl-tasks-empty");
  const tlVocabBarEl = document.getElementById("tl-vocab-bar");
  const tlVocabLabelEl = document.getElementById("tl-vocab-label");
  const tlGrammarBarEl = document.getElementById("tl-grammar-bar");
  const tlGrammarLabelEl = document.getElementById("tl-grammar-label");
  const tlVocabPaceEl = document.getElementById("tl-vocab-pace");
  const tlGrammarPaceEl = document.getElementById("tl-grammar-pace");
  const tlForecastEl = document.getElementById("tl-forecast");
  const tlWeekEl = document.getElementById("tl-week");

  function nextUndone(queue, n) {
    return queue.filter((t) => !isTaskDone(t)).slice(0, n);
  }
  function doneCount(queue) {
    return queue.filter(isTaskDone).length;
  }

  function renderTimeline() {
    const today = todayISO();
    const phase = planPhase(today);

    const toExam = daysBetween(today, plan.examDate);
    const toStudyEnd = daysBetween(today, plan.studyEnd);
    tlDaysExamEl.textContent = toExam >= 0 ? toExam : "—";
    tlDaysStudyEl.textContent = toStudyEnd >= 0 ? toStudyEnd : "0";
    tlExamDateEl.textContent = fmtDate(plan.examDate);
    tlStudyDateEl.textContent = fmtDate(plan.studyEnd);
    renderQuotaCard(phase, today);
    tlTodayDateEl.textContent = fmtShort(today);

    const vDone = doneCount(vocabQueue);
    const gDone = doneCount(grammarQueue);
    const vTotal = vocabQueue.length;
    const gTotal = grammarQueue.length;
    tlVocabBarEl.style.width = vTotal ? `${Math.round((vDone / vTotal) * 100)}%` : "0%";
    tlGrammarBarEl.style.width = gTotal ? `${Math.round((gDone / gTotal) * 100)}%` : "0%";
    tlVocabLabelEl.textContent = t("tlLessonsDone", { done: vDone, total: vTotal });
    tlGrammarLabelEl.textContent = t("tlLessonsDone", { done: gDone, total: gTotal });

    tlVocabPaceEl.value = plan.vocabPerDay;
    tlGrammarPaceEl.value = plan.grammarPerDay;

    // Forecast: at the current pace, when does each track finish? Today's
    // already-completed lessons are discounted from today's quota, so getting
    // ahead pulls the date in instead of just emptying the list sooner.
    const vLeft = vTotal - vDone;
    const gLeft = gTotal - gDone;
    const vToday = doneTodayCount(vocabQueue, today);
    const gToday = doneTodayCount(grammarQueue, today);
    const vFinish = finishDateFor(vLeft, plan.vocabPerDay, vToday, today);
    const gFinish = finishDateFor(gLeft, plan.grammarPerDay, gToday, today);
    const worstFinish = daysBetween(vFinish, gFinish) > 0 ? gFinish : vFinish;
    const slack = daysBetween(worstFinish, plan.studyEnd);
    if (!vLeft && !gLeft) {
      tlForecastEl.textContent = t("tlForecastComplete");
      tlForecastEl.className = "tl-forecast tl-ok";
    } else if (slack >= 0) {
      // Report both tracks, not just the worst. They finish on different days,
      // and knowing WHICH one sets the overall date is the difference between
      // usefully pushing grammar and pointlessly grinding extra vocab.
      tlForecastEl.textContent = t("tlForecastOk", {
        date: fmtDate(worstFinish),
        slack,
        vdate: fmtDate(vFinish),
        gdate: fmtDate(gFinish),
        limiter: t(daysBetween(vFinish, gFinish) > 0 ? "tabGrammar" : "tabVocab"),
      });
      tlForecastEl.className = "tl-forecast tl-ok";
    } else {
      const daysLeft = Math.max(1, toStudyEnd + 1);
      tlForecastEl.textContent = t("tlForecastLate", {
        date: fmtDate(worstFinish),
        over: -slack,
        v: Math.ceil(vLeft / daysLeft),
        g: Math.ceil(gLeft / daysLeft),
      });
      tlForecastEl.className = "tl-forecast tl-warn";
    }

    renderMap();
    renderTodayTasks(phase, today);
    renderWeek(phase, today);
  }

  // The third countdown cell reports the day's quota rather than the phase
  // name, since "am I done for today" is the question you actually open this
  // page to answer. Outside the learning phase there is no lesson quota, so it
  // falls back to naming the phase.
  function renderQuotaCard(phase, today) {
    if (phase !== "learn") {
      tlQuotaNumEl.textContent = t(phase === "review" ? "tlPhaseReview" : "tlPhaseDone");
      tlQuotaSplitEl.textContent = "";
      tlQuotaSubEl.textContent = t(phase === "review" ? "tlPhaseReviewSub" : "tlPhaseDoneSub");
      tlQuotaCardEl.classList.remove("tl-quota-met", "tl-quota-over");
      return;
    }
    const vT = doneTodayCount(vocabQueue, today);
    const gT = doneTodayCount(grammarQueue, today);
    const vQ = plan.vocabPerDay;
    const gQ = plan.grammarPerDay;
    const met = vT >= vQ && gT >= gQ;
    // Surplus only counts once BOTH tracks are met — five vocab and no grammar
    // is not "over quota", and badging it as such would celebrate skipping the
    // track that actually sets the finish date.
    const extra = met ? Math.max(0, vT - vQ) + Math.max(0, gT - gQ) : 0;
    tlQuotaNumEl.textContent = `${vT + gT}`;
    tlQuotaSplitEl.innerHTML =
      `<span class="tl-qs${vT >= vQ ? " tl-qs-ok" : ""}">${t("tabVocab")} ${vT}/${vQ}</span>` +
      `<span class="tl-qs${gT >= gQ ? " tl-qs-ok" : ""}">${t("tabGrammar")} ${gT}/${gQ}</span>`;
    tlQuotaSubEl.textContent = extra > 0 ? t("tlQuotaOver", { n: extra }) : met ? t("tlQuotaDone") : t("tlQuotaRemaining", { n: vQ + gQ - vT - gT });
    tlQuotaCardEl.classList.toggle("tl-quota-met", met && extra === 0);
    tlQuotaCardEl.classList.toggle("tl-quota-over", extra > 0);
  }

  // One circle per lesson, grouped level → track. Clicking toggles it, which
  // is also the only way to undo a lesson that isn't in today's checklist any
  // more: turning a circle back to grey drops it into the queue again and the
  // projected dates move out to match.
  function renderMap() {
    const today = todayISO();
    const sections = [];
    PLAN_LEVELS.forEach((lvl) => {
      const tracks = [
        { kind: "vocab", label: t("tabVocab"), queue: vocabQueue.filter((x) => x.level === lvl) },
        { kind: "grammar", label: t("tabGrammar"), queue: grammarQueue.filter((x) => x.level === lvl) },
      ].filter((tr) => tr.queue.length);
      if (!tracks.length) return;
      const inner = tracks
        .map((tr) => {
          const done = tr.queue.filter(isTaskDone).length;
          const dots = tr.queue
            .map((task) => {
              const isDone = isTaskDone(task);
              const title =
                task.kind === "vocab" ? vocabLessonTitle(task.level, task.lesson) : `${task.level} ${task.lesson}課`;
              return `<button class="tl-dot${isDone ? " tl-dot-done" : ""}" data-key="${taskKey(task)}" title="${title}" aria-pressed="${isDone}">${task.lesson}</button>`;
            })
            .join("");
          return `<div class="tl-track"><div class="tl-track-head"><span class="tl-track-name">${tr.label}</span><span class="tl-track-count">${done} / ${tr.queue.length}</span></div><div class="tl-dots">${dots}</div></div>`;
        })
        .join("");
      sections.push(`<section class="tl-map-level"><h3 class="tl-map-level-title">${lvl}</h3>${inner}</section>`);
    });
    tlMapEl.innerHTML = sections.join("");
    const byKey = {};
    vocabQueue.concat(grammarQueue).forEach((task) => {
      byKey[taskKey(task)] = task;
    });
    tlMapEl.querySelectorAll(".tl-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const key = dot.dataset.key;
        if (planDone[key]) delete planDone[key];
        else planDone[key] = today;
        savePlanDone();
        renderTimeline();
      });
    });
  }

  function renderTodayTasks(phase, today) {
    tlTasksEl.innerHTML = "";
    let items = [];

    if (phase === "learn") {
      // Today's row set = what you already ticked today (kept on screen so the
      // day can actually be finished) + enough new lessons to fill the quota +
      // one optional bonus once the quota is met, so getting ahead is always
      // one click away rather than needing the pace changed.
      function slotsFor(queue, perDay) {
        const doneToday = queue.filter((x) => doneOn(x) === today);
        const quotaLeft = Math.max(0, perDay - doneToday.length);
        const upcoming = nextUndone(queue, quotaLeft || 1);
        const rows = doneToday.concat(upcoming.slice(0, quotaLeft));
        const bonus = quotaLeft === 0 && upcoming.length ? [upcoming[0]] : [];
        return { rows, bonus };
      }
      const vs = slotsFor(vocabQueue, plan.vocabPerDay);
      const gs = slotsFor(grammarQueue, plan.grammarPerDay);
      const ordered = vs.rows.concat(vs.bonus).concat(gs.rows).concat(gs.bonus);
      const bonusKeys = new Set(vs.bonus.concat(gs.bonus).map(taskKey));
      items = ordered.map((task) => ({
        key: taskKey(task),
        done: isTaskDone(task),
        bonus: bonusKeys.has(taskKey(task)),
        title:
          task.kind === "vocab"
            ? vocabLessonTitle(task.level, task.lesson)
            : `${task.level} ${task.lesson}課`,
        meta:
          task.kind === "vocab"
            ? t("tlVocabTaskMeta", { n: vocabWordCount(task.level, task.lesson) })
            : t("tlGrammarTaskMeta", { n: grammarPatternCount(task.level, task.lesson) }),
        badge: bonusKeys.has(taskKey(task)) ? t("tlBonus") : t(task.kind === "vocab" ? "tabVocab" : "tabGrammar"),
        badgeKind: bonusKeys.has(taskKey(task)) ? "bonus" : task.kind,
        toggle: () => {
          if (planDone[taskKey(task)]) delete planDone[taskKey(task)];
          else planDone[taskKey(task)] = today;
          savePlanDone();
          renderTimeline();
        },
        open: () => openLesson(task),
      }));
      // Expected-vs-actual, reported separately from the list itself. Only
      // days that have FULLY passed count toward what's expected — today's
      // batch isn't overdue until tomorrow, so a fresh plan opened on day one
      // must not greet you as already behind.
      const elapsed = Math.max(0, daysBetween(plan.startDate, today));
      const expectedV = Math.min(vocabQueue.length, elapsed * plan.vocabPerDay);
      const expectedG = Math.min(grammarQueue.length, elapsed * plan.grammarPerDay);
      const behind = expectedV - doneCount(vocabQueue) + (expectedG - doneCount(grammarQueue));
      const vT = doneTodayCount(vocabQueue, today);
      const gT = doneTodayCount(grammarQueue, today);
      const quotaMet = vT >= plan.vocabPerDay && gT >= plan.grammarPerDay;
      // Surplus only counts once BOTH tracks have hit their target. Racing
      // ahead on vocab while grammar sits untouched isn't being ahead, and
      // saying so would point you at the track that isn't the constraint.
      const ahead = quotaMet
        ? Math.max(0, vT - plan.vocabPerDay) + Math.max(0, gT - plan.grammarPerDay)
        : 0;
      if (behind > 0) {
        tlStatusEl.textContent = t("tlBehind", { n: behind });
        tlStatusEl.className = "tl-status tl-warn";
      } else if (ahead > 0) {
        tlStatusEl.textContent = t("tlAhead", { n: ahead, v: vT, g: gT });
        tlStatusEl.className = "tl-status tl-ok";
      } else if (quotaMet) {
        tlStatusEl.textContent = t("tlQuotaMet");
        tlStatusEl.className = "tl-status tl-ok";
      } else {
        tlStatusEl.textContent = t("tlTodayQuota", {
          v: Math.max(0, plan.vocabPerDay - vT),
          g: Math.max(0, plan.grammarPerDay - gT),
        });
        tlStatusEl.className = "tl-status tl-ok";
      }
    } else if (phase === "review") {
      const day = planDaily[today] || {};
      items = REVIEW_HABITS.map((h) => ({
        key: h.id,
        done: !!day[h.id],
        title: t(h.i18n),
        meta: "",
        badge: t("tlPhaseReview"),
        badgeKind: "review",
        toggle: () => {
          const d = planDaily[today] || (planDaily[today] = {});
          if (d[h.id]) delete d[h.id];
          else d[h.id] = true;
          savePlanDaily();
          renderTimeline();
        },
        open: h.go,
      }));
      tlStatusEl.textContent = t("tlReviewStatus");
      tlStatusEl.className = "tl-status tl-ok";
    } else {
      tlStatusEl.textContent = t("tlAfterExam");
      tlStatusEl.className = "tl-status tl-ok";
    }

    // Required work first, then optional bonus rows, then finished rows struck
    // through at the bottom. Sorting bonus above still-owed grammar would
    // dangle an extra vocab lesson in front of you while the day's actual
    // target was unmet. Array sort is stable, so vocab-then-grammar survives
    // within each band.
    const band = (it) => (it.done ? 2 : it.bonus ? 1 : 0);
    items.sort((a, b) => band(a) - band(b));

    tlTasksEmptyEl.hidden = items.length > 0;
    items.forEach((it) => {
      const li = document.createElement("li");
      li.className = `tl-task${it.done ? " tl-task-done" : ""}${it.bonus ? " tl-task-bonus" : ""}`;
      const box = document.createElement("button");
      box.className = "tl-check";
      box.setAttribute("aria-pressed", it.done ? "true" : "false");
      box.textContent = it.done ? "✓" : "";
      box.addEventListener("click", it.toggle);
      const body = document.createElement("button");
      body.className = "tl-task-body";
      body.innerHTML = `<span class="tl-task-title">${it.title}</span>${it.meta ? `<span class="tl-task-meta">${it.meta}</span>` : ""}`;
      body.addEventListener("click", it.open);
      const badge = document.createElement("span");
      badge.className = `tl-badge tl-badge-${it.badgeKind}`;
      badge.textContent = it.badge;
      li.appendChild(box);
      li.appendChild(body);
      li.appendChild(badge);
      tlTasksEl.appendChild(li);
    });
  }

  function renderWeek(phase, today) {
    const rows = [];
    if (phase === "learn") {
      // The projection starts from what's actually left and from how much of
      // today's quota is already spent, so a day where you did extra shifts
      // every following day up rather than leaving a stale calendar behind.
      const vLeftQ = vocabQueue.filter((t2) => !isTaskDone(t2));
      const gLeftQ = grammarQueue.filter((t2) => !isTaskDone(t2));
      const vDays = projectDays(vLeftQ, plan.vocabPerDay, doneTodayCount(vocabQueue, today), 7);
      const gDays = projectDays(gLeftQ, plan.grammarPerDay, doneTodayCount(grammarQueue, today), 7);
      for (let i = 0; i < 7; i++) {
        const iso = addDaysISO(today, i);
        if (daysBetween(iso, plan.studyEnd) < 0) break;
        const v = vDays[i] || [];
        const g = gDays[i] || [];
        if (!v.length && !g.length) {
          if (i === 0) rows.push({ iso, text: t("tlQuotaMetShort"), today: true });
          else break;
          continue;
        }
        const parts = [];
        if (v.length) parts.push(`${t("tabVocab")} ${v.map((x) => `${x.level} ${x.lesson}課`).join(", ")}`);
        if (g.length) parts.push(`${t("tabGrammar")} ${g.map((x) => `${x.level} ${x.lesson}課`).join(", ")}`);
        rows.push({ iso, text: parts.join(" · "), today: i === 0 });
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const iso = addDaysISO(today, i);
        if (daysBetween(iso, plan.examDate) < 0) break;
        rows.push({ iso, text: t("tlReviewDayLine"), today: i === 0 });
      }
    }
    tlWeekEl.innerHTML = rows.length
      ? rows
          .map(
            (r) =>
              `<li class="tl-week-row${r.today ? " tl-week-today" : ""}"><span class="tl-week-date">${fmtShort(r.iso)}</span><span class="tl-week-text">${r.text}</span></li>`
          )
          .join("")
      : `<li class="tl-week-row"><span class="tl-week-text">${t("tlNothingScheduled")}</span></li>`;
  }

  [tlVocabPaceEl, tlGrammarPaceEl].forEach((input) => {
    input.addEventListener("change", () => {
      const v = Math.max(1, Math.min(20, Number(tlVocabPaceEl.value) || 1));
      const g = Math.max(1, Math.min(20, Number(tlGrammarPaceEl.value) || 1));
      plan.vocabPerDay = v;
      plan.grammarPerDay = g;
      savePlan();
      renderTimeline();
    });
  });

  // Spreads whatever is still undone across the days that are actually left,
  // which is the only honest way to recover from a slipped week.
  document.getElementById("tl-reschedule").addEventListener("click", () => {
    const today = todayISO();
    const daysLeft = Math.max(1, daysBetween(today, plan.studyEnd) + 1);
    const vLeft = vocabQueue.length - doneCount(vocabQueue);
    const gLeft = grammarQueue.length - doneCount(grammarQueue);
    plan.vocabPerDay = Math.max(1, Math.ceil(vLeft / daysLeft));
    plan.grammarPerDay = Math.max(1, Math.ceil(gLeft / daysLeft));
    savePlan();
    renderTimeline();
  });

  document.getElementById("tl-reset").addEventListener("click", () => {
    if (!window.confirm("This clears every tick on your study plan and restarts it from today. Continue?")) return;
    planDone = {};
    planDaily = {};
    savePlanDone();
    savePlanDaily();
    plan = { ...PLAN_DEFAULTS, startDate: todayISO() };
    savePlan();
    renderTimeline();
  });

  renderTimeline();

  applyTranslations();
})();
