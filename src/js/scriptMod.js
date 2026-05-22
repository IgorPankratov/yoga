window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    let tabs = require("./parts/tabs.js");
    let timer = require("./parts/timer.js");
    let slider = require("./parts/slider.js");
    let popup = require("./parts/popup.js");
    let forms = require("./parts/form.js");
    let calc = require("./parts/calc.js");

    tabs();
    timer();
    slider();
    popup();
    forms();
    calc();

})