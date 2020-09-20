"use strict";

//
const fetchUrl = "http://192.168.1.148:3000";
const userCards = [];
const rootElement = document.getElementById("root");
fetch(fetchUrl)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const temp = data.map((item) => createUserCard(item));
    rootElement.append(...temp);
  })
  .catch(console.error);

function createUserCard(userData) {
  if (!userData.firstName) {
    userData.firstName = "Unknown";
  }
  if (!userData.lastName) {
    userData.lastName = "Unknown";
  }
  const newCard = document.createElement("div");
  const userImg = document.createElement("img");
  const userInfo = document.createElement("div");
  const userAbout = document.createElement("span");
  const userBtn = document.createElement("span");
  newCard.classList.add("userCard");

  userInfo.classList.add("userInfo");
  userInfo.textContent = `${userData.firstName} ${userData.lastName}`;

  userAbout.classList.add("userAbout");
  userAbout.textContent = `${randomText()}`;
  userInfo.appendChild(userAbout);

  userImg.setAttribute("src", userData.profilePicture);
  userImg.classList.add("userImg");
  userImg.onerror = (err) => {
    userImg.remove();
    const imgRepl = document.createElement("div");
    const nameSymb = document.createElement("span");
    nameSymb.textContent = `${userData.firstName.charAt(
      0
    )} ${userData.lastName.charAt(0)}`;
    imgRepl.classList.add("imgRelp");
    imgRepl.setAttribute(
      "style",
      `background-color: #${ascii_to_hexa(
        "" + userData.firstName.charAt(0) + " " + userData.lastName.charAt(0)
      )}`
    );
    imgRepl.append(nameSymb);
    newCard.prepend(imgRepl);
  };
  userBtn.textContent = "Connect";
  userBtn.classList.add("connectBtn");
  userBtn.dataset.connectId = userData.id;

  newCard.append(userImg);
  newCard.append(userInfo);
  newCard.append(userBtn);
  return newCard;
}

function randomText() {
  const rand = Math.floor(Math.random() * Math.floor(5));
  const randText = ["FullStack JS dev", "HR", "DevOps", "QA", "Sales Manager"];
  return randText[rand];
}

function ascii_to_hexa(str) {
  const arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}
