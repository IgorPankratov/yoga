window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  // TABS

  let tab = this.document.querySelectorAll(".info-header-tab"),
    info = this.document.querySelector(".info-header"),
    tabContent = this.document.querySelectorAll(".info-tabcontent");

  // скрывает табы
  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  hideTabContent(1);

  // показывает табы
  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  // Назначение обработчика при клике на кнопки табов
  info.addEventListener("click", function (event) {
    let target = event.target;
    console.log(event.target);
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // TIMER

  // Дата окончания отсчёта
  let deadline = "2026-09-03";

  // Узнаём промежуток времени между текущим временем и дедлайном
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());

    let seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / 1000 / 60 / 60);

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // Пишем функцию, которая превращает статичную верстку в динамичную
  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    // функция, которая обновляет таймер каждую секунду
    function updateClock() {
      let t = getTimeRemaining(endtime);

      function addZero(num) {
        if (num <= 9) {
          return "0" + num;
        } else return num;
      }

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
      }
    }
  }

  setClock("timer", deadline);

  // Popup

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

  // Form

  let message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что‑то пошло не так...",
    empty: "",
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    // Показываем статус загрузки
    statusMessage.innerHTML = message.loading;

    try {
      const responseData = await sendFormData(form);
      statusMessage.innerHTML = message.success;

      // Очищаем поля формы после успешной отправки
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      statusMessage.innerHTML = message.failure;
    } finally {
      // Убираем сообщение через 3 секунды
      setTimeout(() => {
        statusMessage.innerHTML = message.empty;
      }, 3000);
    }
  });

  function sendFormData(form) {
    return new Promise((resolve, reject) => {
      const formData = new FormData(form);
      const obj = {};

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      const json = JSON.stringify(obj);

      /*Создаем запрос*/
      let request = new XMLHttpRequest();
      request.open("POST", "server.php"); // настроили запрос
      request.setRequestHeader(
        "Content-Type",
        "application/json;charset=utf-8",
      ); // настройка заголовков если отправляем в формате JSON. Говорим, что наш контент будет содержать данные JSON

      /* меняем тело нашего запроса и отправляем данные на сервер */
      request.send(json);
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  }

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

  // Calc 

  let persons = document.querySelectorAll(".counter-block-input")[0];
  let restDays = this.document.querySelectorAll(".counter-block-input")[1];
  let place = this.document.getElementById("select");
  let totalValue = this.document.getElementById("total");
  let personsSum = 0;
  let daysSum = 0;
  let total = 0;

  totalValue.innerHTML = 0;

  persons.addEventListener("input", function() {
    personsSum = +this.value;
    total = (daysSum * personsSum) * 4000;

    // Проверяем, чтобы поле тотал не заполнялось, если в одном из инпутов нет значения
    if(restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  })

  restDays.addEventListener("input", function() {
    daysSum = +this.value;
    total = (daysSum * personsSum) * 4000;
    
    // Проверяем, чтобы поле тотал не заполнялось, если в одном из инпутов нет значения
    if(persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  })

  place.addEventListener("change", function() {
    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  })
});
