//Slider
function slider() {
  // Slider

  let slideIndex = 1; // отвечает за слайд, который показываетс в текущий момент
  let slides = this.document.querySelectorAll(".slider-item");
  let prev = this.document.querySelector(".prev");
  let next = this.document.querySelector(".next");
  let dotsWrap = this.document.querySelector(".slider-dots");
  let dots = this.document.querySelectorAll(".dot");

  showSlides(slideIndex);

  function showSlides(n) {
    /*функция получает номер слайда и показывает его*/

    // Что переместиться от первого слайда к последнему и от последнего к первому
    // пишем проверку
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = "none")); // скрываем все слайды
    dots.forEach((item) => item.classList.remove("dot-active")); // удалили классы активации у точек

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlides(n) {
    showSlides((slideIndex = n));
  }

  //Реализуем управление слайдером через стрелки и точки
  prev.addEventListener("click", function () {
    plusSlides(-1);
  });

  next.addEventListener("click", function () {
    plusSlides(1);
  });

  //В управлении точками используем приём делегирование
  dotsWrap.addEventListener("click", function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (
        event.target.classList.contains("dot") &&
        event.target == dots[i - 1]
      ) {
        currentSlides(i);
      }
    }
  });
}

module.exports = slider;
