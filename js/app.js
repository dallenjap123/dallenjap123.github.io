(function () {
  const state = {
    flashcards: { direction: "word-meaning", deck: [], index: 0, flipped: false },
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
    });
  });

  // ---------- flashcards ----------
  const fcLevelChips = document.querySelectorAll("#fc-level-chips .chip");
  const dirBtns = document.querySelectorAll("#fc-direction-toggle .dir-btn");
  const cardEl = document.getElementById("flashcard");
  const frontTextEl = document.getElementById("card-front-text");
  const backTextEl = document.getElementById("card-back-text");
  const backReadingEl = document.getElementById("card-back-reading");
  const progressEl = document.getElementById("fc-progress");

  function buildDeck(level) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    return levels.flatMap((l) => (data[l] || []).map((item) => ({ ...item, level: l })));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderCard() {
    const fc = state.flashcards;
    // Freeze the flip transition while we reset + swap content, so a card
    // that was showing its back never reveals the next card's content
    // mid-rotation. Transition is switched back on right after.
    cardEl.classList.add("no-anim");
    cardEl.classList.remove("flipped");
    fc.flipped = false;
    const item = fc.deck[fc.index];
    if (!item) {
      frontTextEl.textContent = "no cards in this level yet";
      backTextEl.textContent = "";
      backReadingEl.textContent = "";
    } else if (fc.direction === "word-meaning") {
      frontTextEl.textContent = item.word;
      backTextEl.textContent = item.meaning;
      backReadingEl.textContent = item.reading;
    } else {
      frontTextEl.textContent = item.meaning;
      backTextEl.textContent = item.word;
      backReadingEl.textContent = item.reading;
    }
    progressEl.textContent = item ? `${fc.index + 1} / ${fc.deck.length}` : "0 / 0";
    // force layout so the reset is committed before transitions resume
    void cardEl.offsetWidth;
    cardEl.classList.remove("no-anim");
  }

  function loadDeck(level) {
    state.flashcards.deck = shuffle(buildDeck(level));
    state.flashcards.index = 0;
    renderCard();
  }

  fcLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      fcLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      loadDeck(chip.dataset.level);
    });
  });

  dirBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dirBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.flashcards.direction = btn.dataset.direction;
      renderCard();
    });
  });

  cardEl.addEventListener("click", () => {
    state.flashcards.flipped = !state.flashcards.flipped;
    cardEl.classList.toggle("flipped", state.flashcards.flipped);
  });

  document.getElementById("fc-shuffle").addEventListener("click", () => {
    state.flashcards.deck = shuffle(state.flashcards.deck);
    state.flashcards.index = 0;
    renderCard();
  });

  document.getElementById("fc-next").addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.deck.length) return;
    fc.index = (fc.index + 1) % fc.deck.length;
    renderCard();
  });

  document.getElementById("fc-prev").addEventListener("click", () => {
    const fc = state.flashcards;
    if (!fc.deck.length) return;
    fc.index = (fc.index - 1 + fc.deck.length) % fc.deck.length;
    renderCard();
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("flashcards-view").classList.contains("active")) return;
    if (e.code === "Space") {
      e.preventDefault();
      cardEl.click();
    }
    if (e.code === "ArrowRight") document.getElementById("fc-next").click();
    if (e.code === "ArrowLeft") document.getElementById("fc-prev").click();
  });

  loadDeck("all");

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

  function renderWordList(level) {
    const data = window.VOCAB_DATA || {};
    const levels = level === "all" ? Object.keys(data) : [level];
    wordlistContainer.innerHTML = levels
      .map((l) => {
        const items = data[l] || [];
        if (!items.length) return "";
        const rows = items
          .map(
            (item) => `
          <tr>
            <td class="wl-word">${item.word}</td>
            <td class="wl-reading">${item.reading}</td>
            <td class="wl-meaning">${item.meaning}</td>
          </tr>`
          )
          .join("");
        return `
          <div class="wordlist-group">
            <h3 class="wordlist-level-heading ${l.toLowerCase()}">${l}</h3>
            <table class="wordlist-table">
              <thead><tr><th>Word</th><th>Reading</th><th>Meaning</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>`;
      })
      .join("");
  }

  wlLevelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      wlLevelChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderWordList(chip.dataset.level);
    });
  });

  renderWordList("all");
})();
