// modules/contactForm.js
// Same "submit -> toast" demo behavior, but each form now gets a message that
// matches what it actually is (Trip Planner was showing the generic "enquiry
// submitted" contact-form message, which was confusing).
(function () {
  var MESSAGES = {
    tripPlannerForm: "🗺️ Demo itinerary generated! (demo only — no real itinerary engine wired up yet)",
    contactForm: "✅ Thank you!<br>Your enquiry has been submitted.",
  };

  function init() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.hasAttribute("data-search-widget")) return; // let search forms submit natively
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var message = MESSAGES[form.id] || "✅ Submitted (demo).";
        // Future backend: replace this block with a fetch() POST to your real endpoint
        // (Formspree, Google Form, your own API, etc) per form.id.
        Kanchi360.showToast(message);
        form.reset();
      });
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
