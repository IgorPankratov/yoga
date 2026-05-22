// Calc 
function calc() {
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
}

module.exports = calc;