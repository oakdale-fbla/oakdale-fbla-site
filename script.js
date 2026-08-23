// Mobile nav toggle.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // Site-wide temporary banner, driven by banner.txt (see that file for
  // how to edit it). Shows nothing if TEXT is empty, or today is
  // outside the START/END dates.
  var bannerEl = document.querySelector(".site-banner");
  if (bannerEl) {
    fetch("banner.txt")
      .then(function (res) {
        return res.ok ? res.text() : "";
      })
      .then(function (raw) {
        var fields = {};
        raw.split("\n").forEach(function (line) {
          var match = line.match(/^([A-Z]+):\s*(.*)$/);
          if (match) fields[match[1]] = match[2].trim();
        });

        if (!fields.TEXT) return;

        var today = new Date();
        var todayStr =
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0");

        if (fields.START && todayStr < fields.START) return;
        if (fields.END && todayStr > fields.END) return;

        // Repeated 8x back-to-back so the strip is always full
        // edge-to-edge (even on wide screens) with no gaps, and the CSS
        // animation scrolls by exactly 1/8th of the total width per
        // loop so it repeats seamlessly forever.
        var COPIES = 8;
        var track = document.createElement("div");
        track.className = "site-banner-track";

        // If LINKTEXT names a piece of the message, only that piece
        // becomes clickable; the rest stays plain text. Otherwise (or if
        // that piece can't be found in TEXT), the whole message links.
        var linkStart = -1;
        if (fields.LINK && fields.LINKTEXT) {
          linkStart = fields.TEXT.indexOf(fields.LINKTEXT);
        }

        for (var i = 0; i < COPIES; i++) {
          var item = document.createElement("span");
          item.className = "site-banner-item";

          if (fields.LINK && linkStart !== -1) {
            var before = fields.TEXT.slice(0, linkStart);
            var after = fields.TEXT.slice(linkStart + fields.LINKTEXT.length);

            if (before) item.appendChild(document.createTextNode(before));

            var a = document.createElement("a");
            a.href = fields.LINK;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = fields.LINKTEXT;
            item.appendChild(a);

            if (after) item.appendChild(document.createTextNode(after));
          } else if (fields.LINK) {
            var a = document.createElement("a");
            a.href = fields.LINK;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = fields.TEXT;
            item.appendChild(a);
          } else {
            item.textContent = fields.TEXT;
          }

          track.appendChild(item);
        }

        bannerEl.appendChild(track);
        bannerEl.classList.add("visible");
      })
      .catch(function () {
        // banner.txt missing or unreadable (e.g. opened as a local
        // file instead of through a server) — just show nothing.
      });
  }

  // Officers page: officer teams live in the officers/ folder, one
  // plain-text file per year (see officers/README.txt), listed in
  // officers/years.txt with the most recent year first. This builds
  // the year dropdown and fills in the card grid from those files —
  // editing the .txt files is all that's needed to update officers or
  // add a new year, no HTML/JS changes required.
  var officerGrid = document.querySelector("#officer-grid");
  var officerYearSelect = document.querySelector("#officer-year-select");

  if (officerGrid && officerYearSelect) {
    function initialsFor(name) {
      var parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function loadOfficerYear(year) {
      fetch("officers/" + year + ".txt")
        .then(function (res) {
          return res.ok ? res.text() : "";
        })
        .then(function (raw) {
          officerGrid.innerHTML = "";

          raw.split("\n").forEach(function (line) {
            var parts = line.split("|");
            if (parts.length < 2) return;

            var name = parts[0].trim();
            var position = parts[1].trim();
            if (!name || !position) return;

            var card = document.createElement("div");
            card.className = "card officer-card";

            var photo = document.createElement("div");
            photo.className = "officer-photo";
            photo.textContent = initialsFor(name);

            var heading = document.createElement("h3");
            heading.textContent = name;

            var positionEl = document.createElement("div");
            positionEl.className = "officer-position";
            positionEl.textContent = position;

            card.appendChild(photo);
            card.appendChild(heading);
            card.appendChild(positionEl);
            officerGrid.appendChild(card);
          });
        })
        .catch(function () {
          // Missing/unreadable year file — leave the grid empty
          // rather than showing a broken page.
        });
    }

    fetch("officers/years.txt")
      .then(function (res) {
        return res.ok ? res.text() : "";
      })
      .then(function (raw) {
        var years = raw
          .split("\n")
          .map(function (line) {
            return line.trim();
          })
          .filter(Boolean);

        years.forEach(function (year) {
          var option = document.createElement("option");
          option.value = year;
          option.textContent = year;
          officerYearSelect.appendChild(option);
        });

        if (years.length) {
          officerYearSelect.value = years[0];
          loadOfficerYear(years[0]);
        }
      })
      .catch(function () {
        // officers/years.txt missing or unreadable — leave the
        // dropdown and grid empty rather than showing a broken page.
      });

    officerYearSelect.addEventListener("change", function () {
      loadOfficerYear(officerYearSelect.value);
    });
  }

  // Fade + slide each section into view as the user scrolls.
  // CSS handles turning this off for prefers-reduced-motion (see .reveal
  // in styles.css), so this always runs the same way here.
  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (target) {
      observer.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add("revealed");
    });
  }

  // Gallery masonry: pack each photo into whichever column is
  // currently shortest, in reading order (left-to-right through the
  // photos, top-to-bottom down the page) — a plain CSS grid can't do
  // this without leaving gaps, and CSS multi-column fills an entire
  // column before moving to the next one instead of reading order.
  var grid = document.querySelector(".gallery-grid");
  if (grid) {
    var items = Array.prototype.slice.call(grid.children);
    var images = items
      .map(function (item) {
        return item.querySelector("img");
      })
      .filter(Boolean);

    var layoutTimer;

    function columnCountForWidth() {
      var w = window.innerWidth;
      if (w <= 720) return 1;
      if (w <= 860) return 2;
      if (w <= 1300) return 3;
      return 4;
    }

    function layoutMasonry() {
      var columns = columnCountForWidth();
      var gap = 22;
      var gridWidth = grid.clientWidth;
      var colWidth = (gridWidth - gap * (columns - 1)) / columns;
      var colHeights = new Array(columns).fill(0);

      items.forEach(function (item) {
        var shortest = 0;
        for (var i = 1; i < columns; i++) {
          if (colHeights[i] < colHeights[shortest]) shortest = i;
        }
        var x = shortest * (colWidth + gap);
        var y = colHeights[shortest];

        item.style.position = "absolute";
        item.style.width = colWidth + "px";
        item.style.transform = "translate(" + x + "px, " + y + "px)";

        colHeights[shortest] = y + item.offsetHeight + gap;
      });

      grid.style.height = Math.max.apply(null, colHeights) - gap + "px";
    }

    var loadPromises = images.map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve);
      });
    });

    Promise.all(loadPromises).then(layoutMasonry);

    window.addEventListener("resize", function () {
      clearTimeout(layoutTimer);
      layoutTimer = setTimeout(layoutMasonry, 150);
    });
  }
});
