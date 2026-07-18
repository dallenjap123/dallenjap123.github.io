# 日本語ノート — Japanese Study Site

A small static site with two tools:

- **Flashcards** — kanji/vocab, filterable by JLPT level (N5–N1), quizzable in
  either direction (word → meaning, or meaning → word), with shuffle.
- **Grammar** — a per-level list of grammar patterns; click one to see its
  meaning, usage explanation, and example sentences.

No build step, no dependencies. It's plain HTML/CSS/JS, so editing the data
is just editing a JS file and refreshing the page.

## Adding your own content!

**Vocab/kanji** — edit `js/data/vocab-data.js`. Each entry:

```js
{ word: "食べる", reading: "たべる", meaning: "to eat" }
```

Add it to the array under the right level (`N5` … `N1`).

**Grammar** — edit `js/data/grammar-data.js`. Each entry:

```js
{
  pattern: "〜なら",
  meaning: "if ~ / in the case of ~",
  usage: "Explain when/how it's used, in your own words.",
  examples: [{ jp: "行くなら、一緒に行こう。", en: "If you're going, let's go together." }],
}
```

`examples` can have more than one, or be left as an empty array `[]`.

## Deploying to GitHub Pages

1. Create a new repo on GitHub (public or private — see note below).
2. Push this folder's contents to it:
   ```bash
   cd jp-study
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, branch `main`, folder `/ (root)`. Save.
4. Your site will be live in a minute or two at
   `https://<your-username>.github.io/<repo-name>/`.

### On privacy

GitHub Pages sites are publicly reachable by URL even if the repo itself is
private, unless you're on a paid GitHub plan (Pro/Team) that supports
restricting Pages access to your org. If you want this genuinely private for
free, the more reliable route is Cloudflare Pages + Cloudflare Zero Trust
Access (free for up to 50 users), which puts a login in front of the whole
site. Otherwise, an unlisted GitHub Pages URL is "private by obscurity" only.
