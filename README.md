# 日本語ノート — Japanese Study Site

A static site with three tabs — Home, Vocab and Grammar:

**Home** is a study timeline built backwards from your exam date. See
"Study timeline" below.

**Vocab** has four modes, all filterable by JLPT level and lesson:
- **Word List** — browse by lesson (click a lesson chip instead of
  scrolling), or search across every word by kanji, reading, or English
  meaning (see "Word List search" below). Words you're struggling with
  (more wrong than right) are highlighted in red.
- **Flashcards** — quizzable word→meaning or meaning→word, with a mastery
  queue (wrong answers come back soon, right answers retire after two in a
  row) and a "practice weak words" mode that drills your worst-ratio words
  without affecting your tracked stats. Flipping a card speaks its reading
  aloud (your browser's built-in text-to-speech — no key, no setup).
- **Writing** — recall and draw a word's kanji from its reading/meaning on
  a touch-friendly canvas, then reveal to self-grade.
- **Furigana** — recall and type a word's reading from its kanji, auto-graded
  against the word's own reading (no self-honesty needed here)!

Each of the three practice modes (Flashcards/Writing/Furigana) cycles every
word in a lesson exactly twice per run; clear a lesson with zero mistakes
across both passes and its lesson chip turns green for that mode. Once a
lesson is green in all three modes, its chip gets a golden shine in the
Word List — the "you actually know this lesson" signal.

**Grammar** has three views:
- **Reference** — browse patterns by level, with lesson numbers, usage
  notes, and common mistakes.
- **Practice** — quiz yourself on a lesson's grammar (see "Grammar practice"
  below).
- **Conjugation** — a reference (all 9 conjugation-rule topics) plus three
  practice modes: **By form** (drill one form across 50 verbs), **By verb**
  (cycle one verb through all 8 forms in order), and **Sentences** (each
  form tested inside a real sentence).

Every shuffle control across the app is a persistent on/off toggle
(defaults on), not a one-shot button — flip it off if you'd rather study a
lesson in its original order.

Everything supports an **EN / 日本語 UI toggle** (top right) — translates
navigation and progress messages only, not your study content.

The **⚙ Settings** menu also has a theme picker: 5 color palettes (Slate &
Indigo, Pastel Sunshine, Warm Neutrals, Sumi Ink, Matcha & Cream), each with
its own light and dark variant, independent of the separate dark-mode toggle.

No build step. Plain HTML/CSS/JS.

## File structure — this matters

```
index.html
README.md
css/
  style.css
js/
  app.js
  sync.js                        (optional cloud sync — see below)
  firebase-config.js              (optional cloud sync — see below)
  data/
    vocab-data.js
    grammar-data.js
    grammar-practice-data.js
    conjugation-data.js
    conjugation-sentences-data.js
    i18n.js
```

`index.html` loads every other file by these exact relative paths. If any
file ends up somewhere else — e.g. dropped flat into the repo root instead
of inside `css/`/`js/`/`js/data/` — the browser can't find it, and the page
silently fails (blank styling, or tabs/features not working, with no
visible error unless you open the browser console).

**When you push to GitHub, upload the whole folder structure as-is** —
don't drag individual files into GitHub's web uploader one by one, since
that flattens folders. Either use `git push` from the command line
(recommended, see below), or drag the top-level folders (`css`, `js`) into
the GitHub web uploader so it preserves their nesting.

## Adding your own content

- **Vocab** — `js/data/vocab-data.js`. Each entry needs `word`, `reading`,
  `meaning`, `lesson`. Add lesson titles to `VOCAB_LESSONS` at the top.
- **Grammar reference** — `js/data/grammar-data.js`. Each entry needs
  `pattern`, `meaning`, `usage`, `lesson`, and an `examples` array of
  `{ jp, en }` pairs.
- **Grammar practice questions** — `js/data/grammar-practice-data.js`, keyed
  by level then lesson number (see "Grammar practice" below).
- **Conjugation reference** — `js/data/conjugation-data.js`
  (`CONJUGATION_TOPICS`) and the practice verb bank
  (`CONJUGATION_PRACTICE_VERBS`, hand-checked forms only — see the comment
  in that file before adding verbs).
- **Conjugation sentence practice** — `js/data/conjugation-sentences-data.js`,
  keyed by form id (`te`, `ta`, `potential`, `ba`, `volitional`, `passive`,
  `causative`, `causativePassive`). Each question is
  `{ type: "fill", jp, en, answer }` or
  `{ type: "choice", jp, en, options: [...], correct: <index> }`.
- **UI translations** — `js/data/i18n.js`. Only chrome text (buttons,
  labels), not study content.

## Deploying to GitHub Pages

1. Create a new repo on GitHub (public or private — see note below).
2. From inside this folder, push with the structure intact:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, branch `main`, folder `/ (root)`. Save.
4. Site is live in a minute or two at
   `https://<your-username>.github.io/<repo-name>/`.

### If something's not showing up

Open the live site, press F12 (or right-click → Inspect) → **Console** tab,
and reload. Any red 404 errors will tell you exactly which file the browser
couldn't find and at what path — that's almost always a folder-structure
mismatch between what's in the repo and what `index.html` expects.

