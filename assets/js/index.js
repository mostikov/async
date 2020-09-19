"use strict";

const input = document.getElementById("input");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  alert();
});

function numbersInterval() {
  console.time("numbersInt");
  let num = 0;
  const timer1 = setInterval(() => {
    console.log(++num);
    if (num === 20) {
      clearInterval(timer1);
      console.timeEnd("numbersInt");
    }
  }, 100);
}
numbersInterval();

function numbersTimeOut() {
  console.time("numbersTOut");
  let counter = 1;

  function newTimer() {
    if (counter <= 20) {
      setTimeout(() => {
        console.log(counter++);
        newTimer();
      }, 100);
    } else {
      console.timeEnd("numbersTOut");
    }
  }
  return newTimer();
}

numbersTimeOut();
