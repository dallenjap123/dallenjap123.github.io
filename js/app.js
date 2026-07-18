(function () {
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

  function updateProgress() {
    const fc = state.flashcards;
    progressEl.textContent = fc.totalCount ? `${fc.masteredCount} / ${fc.totalCount} mastered` : "0 / 0";
  }

  // Redraws the CURRENT card (e.g. after a direction toggle) without
  // advancing the queue.
  function renderCurrentFace() {
    const fc = state.flashcards;
    resetCardVisual();
    if (!fc.current) {
      cardHintEl.hidden = true;
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
      frontTextEl.textContent = fc.totalCount ? "🎉 all mastered for now!" : "no cards for this selection yet";
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
      return '<span class="wl-badge wl-badge-new">new</span>';
    }
    if (stats.box >= 4) {
      return '<span class="wl-badge wl-badge-mastered">mastered</span>';
    }
    return '<span class="wl-badge wl-badge-learning">learning</span>';
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
                  <thead><tr><th>Word</th><th>Reading</th><th>Meaning</th><th>Progress</th></tr></thead>
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
})();
