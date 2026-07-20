// components/toast.js
// Small floating toast notification, used by contact form / wishlist / language selector.
window.Kanchi360 = window.Kanchi360 || {};

Kanchi360.showToast = function (html) {
  var toast = document.createElement("div");
  toast.className = "position-fixed bottom-0 start-50 translate-middle-x mb-4 bg-dark text-white px-4 py-2 rounded shadow";
  toast.style.zIndex = "9999";
  toast.innerHTML = html;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 3000);
};
