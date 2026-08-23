# Oakdale High School FBLA — chapter website

Static site, plain HTML/CSS/JS, no build step, no framework, no
dependencies. Six pages: `index.html`, `about.html`, `officers.html`,
`resources.html`, `contact.html`, `gallery.html`.

Built for a non-technical, beginner maintainer — favor plain, readable
code over clever abstractions, and keep the plain-text `content/`
files easy to hand-edit.

## Structure

- `assets/css/styles.css`, `assets/js/script.js` — all styling/behavior.
- `assets/images/`, `assets/fonts/` — binary assets. Each has its own
  `README.txt` with beginner instructions for adding real files (logo,
  officer photos, gallery photos, a licensed Apercu Pro webfont).
- `content/banner.txt` — drives the scrolling site-wide announcement
  banner. Plain `LABEL: value` lines (`TEXT`, `LINK`, `LINKTEXT`,
  `START`, `END`), parsed client-side in `script.js`. Only shows
  between `START`/`END` dates (inclusive). Requires serving over
  `http://` — silently does nothing if the page is opened as a raw
  `file://`.
- `content/officers/` — drives the officer roster + past-team dropdown
  on `officers.html`. One `Name | Position` file per year, listed in
  `content/officers/years.txt` (most recent year first). See
  `content/officers/README.txt`.
- `docs/` — reference material only (FBLA Brand Guidebook PDF,
  original site requirements doc), not part of the live site.

## Local preview

No build step — just serve the directory:

```
python3 -m http.server 8000
```

## Deploying

GitHub Pages, deployed straight from the `main` branch root — pushing
to `main` is publishing. There's no staging/review step:

```
git add -A
git commit -m "..."
git push origin main
```

Live at `https://oakdale-fbla.github.io/oakdale-fbla-site/`. Repo is
under the `oakdale-fbla` GitHub org; commits should use the chapter's
git identity (`Oakdale FBLA <fblaoakdale@gmail.com>`, already set as
this repo's local `user.name`/`user.email`), not a personal account.

## Hard constraints — do not violate

- **Never apply a visual effect (glow, shadow, filter) directly to the
  FBLA logo image.** Effects are only ever applied to adjacent text.
- **Never use the bare FBLA "delta" triangle alone** — it violates
  FBLA's brand guidelines. The full Emblem (shield graphic) is the
  guidebook-sanctioned variant for icon/favicon use.
- **Exact brand hex colors, don't approximate:** `--navy: #0a2e7f`,
  `--blue: #1d52bc`, `--gold: #f4ab19`, `--cobalt: #226add`.
- **Never fabricate chapter facts** (officer names, dates, addresses,
  links) — verify against what the user provides rather than guessing
  plausible-sounding values.
- **Two separate emails, don't mix them up:** `fblaoakdale@gmail.com`
  is the chapter's general-purpose address (joining, general contact).
  `brian.ranallo@fcps.org` is the advisor's personal address, used only
  for advisor-identification, not general contact.
- Officer photos are still placeholder initials — real photos are a
  known, deliberately deferred task, not a bug.

## Conventions

- `assets/` = code, don't expect a beginner to hand-edit it.
  `content/` = plain text, meant to be hand-edited freely — keep that
  boundary clean when adding new editable data (put it in `content/`,
  document its format in a sibling `README.txt`, same pattern as
  `banner.txt`/`officers/`).
- Repeated CSS values (the dot-grid texture, the gold heading glow)
  are defined once as custom properties in `:root`
  (`--dot-grid`, `--gold-glow`) — reuse those rather than re-typing the
  raw value, since they've historically needed synchronized tuning.
- JS is deliberately ES5-style (`var`, `function`, no arrow
  functions/template literals) for consistency with the rest of the
  file — match that style rather than mixing in modern syntax.
