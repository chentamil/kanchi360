// modules/language.js
// Same fake selector as the original file. Left as UI-only demo since no translation
// data exists. Swap the "change" handler for real i18n lookups once you have them.
(function () {
  var languages = ["English", "Tamil", "Hindi", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati"];

  function init() {
    var box = document.createElement("select");
    box.className = "form-select position-fixed";
    box.style.top = "80px";
    box.style.right = "20px";
    box.style.width = "130px";
    box.style.zIndex = "999";

    languages.forEach(function (lang) {
      var opt = document.createElement("option");
      opt.textContent = lang;
      box.appendChild(opt);
    });

    document.body.appendChild(box);

    box.addEventListener("change", function () {
      Kanchi360.showToast("Language changed to " + box.value + " (demo — no translations wired yet).");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
