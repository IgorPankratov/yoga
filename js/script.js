window.addEventListener("DOMContentLoaded", function () {
  "use strict";

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
});
