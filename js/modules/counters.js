// modules/counters.js
function animateCounter(el) {
  var target = parseInt(el.dataset.value, 10);
  if (isNaN(target)) return;
  var count = 0;
  var interval = setInterval(function () {
    count += Math.ceil(target / 100);
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count + "+";
  }, 20);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-value]").forEach(animateCounter);
});
