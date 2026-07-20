// modules/blogFilter.js
// Client-side search (title/keyword/category/slug) + category chip filter for
// the blog listing grid. No extra library needed — the blog list is small
// enough (tens of posts) that a plain array filter over the rendered cards
// is simpler and faster than building a second MiniSearch index just for this.
(function () {
  function init() {
    var searchBox = document.getElementById("blogSearchBox");
    var grid = document.getElementById("blogGrid");
    var noResults = document.getElementById("blogNoResults");
    var filterButtons = document.querySelectorAll("#blogCategoryFilters button");
    if (!grid) return;

    var cards = grid.querySelectorAll(".blog-card");
    var activeCategory = "all";

    function applyFilters() {
      var query = (searchBox.value || "").trim().toLowerCase();
      var visibleCount = 0;

      cards.forEach(function (card) {
        var matchesCategory = activeCategory === "all" || card.dataset.cat === activeCategory;
        var haystack = card.dataset.title + " " + card.dataset.keywords + " " + card.dataset.cat + " " + card.dataset.slug;
        var matchesQuery = !query || haystack.indexOf(query) !== -1;
        var show = matchesCategory && matchesQuery;
        card.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });

      if (noResults) noResults.style.display = visibleCount === 0 ? "block" : "none";
    }

    if (searchBox) searchBox.addEventListener("input", applyFilters);

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.dataset.cat;
        filterButtons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.classList.toggle("btn-dark", b === btn);
          b.classList.toggle("btn-outline-dark", b !== btn);
        });
        applyFilters();
      });
    });

    // sidebar "Categories" badges: clicking one just clicks the matching
    // top-row filter button, so filtering/active-state stays in one place
    document.querySelectorAll(".sidebar-cat-btn").forEach(function (badge) {
      badge.addEventListener("click", function () {
        var match = Array.from(filterButtons).find(function (b) { return b.dataset.cat === badge.dataset.cat; });
        if (match) match.click();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // supports /blog/?category=Food deep links (e.g. from a blog post's breadcrumb)
    var params = new URLSearchParams(location.search);
    var initialCategory = params.get("category");
    if (initialCategory) {
      var match = Array.from(filterButtons).find(function (b) { return b.dataset.cat === initialCategory; });
      if (match) match.click();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
