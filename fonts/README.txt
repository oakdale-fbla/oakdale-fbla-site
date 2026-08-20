HOW TO ACTIVATE REAL APERCU PRO (OPTIONAL)
============================================

FBLA's Brand Guidebook (page 29) specifies Apercu Pro as its primary
typeface for headings/titles. The problem: Apercu Pro is a paid,
commercial font — it isn't on Google Fonts or any other free service,
so this site can't legally bundle a copy for you.

Because of that, headings and titles across the site currently use
Plus Jakarta Sans (loaded for real from Google Fonts) as the closest
free look-alike, with Arial as a last-resort backup. Body and
paragraph text uses Inter, also loaded for real from Google Fonts.

IF your chapter or school ever gets a licensed copy of Apercu Pro
(for example, through FBLA national, or a purchased webfont license),
here's how to turn it on — no other code changes needed:

1. You'll need the font converted to WOFF2 (and ideally WOFF) files.
   Most font licenses include these, or you can convert a licensed
   .otf/.ttf file yourself at a tool like cloudconvert.com/ttf-to-woff2
   (only do this with a font you're licensed to use).

2. Save exactly these four files into this "fonts" folder:
     ApercuPro-Regular.woff2   (regular weight)
     ApercuPro-Medium.woff2    (medium weight)
     ApercuPro-Bold.woff2      (bold weight)
     ApercuPro-Italic.woff2    (italic)
   (WOFF versions are optional but recommended as a backup format —
   if you have them, save them alongside with matching names ending
   in .woff instead of .woff2.)

3. Refresh the site. The @font-face rules at the top of styles.css
   already point to these exact filenames, so the real Apercu Pro will
   load automatically and take over from Plus Jakarta Sans everywhere
   headings/titles appear — nothing else to edit.

Until then, nothing is broken — headings just quietly use Plus Jakarta
Sans instead.
