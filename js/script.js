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
  let deadline = "2026-03-16";

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
    failure: "Что-то пошло не так...",
    empty: "",
  };

  let form = this.document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),
    statusMessage = this.document.createElement("div"); // элемент для отображения статуса отправки формы

  statusMessage.classList.add("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.appendChild(statusMessage); // добавляем поле со статусом в форму

    /*Создаем запрос*/
    let request = new XMLHttpRequest();
    request.open("POST", "server.php"); // настроили запрос
    // request.setRequestHeader(
    //   "Content-Type",
    //   "application/x-www-form-urlencoded",
    // ); // настройка заголовков. Говорим, что наш контент будет содержать данные полученные из формы
    request.setRequestHeader(
      "Content-Type",
      "application/json;charset=utf-8",
    ); // настройка заголовков если отправляем в формате JSON. Говорим, что наш контент будет содержать данные JSON 


    /* Необходимо получить данные, которые ввел пользователь. Используем встроенный объект FormData */

    let formData = new FormData(form);

    /* Если надо отправить данные в формате JSON, то нужно преобразовать объект FormData */

    let obj = {}; // создаём промежуточный объект

    formData.forEach(function(value,key) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj); // пребразовали промежуточный объект (obj) в формат JSON

    // /* отправляем данные на сервер */
    // request.send(formData);

    /* меняем тело нашего запроса и отправляем данные на сервер */
    request.send(json);

    /* Сообщаем клиенту о статусе отправления */

    request.addEventListener('readystatechange', function() {
      if(request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    /* После отправки данных формы очищаем поля форм */

    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
      statusMessage.innerHTML = message.empty;
    }
  });
});
