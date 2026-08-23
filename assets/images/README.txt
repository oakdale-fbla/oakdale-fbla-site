HOW TO ADD THE OFFICIAL FBLA LOGO
==================================

Why it's not already here:
FBLA's Brand Guidebook says the logo (the navy/gold triangle "delta" mark
plus the FBLA wordmark) can never be redrawn, recolored, or altered, and
it must come from FBLA's own official files — not traced from a picture.
So instead of faking it, the site is wired up to automatically display the
real logo the moment you add it here. Until then, you'll see a small dashed
"FBLA LOGO" placeholder box in the nav bar and footer — nothing is broken,
it's just waiting for the real file.

The site needs TWO versions, because the nav bar background is white and
the footer background is navy, and the guidebook (page 20-21) specifies a
different logo variant for each:

1. Nav bar (white background) → use the standard FULL-COLOR logo.
   Save it as:
     assets/images/fbla-logo.png

2. Footer (navy background) → use the ALL-WHITE / reversed logo
   (per the guidebook, this is the version meant for navy backgrounds).
   Save it as:
     assets/images/fbla-logo-white.png

Steps:
1. Go to fbla.org/brandcenter (linked at the end of the Brand Guidebook PDF)
   and download both versions above.
2. Save them into this "assets/images" folder with the exact filenames listed
   above. PNG or SVG both work — if you use SVG, rename the file
   references in the HTML files (search for "fbla-logo.png" and
   "fbla-logo-white.png") to match.
3. Refresh the page in your browser. The placeholder boxes will
   automatically be replaced by the real logo — no other changes needed.

Sizing note: per the guidebook, always keep clear space around the logo
equal to about 1/6 of its width, and don't stretch or distort it. The
site's CSS already sizes it to a fixed height and preserves its
proportions, so you just need to drop in a reasonably high-resolution file.

OFFICER PHOTOS
==============
Officer headshots go in assets/images/officers/ (create that folder if
it doesn't exist yet). By default every officer just shows a navy
initials circle instead of a photo, so nothing looks broken without one.

Unlike the logo above, you don't edit any HTML to add one — officer
cards are generated automatically from the text files in
content/officers/, not written by hand. To add a photo:
1. Prep the photo file the same way as gallery photos — see
   "IMPORTANT — iPhone photos..." below (HEIC conversion, stripping
   location/device metadata).
2. Save it into assets/images/officers/.
3. Open that officer's line in content/officers/2026-2027.txt (or
   whichever year) and add the filename as a third field:
     Joshitha Sriperambudur | President | joshitha.jpg
   See content/officers/README.txt for the full format.
4. Refresh the page — no other changes needed. A missing or mistyped
   filename just falls back to the initials circle instead of breaking.

EVENT / GALLERY PHOTOS
=======================
This is a static site with no database, so there's no "upload" button —
adding a photo means putting the file in this folder and pointing to it
in gallery.html, the same pattern as above.

The home page photo lives at assets/images/home-hero.jpg. The gallery photos
live in assets/images/gallery/, named gallery-01.jpg through gallery-27.jpg —
the untouched originals (before renaming/converting) are kept in
assets/images/gallery/originals/ as a backup, just in case.

IMPORTANT — iPhone photos are often .HEIC files, which most browsers
(anything besides Safari) can't display. Before adding a new one:
1. On a Mac, convert it first — open Terminal and run:
     sips -s format jpeg your-photo.HEIC --out your-photo.jpg
   (or just open it in Preview and use File > Export, choosing JPEG).
2. It's also worth stripping location/device metadata before a photo
   goes on a public site, especially for photos of students. The
   easiest way: open the photo in Preview, then File > Export, and in
   the export dialog make sure "Alpha" and metadata options are left
   at their plain defaults — or ask whoever's helping with the site
   to run it through an EXIF-stripping tool. (This project's existing
   photos already had this done.)

To add a new gallery photo once it's a .jpg:
1. Save it into assets/images/gallery/ (any filename works, doesn't need to
   match the gallery-NN.jpg pattern).
2. In gallery.html, copy one whole ".gallery-item" block, e.g.:
     <div class="gallery-item">
       <img src="assets/images/gallery/gallery-01.jpg" alt="Oakdale FBLA chapter photo">
       <span class="gallery-tag">[Event]</span>
     </div>
   paste it before the </div> that closes ".gallery-grid", and point
   the src at your new file. Update the alt text and the tag text too
   (keep the tag short, e.g. "RLC 25" — it's a small label overlaid on
   the photo's corner, not a full caption).
3. To replace an existing photo instead of adding one, just swap the
   src on an existing <img> tag and update its tag.
4. Since the gallery is laid out by script.js (packing photos into
   columns so there are no gaps), new photos will just slot in
   automatically — no layout code to touch.
