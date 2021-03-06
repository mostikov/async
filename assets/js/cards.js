"use strict";

const userCardUrl = "http://192.168.1.148:3000/users";
const headUrl = "http://192.168.1.148:3000/auth";
const rootElement = document.getElementById("root");

fetchUrl(userCardUrl)
  .then((data) => {
    const userCards = data.map((item) => createUserCard(item));
    rootElement.append(...userCards);
  })
  .catch(console.error);

fetchUrl(headUrl).then((data) => {
  rootElement.prepend(createHeader(data));
});

function createHeader(data) {
  const head = createElem({
    elementTag: "header",
    style: ["header"],
  });

  const userImg = createElem({
    elementTag: "img",
    attribute: [
      { attr: "src", value: data.profilePicture },
      { attr: "title", value: data.position },
    ],
    style: ["userImgSmall"],
  });

  const userName = createElem({
    elementTag: "span",
    textContent: `${data.firstName} ${data.lastName}`,
    attribute: [],
  });
  head.append(userName, userImg);
  return head;
}

function fetchUrl(url) {
  const resp = fetch(url).then((res) => res.json());
  return resp;
}

function createUserCard(userData) {
  if (!userData.firstName) {
    userData.firstName = "Unknown";
  }
  if (!userData.lastName) {
    userData.lastName = "Unknown";
  }

  const onImgLoadError = (err) => {
    userImg.remove();
    const imgRepl = createElem({
      elementTag: "div",
      style: ["imgRepl"],
      attribute: [
        {
          attr: "style",
          value: `background-color: #${ascii_to_hexa(
            userData.firstName.charAt(0) + userData.lastName.charAt(0)
          )}`,
        },
      ],
    });
    const nameSymb = createElem({
      elementTag: "span",
      textContent: `${userData.firstName.charAt(0)} ${userData.lastName.charAt(
        0
      )}`,
    });
    imgRepl.append(nameSymb);
    newCard.prepend(imgRepl);
  };

  const newCard = createElem({
    elementTag: "div",
    style: ["userCard"],
    dataset: [{ setName: "id", setValue: userData.id }],
    event: [
      {
        action: "click",
        event: (event) => {
          event.currentTarget.classList.toggle("userCardClicked");
          const currentId = document.getElementById("");
        },
      },
    ],
  });

  const userImg = createElem({
    elementTag: "img",
    attribute: [{ attr: "src", value: userData.profilePicture }],
    style: ["userImg"],
    onerror: onImgLoadError,
  });

  const userInfo = createElem({
    elementTag: "div",
    style: ["userInfo"],
    textContent: `${userData.firstName} ${userData.lastName}`,
  });

  const userAbout = createElem({
    elementTag: "span",
    style: ["userAbout"],
    textContent: `${randomText()}`,
  });

  const userBtn = createElem({
    elementTag: "span",
    textContent: "Connect",
    style: ["connectBtn"],
  });

  userInfo.appendChild(userAbout);
  newCard.append(userImg, userInfo, userBtn);
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
  const res = "0" + arr1.join("") + "9";
  return res;
}

function createElem(data) {
  const newElement = document.createElement(data.elementTag);
  newElement.textContent = data.textContent;
  if (data.style) {
    newElement.classList.add(...data.style);
  }
  newElement.onclick = data.onclick;
  newElement.onerror = data.onerror;
  if (data.event) {
    data.event.map((event) =>
      newElement.addEventListener(event.action, event.event)
    );
  }
  if (data.attribute) {
    data.attribute.map((attribute) => {
      newElement.setAttribute(attribute.attr, attribute.value);
    });
  }
  return newElement;
}
