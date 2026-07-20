// modules/slider.js
// The actual swipe/scroll behaviour needs no JS at all — .kc-slider is pure
// CSS scroll-snap, which every mobile browser already handles natively via
// touch. This file only wires the optional prev/next arrow buttons shown on
// desktop (mouse users have no touch swipe to fall back on).
(function () {
  function init() {
    document.querySelectorAll(".kc-slider-wrap").forEach(function (wrap) {
      var track = wrap.querySelector(".kc-slider");
      var prev = wrap.querySelector(".kc-slider-arrow.prev");
      var next = wrap.querySelector(".kc-slider-arrow.next");
      if (!track) return;

      var scrollAmount = function () { return track.clientWidth * 0.8; };

      if (prev) prev.addEventListener("click", function () {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      });
      if (next) next.addEventListener("click", function () {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      });
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
