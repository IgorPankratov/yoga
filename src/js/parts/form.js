//Form

function form() {
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
}

module.exports = form;
