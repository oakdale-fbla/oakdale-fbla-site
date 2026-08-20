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
     images/fbla-logo.png

2. Footer (navy background) → use the ALL-WHITE / reversed logo
   (per the guidebook, this is the version meant for navy backgrounds).
   Save it as:
     images/fbla-logo-white.png

Steps:
1. Go to fbla.org/brandcenter (linked at the end of the Brand Guidebook PDF)
   and download both versions above.
2. Save them into this "images" folder with the exact filenames listed
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
Officer headshots go in this folder too. The site currently shows navy
circles with initials instead of real photos so nothing looks broken.
To swap one in:
1. Add the image file here (e.g. images/officer-joshitha.jpg).
2. Replace a placeholder element like:
     <div class="officer-photo">JS</div>
   with:
     <img class="officer-photo" src="images/officer-joshitha.jpg" alt="Joshitha Sriperambudur">
   You may want to add "object-fit: cover;" in styles.css under
   .officer-photo if the photo looks stretched.

EVENT / GALLERY PHOTOS
=======================
This is a static site with no database, so there's no "upload" button —
adding a photo means putting the file in this folder and pointing to it
in gallery.html, the same pattern as above.

The home page photo lives at images/home-hero.jpg. The gallery photos
live in images/gallery/, named gallery-01.jpg through gallery-32.jpg —
the untouched originals (before renaming/converting) are kept in
images/gallery/originals/ as a backup, just in case.

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
1. Save it into images/gallery/ (any filename works, doesn't need to
   match the gallery-NN.jpg pattern).
2. In gallery.html, copy one whole ".gallery-item" block, e.g.:
     <div class="gallery-item">
       <img src="images/gallery/gallery-01.jpg" alt="Oakdale FBLA chapter photo">
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
