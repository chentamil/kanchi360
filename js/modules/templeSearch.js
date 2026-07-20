// modules/templeSearch.js
(function () {
  function init() {
    var box = document.getElementById("templeSearchBox");
    var grid = document.getElementById("templeGrid");
    if (!box || !grid) return;

    box.addEventListener("keyup", function () {
      var value = box.value.toLowerCase();
      grid.querySelectorAll(".temple-card").forEach(function (card) {
        var text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "" : "none";
      });
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
