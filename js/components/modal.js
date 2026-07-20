// components/modal.js
// Generic demo booking modal, extracted from the original inline openBooking().
window.Kanchi360 = window.Kanchi360 || {};

Kanchi360.openModal = function (title) {
  var modal = document.createElement("div");
  modal.innerHTML =
    '<div class="modal fade show" style="display:block;background:rgba(0,0,0,.6)">' +
    '<div class="modal-dialog"><div class="modal-content">' +
    '<div class="modal-header"><h5>' + title + '</h5>' +
    '<button class="btn-close closeModal"></button></div>' +
    '<div class="modal-body">' +
    '<label class="form-label">Name</label><input class="form-control mb-3">' +
    '<label class="form-label">Phone</label><input class="form-control mb-3">' +
    '<button class="btn btn-primary w-100 confirmBooking">Confirm Demo Booking</button>' +
    '</div></div></div></div>';

  document.body.appendChild(modal);

  modal.querySelector(".closeModal").onclick = function () { modal.remove(); };
  modal.querySelector(".confirmBooking").onclick = function () {
    modal.remove();
    Kanchi360.showToast("✅ Demo booking submitted.");
  };
};
