// js/search.js
// Single reusable search implementation. Any element with [data-search-widget]
// becomes a working search box: navbar (desktop), navbar (mobile offcanvas), and
// the full /search/ page all use this same code, just with different optional
// pieces present (results/recent/skeleton) or a data-search-navigate flag.
(function () {
  var RECENT_KEY = "kanchi360-recent-searches";
  var MAX_RECENT = 6;

  function getRecent() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveRecent(term) {
    term = (term || "").trim();
    if (!term) return;
    var list = getRecent().filter(function (t) { return t.toLowerCase() !== term.toLowerCase(); });
    list.unshift(term);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  }

  // index fetched & built ONCE, shared by every widget on the page (navbar + page)
  var miniSearchReady = fetch("/data/search.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var mini = new MiniSearch({
        idField: "id",
        fields: ["name", "category", "subcategory", "area", "keywords", "tags"],
        storeFields: ["id", "slug", "name", "category", "subcategory", "area", "rating", "premium", "verified"],
        searchOptions: { boost: { name: 2 }, prefix: true, fuzzy: 0.2 },
      });
      mini.addAll(data);
      return mini;
    });

  function createWidget(root) {
    var box = root.querySelector("[data-search-box]");
    if (!box) return;
    var suggestBox = root.querySelector("[data-search-suggestions]");
    var resultsBox = root.querySelector("[data-search-results]");
    var recentBox = root.querySelector("[data-search-recent]");
    var skeleton = root.querySelector("[data-search-skeleton]");
    var navigate = root.hasAttribute("data-search-navigate");
    var miniSearch = null;

    function hideSuggestions() {
      if (suggestBox) { suggestBox.innerHTML = ""; suggestBox.style.display = "none"; }
    }

    function showSuggestions(query) {
      if (!suggestBox || !miniSearch || query.length < 2) { hideSuggestions(); return; }
      var suggestions = miniSearch.autoSuggest(query).slice(0, 6);
      if (!suggestions.length) { hideSuggestions(); return; }
      suggestBox.innerHTML = suggestions.map(function (s) {
        return '<button type="button" class="list-group-item list-group-item-action suggestion-item">' +
          '<i class="bi bi-search me-2 text-muted"></i>' + s.suggestion + "</button>";
      }).join("");
      suggestBox.style.display = "block";

      suggestBox.querySelectorAll(".suggestion-item").forEach(function (item) {
        item.addEventListener("click", function () {
          var term = item.textContent.trim();
          box.value = term;
          hideSuggestions();
          if (navigate) {
            window.location.href = "/search/?q=" + encodeURIComponent(term);
          } else {
            saveRecent(term);
            renderRecent();
            runSearch(term);
          }
        });
      });
    }

    function renderRecent() {
      if (!recentBox) return;
      var list = getRecent();
      if (!list.length) { recentBox.innerHTML = ""; return; }
      recentBox.innerHTML =
        '<div class="small text-muted mb-1">Recent searches</div>' +
        list.map(function (term) {
          return '<button type="button" class="btn btn-sm btn-outline-secondary me-2 mb-2 recent-chip">' + term + "</button>";
        }).join("");

      recentBox.querySelectorAll(".recent-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          box.value = chip.textContent;
          runSearch(chip.textContent);
          hideSuggestions();
        });
      });
    }

    function runSearch(query) {
      if (!resultsBox) return;
      if (!miniSearch || query.length < 2) { resultsBox.innerHTML = ""; return; }
      render(miniSearch.search(query).slice(0, 30));
    }

    function render(hits) {
      if (!hits.length) { resultsBox.innerHTML = '<p class="text-muted">No results.</p>'; return; }
      resultsBox.innerHTML = hits.map(function (hit) {
        var badge = hit.premium ? '<span class="badge bg-warning text-dark">Premium</span>' : "";
        return (
          '<div class="col-md-4">' +
          '<div class="card shadow-sm border-0 h-100"><div class="card-body">' + badge +
          "<h5>" + hit.name + "</h5>" +
          '<p class="text-muted small">' + hit.category + " &middot; " + hit.area + "</p>" +
          '<p>⭐ ' + hit.rating + "</p>" +
          '<a class="btn btn-sm btn-outline-primary" href="/business/' + hit.slug + '/">View</a>' +
          "</div></div></div>"
        );
      }).join("");
    }

    renderRecent();

    miniSearchReady.then(function (mini) {
      miniSearch = mini;
      if (skeleton) skeleton.style.display = "none";

      // ?q= support so both /search/?q=x (page) and a navbar submit landing on
      // /search/?q=x are picked up by the exact same code path
      var initialQuery = new URLSearchParams(location.search).get("q") || "";
      if (initialQuery && !navigate) {
        box.value = initialQuery;
        saveRecent(initialQuery);
        renderRecent();
        runSearch(initialQuery);
      }
    }).catch(function (err) {
      if (skeleton) skeleton.style.display = "none";
      if (resultsBox) resultsBox.innerHTML = '<p class="text-danger">Could not load search data.</p>';
      console.error(err);
    });

    box.addEventListener("input", function () {
      var q = box.value.trim();
      if (!navigate) runSearch(q);
      showSuggestions(q);
    });

    box.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      if (navigate) return; // let the <form action="/search/"> submit natively
      saveRecent(box.value);
      renderRecent();
      hideSuggestions();
    });

    box.addEventListener("blur", function () {
      setTimeout(hideSuggestions, 150); // let a suggestion click register first
    });

    document.addEventListener("click", function (e) {
      if (suggestBox && !suggestBox.contains(e.target) && e.target !== box) hideSuggestions();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-search-widget]").forEach(createWidget);
  });
})();
