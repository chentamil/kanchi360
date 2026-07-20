// modules/backToTop.js
// Creates its own button, appends to <body>, shows after 400px scroll,
// smooth-scrolls to top on click. Uses .back-top / .show classes (see layout.njk CSS).
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.createElement("button");
    btn.className = "back-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 400);
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
