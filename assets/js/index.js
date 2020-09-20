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
      setTimeout(function cb() {
        console.log(counter++);
        newTimer();
        setTimeout(cb, timeout);
      }, 100);
    } else {
      console.timeEnd("numbersTOut");
    }
  }
  return newTimer();
}

numbersTimeOut();

/* const p1 = new Promise((resolve, reject) => {
  resolve("Resolved promise");
});

console.log(p1);

p1.then(
  (string) => {
    console.log("Promise result", string);

    return new Promise((resolve, reject) => {
      resolve(string);
    }); //string;
  },
  (err) => {
    console.error(err);
  }
).then(
  (value) => {
    console.log(value);
  },
  (err) => {
    console.error(err);
  }
);
 */

console.log(window.location.href);
const ulList = document.getElementById("userList");
fetch("../../json.json")
  .then((res) => res.json())
  .then((data) => addLi(ulList, data))
  .catch(console.error);

function addLi(elem, data) {
  /**
   *
   * @param {DOMElement} elem
   * @param {Array of Object} data
   */
  const newLiArr = data.map((value) => {
    const newLi = document.createElement("li");
    newLi.textContent = JSON.stringify(value);
    return newLi;
  });
  elem.append(...newLiArr);
}
