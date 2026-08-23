# oakdale-fbla-site

Static website for Oakdale High School's FBLA chapter. Plain HTML/CSS/JS,
no build step — open with a local server (`python3 -m http.server 8000`)
or just push to `main` to publish via GitHub Pages.

## Where things live

- **`index.html`, `about.html`, `officers.html`, `resources.html`,
  `contact.html`, `gallery.html`** — the site's pages.
- **`assets/`** — code and binary files: `css/`, `js/`, `images/`,
  `fonts/`. Not meant to be hand-edited unless you're changing how the
  site looks or behaves.
- **`content/`** — plain text files anyone can safely edit without
  touching code: `banner.txt` (the scrolling site-wide announcement)
  and `officers/` (the officer roster, one file per year). Each has
  its own README explaining the exact format.
- **`docs/`** — reference material (the FBLA Brand Guidebook, the
  original site requirements doc) — not part of the live site.
