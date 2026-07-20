// modules/wishlist.js
// Original behaviour: double-click any card -> "added to wishlist" toast, saved to
// localStorage. Kept as-is (no backend exists yet) but given a clean API so swapping
// in a real API later only means changing Kanchi360.wishlist.save().
window.Kanchi360 = window.Kanchi360 || {};

Kanchi360.wishlist = {
  _key: "kanchi360-wishlist",

  getAll: function () {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || [];
    } catch (e) {
      return [];
    }
  },

  save: function (item) {
    var list = this.getAll();
    list.push(item);
    localStorage.setItem(this._key, JSON.stringify(list));
    // Future backend: replace the line above with a fetch() POST to your API.
  },

  showPanel: function () {
    var list = this.getAll();
    var rows = list.length
      ? list.map(function (item) {
          return '<li class="list-group-item">' + item.title + "</li>";
        }).join("")
      : '<li class="list-group-item text-muted">No favorites yet — double-click any card to save it.</li>';

    var panel = document.createElement("div");
    panel.innerHTML =
      '<div class="modal fade show" style="display:block;background:rgba(0,0,0,.6)">' +
      '<div class="modal-dialog"><div class="modal-content">' +
      '<div class="modal-header"><h5>Your Favorites (demo)</h5>' +
      '<button class="btn-close closeWishlist"></button></div>' +
      '<div class="modal-body"><ul class="list-group">' + rows + "</ul></div>" +
      "</div></div></div>";
    document.body.appendChild(panel);
    panel.querySelector(".closeWishlist").onclick = function () { panel.remove(); };
  },
};

(function () {
  function init() {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("dblclick", function () {
        Kanchi360.wishlist.save({ title: card.querySelector("h5")?.textContent || "item", ts: Date.now() });
        Kanchi360.showToast("Added to wishlist (demo).");
      });
    });

    var favBtn = document.getElementById("bottomNavWishlist");
    if (favBtn) {
      favBtn.addEventListener("click", function (e) {
        e.preventDefault();
        Kanchi360.wishlist.showPanel();
      });
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();