### On privacy

GitHub Pages sites are publicly reachable by URL even if the repo itself is
private, unless you're on a paid GitHub plan (Pro/Team) that supports
restricting Pages access to your org. If you want this genuinely private for
free, the more reliable route is Cloudflare Pages + Cloudflare Zero Trust
Access (free for up to 50 users), which puts a login in front of the whole
site. Otherwise, an unlisted GitHub Pages URL is "private by obscurity" only.

## Study timeline

The Home tab turns the exam date into a day-by-day plan. It has two phases:

- **Learn** (from when you first open it until the learning deadline) —
  walks every vocab and grammar lesson once, at a pace you set.
- **Review** (deadline+1 until exam day) — no new material, just four
  recurring daily habits: clear due grammar reviews, drill weak words, one
  furigana round, one writing round.

Defaults are a 6 December exam, all lessons learned by 30 September, at 3
vocab + 2 grammar lessons a day. Change the dates in `PLAN_DEFAULTS` at the
top of the timeline section in `js/app.js`; change the pace right on the
page.

**Today's checklist** is a strict daily quota you can actually finish.
Lessons you ticked today stay on screen ticked, so the day closes out
instead of endlessly refilling. Once the quota is met, a dashed **Bonus**
row appears offering the next lesson — tick it and another appears, so
going faster is always one click away.

Lessons are served in queue order rather than by calendar slot. That's
deliberate: with a date-keyed plan, missing a few days strands you on
lessons you'd never open again. Here you always get the next chunk, and
how far behind you are is reported separately above the list. Tick items
off, or click one to jump straight into that lesson in Flashcards or
Grammar Practice.

**Doing extra pulls the finish date in.** Completions are stored with the
date they happened, so the plan knows how much of today's quota is already
spent. Do a fourth vocab lesson and tomorrow starts one lesson further
along, every later day shifts up, and the projected finish moves earlier —
a full extra day's worth buys exactly one day.

The forecast reports **both tracks separately** and names which one sets
the overall date. They rarely finish together: with the default pace,
grammar (76 lessons at 2/day) runs about ten days past vocab (79 at 3/day),
so extra grammar moves the headline date and extra vocab doesn't. Progress
past target only counts as "ahead" once *both* tracks have hit their quota,
for the same reason.

**recalculate pace** spreads everything still undone evenly across the days
that actually remain — the honest way to recover from a slipped week. Note
it can also slow you down if you're ahead, since it targets the deadline
exactly.

The lesson queues are read from the data files, so adding lessons to
`vocab-data.js` or `grammar-data.js` extends the plan automatically. All
plan state is per-browser `localStorage` and is not covered by cloud sync.

## Word List search

A single search box in the Word List filters by kanji, reading, or English
meaning — it auto-detects which one you typed:

- **Kanji** (any kanji character in your query) — matches if the word
  contains it anywhere, but ranks matches by how early the match falls in
  the word, so a kanji at the front of a word outranks the same kanji
  buried in the middle.
- **Kana** (hiragana/katakana) — plain substring match against the word's
  reading.
- **Anything else** — treated as an English meaning search, substring
  match, case-insensitive.

A non-empty search overrides the lesson-chip selection and shows one flat,
ranked result list across the selected level(s).

## Grammar practice

**Grammar → Practice** quizzes you on one lesson's grammar at a time. Pick
a level and one or more lesson chips, and you get that lesson's questions
as multiple choice or type-the-answer.

The questions deliberately target what a reference page can't teach you:

- **Which form attaches** — e.g. that 〜ところです takes the dictionary form
  for "about to," 〜ている for "in the middle of," and た for "just did."
- **What it actually means** in a given sentence.
- **Choosing between confusable patterns** — まで vs までに, ため vs ように,
  appearance そう vs hearsay そう, 〜たことがある vs 〜ことがある. Because
  `grammar-data.js` already groups related patterns into the same lesson,
  a lesson's questions can pit its own patterns against each other.
- **Spotting errors** — why a plausible-looking sentence is wrong.

Every question shows a written explanation after you answer, right or
wrong, and waits for you to press **Next** — this mode is for understanding
the rule, not for drilling speed.

Answer options are reshuffled every time a question appears, so the
position of the right answer is never a hint.

Same mastery rule as the vocab modes: each question cycles exactly twice
per run, and clearing a whole lesson with no mistakes turns its lesson chip
green. (Grammar lessons are numbered separately from vocab lessons, so this
green is tracked on its own and doesn't feed the Word List's golden shine.)

### Spaced repetition

**Review mode** (the 🗓 toggle, on by default) schedules each question
individually instead of showing you the whole lesson every time. A session
contains only what's due plus anything you've never seen, and the counter
under the toggle tells you how many of each are waiting.

The scheduler is SM-2-lite. Answer a question right and the gap before you
see it again grows — 1 day, then 3, then multiplied by that question's own
ease factor each time. Answer it wrong and it resets to "due immediately"
and its ease drops, so questions you keep missing come back faster than
ones you know cold. Only your **first** answer in a run counts toward
scheduling; the second pass through the deck is reinforcement and can't
inflate the interval.

