# 日本語ノート — Japanese Study Site

A static site with five tools:

- **Flashcards** — vocab, filterable by JLPT level and lesson (multi-select),
  quizzable word→meaning or meaning→word, with a mastery queue (wrong
  answers come back soon, right answers retire after two in a row) and a
  "practice weak words" mode that drills your worst-ratio words without
  affecting your tracked stats.
- **Grammar** — a Reference view (browse patterns by level, with lesson
  numbers and usage notes) and a Practice view (fill-in-the-blank +
  multiple-choice questions, filterable by lesson).
- **Word List** — every word grouped by lesson, with words you're
  struggling with (more wrong than right) highlighted in red.
- **Conjugation** — a Reference view (all 9 conjugation-rule topics) and
  three Practice modes: **By form** (drill one form across 50 verbs),
  **By verb** (cycle one verb through all 8 forms in order), and
  **Sentences** (each form tested inside a real sentence).
- **Exam** — Gemini-generated mock tests, scoped to whichever level/lessons
  (or, for Conjugation, forms) you select. See "Exam tab (Gemini mock
  tests)" below for how it works and how to set up your API key.

The **Home** dashboard tracks *mastered* words per lesson (words you've
gotten right twice in a row, most recently) — not just words you've
attempted — so the progress bars reflect what you actually know, not what
you've merely touched.

Everything supports an **EN / 日本語 UI toggle** (top right) — translates
navigation and progress messages only, not your study content.

No build step. Plain HTML/CSS/JS.

## File structure — this matters

```
index.html
README.md
css/
  style.css
js/
  app.js
  exam.js                         (Gemini mock-test tab — see below)
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
- **Grammar practice questions** — `js/data/grammar-practice-data.js`,
  keyed by the *exact* pattern string used in `grammar-data.js`. Each
  question is `{ type: "fill", jp, en, answer }` or
  `{ type: "choice", jp, en, options: [...], correct: <index> }`.
- **Conjugation reference** — `js/data/conjugation-data.js`
  (`CONJUGATION_TOPICS`) and the practice verb bank
  (`CONJUGATION_PRACTICE_VERBS`, hand-checked forms only — see the comment
  in that file before adding verbs).
- **Conjugation sentence practice** — `js/data/conjugation-sentences-data.js`,
  keyed by form id (`te`, `ta`, `potential`, `ba`, `volitional`, `passive`,
  `causative`, `causativePassive`), same question shape as grammar practice.
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

## Exam tab (Gemini mock tests)

The Exam tab generates a mock test on demand from Google's Gemini API, using
your own real vocab/grammar/conjugation data as the source content — so the
test content matches whatever's in your `js/data/*.js` files.

**How each exam type works:**

- **Vocab** — pick a level and lesson(s), then generate a two-phase exam:
  - *Phase 1* — multiple-choice, testing word/meaning recognition. Wrong
    options are real words from your own vocab bank, chosen because they
    look/sound similar to the target word or have an easily-confused
    meaning (JLPT-style distractors) — Gemini only picks *which* real words
    are confusable, it never invents a meaning. Needs **95%** to pass.
  - *Phase 2* — open-ended: type the furigana (hiragana reading) for every
    word in your selection, one at a time. Needs **100%** — a single
    mistake fails the phase immediately and it restarts from the top
    (reshuffled, no new Gemini call needed since this phase is just your
    own verified reading data).
  - Failing phase 1 regenerates a fresh set of questions via Gemini and
    restarts that phase.
- **Grammar** — pick a level and lesson(s); Gemini writes new fill-in-the-
  blank and multiple-choice questions grounded in that pattern's real
  meaning/usage/examples from `grammar-data.js`. Single phase, needs **80%**
  to pass; failing regenerates a fresh set.
- **Conjugation** — pick which forms to include (defaults to all); Gemini
  wraps your hand-checked, verified conjugated forms
  (`CONJUGATION_PRACTICE_VERBS`) into new example sentences and multiple-
  choice distractors. The correct answer is always your own verified data,
  never something Gemini generated — if Gemini's own options don't contain
  the verified form character-for-character, the app silently replaces them
  with safe distractors built from your own data instead. Single phase,
  needs **80%** to pass; failing regenerates a fresh set.

All three reuse the same self/auto-grading conventions as the rest of the
app: multiple-choice is graded automatically, fill-in-the-blank is graded on
your own honesty (reveal → "✓ knew it" / "✗ didn't know"), same as Grammar
Practice.

### Setting up your Gemini API key

1. Get a free key from **[Google AI Studio](https://aistudio.google.com/app/apikey)**
   (Google account required, no credit card).
2. On the Exam tab, click **⚙ set Gemini API key**, paste it in, and Save.

That key is saved **only in this browser's `localStorage`** — it is never
committed to the repo, never written to any file, and never included in the
optional cloud-sync snapshot described below (so signing in to sync on a
different device does NOT bring your key with it — you'd set it again
there). It's sent directly from your browser to Google's Gemini API only.
Click **clear saved key** any time to remove it.

**On cost:** Gemini's API has a free tier; generating one exam is a single
request. If you hit a quota/rate-limit error, wait a bit and try again, or
check your usage at [Google AI Studio](https://aistudio.google.com/).

## Optional: sync progress across devices

By default, all progress (your vocab right/wrong stats — the same numbers
behind the Word List and weak-word highlighting) lives in your browser's
`localStorage`. That means it's **per-browser, per-device** — studying on
your phone and then opening the site on your laptop starts fresh. Grammar
and conjugation practice sessions are always local-only/per-session by
design, on every device, regardless of sync.

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
