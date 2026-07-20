// modules/scrollReveal.js
// Every direct <section> under <main> fades/slides in the first time it enters
// the viewport. Cheap (one observer, unobserves after firing), no layout shift
// since content is already there, just faded.
//
// FIX: threshold was 0.12, meaning 12% of the section's *entire height* had to
// be on-screen before it revealed. For short marketing sections that's fine,
// but a tall section (e.g. a 30-card blog grid + sidebar) can be thousands of
// pixels tall, so even a full viewport of it visible never reached 12% —
// the section stayed invisible (opacity: 0) indefinitely. threshold: 0 fires
// as soon as a single pixel is visible instead, which is what "reveal on
// scroll" should mean regardless of how tall the content is.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var sections = document.querySelectorAll("main > section");
    if (!("IntersectionObserver" in window) || !sections.length) {
      sections.forEach(function (s) { s.classList.add("revealed"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    sections.forEach(function (s, i) {
      s.classList.add("reveal");
      // first section (hero) shows immediately, no need to wait for scroll
      if (i === 0) { s.classList.add("revealed"); return; }
      observer.observe(s);
    });

    // Failsafe: whatever the reason (unusual layout, observer edge case, a
    // future tall section we didn't anticipate), nothing should stay
    // permanently invisible. Force-reveal anything still hidden after 2s.
    setTimeout(function () {
      document.querySelectorAll("main > section.reveal:not(.revealed)").forEach(function (s) {
        s.classList.add("revealed");
      });
    }, 2000);
  });
})();
