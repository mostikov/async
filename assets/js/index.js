"use strict";

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

function delay(ms) {
  const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(""), ms);
  });
  return newPromise;
}
