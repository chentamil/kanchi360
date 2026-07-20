// modules/theme.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("darkToggle");
    if (!btn) return;
    var saved = localStorage.getItem("kanchi360-theme");
    if (saved === "dark") {
      document.body.classList.add("dark-mode");
      btn.textContent = "☀️";
    }
    btn.addEventListener("click", function () {
      var dark = document.body.classList.toggle("dark-mode");
      btn.textContent = dark ? "☀️" : "🌙";
      localStorage.setItem("kanchi360-theme", dark ? "dark" : "light");
    });
  });
})();
