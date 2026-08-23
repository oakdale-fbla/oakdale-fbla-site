HOW TO EDIT THE OFFICERS PAGE (NO CODE NEEDED)
================================================

This folder is what fills in the officer cards on officers.html —
same idea as content/banner.txt for the site banner. Edit these plain
text files and the website updates automatically. No HTML/CSS/JS
editing required.


TO EDIT THE CURRENT OFFICER TEAM
---------------------------------
Open the file named for the current school year — right now that's
"2026-2027.txt" — and edit it. Each line is one officer, in this
exact format:

    Full Name | Position

Example:

    Joshitha Sriperambudur | President
    Anika Gaur | Vice President

- One officer per line.
- Keep the " | " (space, pipe, space) between the name and position —
  that's what the website uses to tell them apart.
- The order you list them is the order they appear on the site.
- The little circle "initials" badge on each card (like "JS") is
  generated automatically from the name — first letter of the first
  name + first letter of the last name. You don't need to type those.


ADDING A REAL PHOTO (OPTIONAL)
--------------------------------
By default every officer just shows the initials circle above — no
photo needed. To use a real photo instead, add a THIRD " | " field
with the photo's filename:

    Full Name | Position | photo-filename.jpg

Example:

    Joshitha Sriperambudur | President | joshitha.jpg

Steps:
1. Save the photo file into assets/images/officers/ (see that
   folder's own README.txt for photo prep — HEIC conversion, stripping
   location/device metadata, etc. — same steps as gallery photos).
2. Add the filename as a third field on that officer's line, exactly
   matching what you saved it as.
3. Refresh the page — no other changes needed.

If you leave the third field off, mistype the filename, or the file
just isn't there, that officer's card automatically falls back to
showing the initials circle instead — nothing breaks either way.


TO START A NEW YEAR'S OFFICER TEAM
------------------------------------
When a new officer team takes over (e.g. for 2027-2028):

1. Make a copy of the current year's file and rename it to match the
   new year, for example "2027-2028.txt". Fill it in with the new
   officers using the same "Name | Position" format above.

2. Open "years.txt" in this folder and add the new year as a NEW
   FIRST LINE (most recent year always goes on top). For example, if
   years.txt currently says:

       2026-2027

   change it to:

       2027-2028
       2026-2027

That's it — the Officers page will automatically show a "Officer
Team" dropdown listing every year in years.txt, defaulting to
whichever year is listed first (the most recent), and past teams
stay browsable through the dropdown instead of being deleted.


NOTE ON THE ADVISOR
---------------------
The Chapter Advisor card (Brian Ranallo) is NOT part of this system —
it's written directly into officers.html since advisors change far
less often than student officers. If the advisor ever changes, that
card needs a direct HTML edit (or just ask for help making that
change).
