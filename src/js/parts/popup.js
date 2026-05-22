// Popup

function popup() {
  let more = this.document.querySelector(".more"),
    overlay = this.document.querySelector(".overlay"),
    close = this.document.querySelector(".popup-close"),
    descrBtns = this.document.querySelectorAll(".description-btn");

  function showOverlay() {
    overlay.style.display = "block";
    this.classList.add(".more-splash"); // добавили анимацию
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    overlay.style.display = "none";
    this.classList.remove(".more-splash");
    document.body.style.overflow = "";
  }

  more.addEventListener("click", showOverlay);

  close.addEventListener("click", closeOverlay);

  descrBtns.forEach((item) => {
    item.addEventListener("click", showOverlay);
  });
}

module.exports = popup;