Turn review mode off to drill a whole lesson regardless of schedule —
useful when you're cramming one specific lesson rather than doing a daily
review. **reset progress** clears both the schedule and the green marks.

### Adding more grammar practice questions

Edit `js/data/grammar-practice-data.js`, keyed by level then lesson number.
Each question is either

```js
{ type: "choice", tag: "〜までに", prompt: "Which fits the blank?",
  jp: "レポートは金曜日＿＿＿出してください。", en: "Please submit the report by Friday.",
  options: ["までに", "まで", "から", "ながら"], correct: 0, explain: "..." }
```

or

```js
{ type: "fill", tag: "〜ながら", prompt: "Type the missing word in hiragana.",
  jp: "母は音楽を聞き＿＿＿＿料理を作ります。", en: "My mother cooks while listening to music.",
  answers: ["ながら"], explain: "..." }
```

`jp` and `en` are optional — omit them for a pure concept question ("which
form attaches to X?"). `answers` lists every accepted spelling. `explain`
is required: it's the part you actually learn from.

Currently covered:

- **N4 lessons 1–15** — 120 questions written for this site, built around
  the patterns in `grammar-data.js`.
- **N3 lessons 1–8** — 78 questions taken from the 練習 exercises in
  *新完全マスター文法 日本語能力試験N3* (友松悦子・福島佐知・中村かおり,
  スリーエーネットワーク 2012), using the book's own answer key. The
  sentences and options are the book's; the explanations are written here,
  since the book supplies answers only. Questions from a 練習's combined
  (1課・2課) section are filed under whichever lesson's grammar the correct
  answer actually tests.

Lessons with no questions yet simply don't show a chip.

## Optional: sync progress across devices

By default, all progress (your vocab right/wrong stats — the same numbers
behind the Word List and weak-word highlighting) lives in your browser's
`localStorage`. That means it's **per-browser, per-device** — studying on
your phone and then opening the site on your laptop starts fresh.
Conjugation practice sessions are always local-only/per-session by design,
on every device, regardless of sync.

To sync your vocab progress across devices, this app can optionally use
[Firebase](https://firebase.google.com/) (a free Google service) — Cloud
Firestore as the database, Google sign-in for auth. **This is entirely
optional** — until you set it up, the sign-in button and all sync code stay
completely inactive and nothing about the app changes.

Sync is real-time in both directions once set up: every local change pushes
immediately, and a live connection stays open the whole time you're signed
in, so a change made on another device shows up here within about a
second — no reload or re-sign-in needed.

### Setup (~10 minutes, no credit card needed)

1. **Create a Firebase project.** Go to
   [console.firebase.google.com](https://console.firebase.google.com/),
   click **Add project**, give it any name, and finish the wizard (you can
   decline Google Analytics — not needed here).

2. **Register a web app.** On your new project's overview page, click the
   **`</>`** (web) icon to add a web app. Give it a nickname, skip Firebase
   Hosting (you're already using GitHub Pages). You'll be shown a
   `firebaseConfig` object at the end of the wizard — copy it now (you'll
   need it in step 6). If you miss it: **⚙️ (gear icon, top-left) → Project
   settings → General tab → "Your apps" → click your web app → select
   "Config"**.

3. **Enable Google sign-in.** In the left sidebar: **Build →
   Authentication → Get started**. Under **Sign-in method**, click
   **Google**, toggle it on, pick a support email (usually auto-filled),
   **Save**.

4. **Authorize this site's domain.** Still in Authentication, go to the
   **Settings** tab → **Authorized domains** → **Add domain**, and add
   `<your-username>.github.io` (e.g. `dallenjap123.github.io`). Skip this
   and sign-in will fail with `auth/unauthorized-domain`.

5. **Create a Firestore database.** In the left sidebar: **Build →
   Firestore Database → Create database**. Choose any nearby region and
   start in **production mode**.

6. **Set security rules.** Still in Firestore, go to the **Rules** tab,
   replace the contents with the following, and click **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
   This means each signed-in user can only ever read or write their own
   data — nobody else's.

7. **Paste your config into the app.** Open `js/firebase-config.js` and
   replace the placeholder object with the real `firebaseConfig` object
   from step 2 (all six fields: `apiKey`, `authDomain`, `projectId`,
   `storageBucket`, `messagingSenderId`, `appId`). Save, commit, push.

That's it — reload the site and a "sign in to sync progress" link appears
in the header. Click it, sign in with your Google account, and it'll sync
from then on, on every device you sign into with the same account. If you
never click it, the app works exactly as it always has, local-only — there's
no separate "guest mode" to opt into, not signing in already is that.

**On the API key being visible in your public repo:** this is normal and
expected for Firebase web apps — the config values aren't secrets, they
just say which Firebase project to talk to. Actual security comes from the
sign-in requirement plus the rules in step 6, not from hiding the key.

If you ever want to turn sync off again, just put the placeholder values
back in `js/firebase-config.js` (or delete the file and its `<script>` tag
in `index.html`) — the app falls back to local-only exactly as before.
