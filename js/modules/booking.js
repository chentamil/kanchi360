// modules/booking.js
// Same behaviour as the original file's "any Book/Appointment button opens a modal",
// but scoped to its own module instead of living inline in a 600-line script block.
(function () {
  function init() {
    document.querySelectorAll("[data-book]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Kanchi360.openModal(btn.dataset.book);
      });
    });

    // fallback: any button whose text still says Book/Appointment (matches legacy markup
    // that hasn't been given a data-book attribute yet)
    document.querySelectorAll(".btn").forEach(function (btn) {
      if (btn.dataset.book) return;
      if (/book|appointment/i.test(btn.textContent)) {
        btn.addEventListener("click", function () {
          Kanchi360.openModal("Demo Booking");
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
