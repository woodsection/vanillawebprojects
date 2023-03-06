const addUserBtn = document.getElementById("addUserBtn");
const doubleMoneyBtn = document.getElementById("doubleMoneyBtn");
const showMillionBtn = document.getElementById("showMillionBtn");
const sortBtn = document.getElementById("sortBtn");
const calcualteBtn = document.getElementById("calcualteBtn");
const persons = document.getElementById("persons");
const content = document.getElementById("content");

const BASEURL = "https://randomuser.me/api/";
const MILLION = 1000000;

let personsData = [];

async function getPersionName() {
  const res = await fetch(BASEURL);
  const { name } = (await res.json()).results[0];
  return `${name.first} ${name.last}`;
}

function getWealthFromEl(el) {
  return Number(
    el.getElementsByTagName("span")[0].textContent.replaceAll(",", ""),
  );
}

function buildWealthForm(wealth) {
  const wealthStr = wealth.toFixed(2);
  return wealthStr.includes("e") ? wealthStr : `${wealth.toLocaleString()}.00`;
}

function drawContents() {
  persons.innerHTML = "";
  Array.from(content.getElementsByClassName("total")).forEach(el =>
    el.remove(),
  );

  personsData.forEach(el => {
    persons.appendChild(el);
  });
}

function doubleWealth() {
  personsData.map(el => {
    const span = el.getElementsByTagName("span")[0];
    const wealth = getWealthFromEl(el) * 2;
    span.textContent = buildWealthForm(wealth);
  });

  drawContents();
}

function onlyMillionaires() {
  personsData = personsData.filter(el => {
    const wealth = getWealthFromEl(el);
    return wealth > MILLION;
  });

  drawContents();
}

function sortByWealth() {
  personsData = personsData.sort(
    (a, b) => getWealthFromEl(b) - getWealthFromEl(a),
  );

  drawContents();
}

function addAllWealth() {
  const wealth = personsData.reduce((accum, current) => {
    return accum + getWealthFromEl(current);
  }, 0);
  const total = document.createElement("h3");
  total.classList.add("total");
  total.textContent = "Total Wealth:";
  const wealthEl = document.createElement("span");
  wealthEl.textContent = buildWealthForm(wealth);
  wealthEl.classList.add("wealth");
  total.appendChild(wealthEl);

  content.appendChild(total);
}

async function addUser() {
  const liEl = document.createElement("li");
  const nameEl = document.createElement("h3");
  const wealthEl = document.createElement("span");
  const personName = await getPersionName();
  const wealth = Math.floor(Math.random() * MILLION);
  nameEl.textContent = personName;
  wealthEl.classList.add("wealth");
  wealthEl.textContent = buildWealthForm(wealth);
  liEl.appendChild(nameEl);
  liEl.appendChild(wealthEl);
  personsData.push(liEl);

  drawContents();
}

function addEvents() {
  addUserBtn.addEventListener("click", addUser);
  doubleMoneyBtn.addEventListener("click", doubleWealth);
  showMillionBtn.addEventListener("click", onlyMillionaires);
  sortBtn.addEventListener("click", sortByWealth);
  calcualteBtn.addEventListener("click", addAllWealth);
}

async function initialize() {
  addEvents();
  addUser();
  addUser();
  addUser();
}

window.addEventListener("load", initialize);
