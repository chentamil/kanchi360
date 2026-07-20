// core/app.js
// Single entry point loaded by layout.njk. Keeps layout.njk to one <script> tag
// while every feature still lives in its own small file under modules/ or components/.
window.addEventListener("load", function () {
  setTimeout(function () {
    if (window.Kanchi360 && Kanchi360.showToast) {
      Kanchi360.showToast("🙏 Welcome to Kanchi360");
    }
  }, 1000);
});
