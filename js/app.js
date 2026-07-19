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
  }

  // ---------- persisted right/wrong progress (per word, per browser) ----------
  const PROGRESS_KEY = "jpstudy_progress_v1";
  let progressStore = {};
  try {
    progressStore = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch (e) {
    progressStore = {}; // storage unavailable (private browsing etc.) — just won't persist
  }
  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressStore));
    } catch (e) {
      /* ignore — progress simply won't persist this session */
    }
  }
  // id is level+lesson+word, so progress survives level/lesson filter changes
  // and only resets if you actually edit the word itself in vocab-data.js
  function wordId(item) {
    return `${item.level}::${item.lesson}::${item.word}`;
  }
  function getStats(item) {
    return progressStore[wordId(item)] || { box: 1, correct: 0, wrong: 0 };
  }
  function recordGrade(item, isCorrect) {
    const id = wordId(item);
    const stats = progressStore[id] || { box: 1, correct: 0, wrong: 0 };
    if (isCorrect) {
      stats.correct += 1;
      stats.box = Math.min(stats.box + 1, 5); // box 5 = well mastered
    } else {
      stats.wrong += 1;
      stats.box = 1; // any miss drops it back to "needs practice"
    }
    stats.lastSeen = new Date().toISOString();
    progressStore[id] = stats;
    saveProgress();
  }

  const state = {
    flashcards: {
      level: "all",
      lesson: "all",
      weakOnly: false,
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
    });
  });

  // ---------- flashcards ----------
  const fcLevelChips = document.querySelectorAll("#fc-level-chips .chip");
  const fcLessonChipsEl = document.getElementById("fc-lesson-chips");
  const dirBtns = document.querySelectorAll("#fc-direction-toggle .dir-btn");
  const weakToggleBtn = document.getElementById("fc-weak-toggle");
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

  function buildDeck(level, lesson, weakOnly) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    let items = levels.flatMap((l) => (data[l] || []).map((item) => ({ ...item, level: l })));
    if (lesson && lesson !== "all") {
      items = items.filter((item) => String(item.lesson) === String(lesson));
    }
    if (weakOnly) {
      items = items.filter((item) => getStats(item).box <= 2);
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
    return state.flashcards.totalCount ? t("allMastered") : t("noCards");
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
    const items = buildDeck(fc.level, fc.lesson, fc.weakOnly).map((item) => ({ ...item, streak: 0 }));
    fc.queue = items;
    fc.totalCount = items.length;
    fc.masteredCount = 0;
    fc.current = null;
    showNextCard();
  }

  // Wrong → reinsert a few cards ahead so it resurfaces soon.
  // Right → push to the back; after 2 correct answers in a row this
  // session, retire it instead of requeueing (mastered for now).
  function gradeCurrent(isCorrect) {
    const fc = state.flashcards;
    const item = fc.current;
    if (!item || !fc.flipped) return;
    recordGrade(item, isCorrect);
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
    const allChip = `<button class="chip lesson-chip active" data-lesson="all">All lessons</button>`;
    const lessonChips = lessonNums
      .map((n) => {
        const title = lessonTitles[n] ? `${n}課 ${lessonTitles[n]}` : `${n}課`;
        return `<button class="chip lesson-chip" data-lesson="${n}" title="${title}">${n}課</button>`;
      })
      .join("");
    fcLessonChipsEl.innerHTML = allChip + lessonChips;
    fcLessonChipsEl.querySelectorAll(".lesson-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        fcLessonChipsEl.querySelectorAll(".lesson-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.flashcards.lesson = chip.dataset.lesson;
        startSession();
      });
    });
  }

  fcLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      fcLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.flashcards.level = chip.dataset.level;
      state.flashcards.lesson = "all";
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

  weakToggleBtn.addEventListener("click", () => {
    state.flashcards.weakOnly = !state.flashcards.weakOnly;
    weakToggleBtn.classList.toggle("active", state.flashcards.weakOnly);
    startSession();
  });

  resetProgressBtn.addEventListener("click", () => {
    if (!window.confirm("This clears your right/wrong progress for every word. Continue?")) return;
    progressStore = {};
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
      li.textContent = item.pattern;
      li.tabIndex = 0;
      li.addEventListener("click", () => selectGrammarItem(i));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter") selectGrammarItem(i);
      });
      grammarListEl.appendChild(li);
    });
    grammarDetailEl.innerHTML = '<p class="grammar-empty">select a pattern from the list</p>';
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
    grammarDetailEl.innerHTML = `
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

  // ---------- word list ----------
  const wlLevelChips = document.querySelectorAll("#wl-level-chips .chip");
  const wordlistContainer = document.getElementById("wordlist-container");
  let currentWordListLevel = "all";

  function masteryBadge(item) {
    const stats = getStats(item);
    if (stats.correct === 0 && stats.wrong === 0) {
      return `<span class="wl-badge wl-badge-new">${t("badgeNew")}</span>`;
    }
    if (stats.box >= 4) {
      return `<span class="wl-badge wl-badge-mastered">${t("badgeMastered")}</span>`;
    }
    return `<span class="wl-badge wl-badge-learning">${t("badgeLearning")}</span>`;
  }

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
              .map(
                (item) => `
              <tr>
                <td class="wl-word">${item.word}</td>
                <td class="wl-reading">${item.reading}</td>
                <td class="wl-meaning">${item.meaning}</td>
                <td class="wl-progress">${masteryBadge({ ...item, level: l })}</td>
              </tr>`
              )
              .join("");
            return `
              <div class="wordlist-lesson-block">
                <h4 class="wordlist-lesson-heading">${heading}</h4>
                <table class="wordlist-table">
                  <thead><tr><th>${t("wlWord")}</th><th>${t("wlReading")}</th><th>${t("wlMeaning")}</th><th>${t("wlProgress")}</th></tr></thead>
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

  conjPracticeModeToggle.forEach((btn) => {
    btn.addEventListener("click", () => {
      conjPracticeModeToggle.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.practiceMode;
      conjPracticeByFormEl.classList.toggle("active", mode === "by-form");
      conjPracticeByVerbEl.classList.toggle("active", mode === "by-verb");
      if (mode === "by-verb" && !conjVerbPracticeStarted) {
        conjVerbPracticeStarted = true;
        populateVerbSelect();
        startVerbPractice(0);
      }
    });
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
    });
  });

  applyTranslations();
})();
