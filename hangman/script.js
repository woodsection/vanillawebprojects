const hangmanEl = document.getElementById("hangman");
const wrongBoxEl = document.getElementById("wrongBox");
const wordEl = document.getElementById("word");
const modalEl = document.getElementById("modal");
const modalScreenEl = document.getElementById("modalScreen");

const toastEl = document.getElementById("toast");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = "";
let correctWordNumber = 0;
const correctAlphabets = [];
const wrongAlphabets = [];

function initialize() {
  // 엘리먼트 초기화
  wordEl.innerHTML = "";
  wrongBoxEl.querySelector("h2").textContent = "";
  wrongBoxEl.classList.remove("show");
  modalEl.classList.remove("show");
  modalScreenEl.classList.remove("show");
  const bodyPartsEl = hangmanEl.querySelectorAll(".bodyPart");
  for (let i = 0; i < bodyPartsEl.length; i += 1) {
    const bodyPart = bodyPartsEl[i];
    bodyPart.style.visibility = "hidden";
  }

  // 변수 초기화
  correctWordNumber = 0;
  correctAlphabets.length = 0;
  wrongAlphabets.length = 0;

  // 단어 재선택
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // word 길이에 따른 엘리먼트(밑줄) 추가
  for (let i = 0; i < selectedWord.length; i += 1) {
    const h1 = document.createElement("h1");
    h1.classList.add("alphabet");
    wordEl.appendChild(h1);
  }
}

function showModal(msg) {
  modalEl.querySelector("h2").textContent = msg;
  modalEl.classList.add("show");
  modalScreenEl.classList.add("show");
}

function checkGameSet() {
  if (selectedWord.length === correctWordNumber) {
    showModal("Congratulations! You won! 😃");
  } else if (wrongAlphabets.length >= 6) {
    showModal("Unfortunately you lost. 😕");
  }
}

function correctKey(alphabet) {
  correctAlphabets.push(alphabet);
  const h1Els = wordEl.querySelectorAll("h1");
  for (let i = 0; i < selectedWord.length; i += 1) {
    if (selectedWord[i] === alphabet) {
      h1Els[i].textContent = alphabet;
      correctWordNumber += 1;
    }
  }
}

function wrongKey(alphabet) {
  if (!wrongBoxEl.classList.contains("show")) {
    wrongBoxEl.classList.add("show");
  }
  wrongAlphabets.push(alphabet);
  const h2El = wrongBoxEl.querySelector("h2");
  h2El.textContent = wrongAlphabets.join(",");

  const bodyPartEl = hangmanEl.querySelectorAll(".bodyPart");
  wrongAlphabets.forEach((v, i) => {
    bodyPartEl[i].style.visibility = "visible";
  });
}

function checkKey(alphabet) {
  if (selectedWord.includes(alphabet)) {
    correctKey(alphabet);
  } else {
    wrongKey(alphabet);
  }

  checkGameSet();
}

window.addEventListener("keypress", e => {
  if (/^[a-zA-Z]+$/.test(e.key)) {
    if (correctAlphabets.includes(e.key) || wrongAlphabets.includes(e.key)) {
      toastEl.classList.add("show");
      setTimeout(() => {
        toastEl.classList.remove("show");
      }, 2000);
    } else {
      checkKey(e.key);
    }
  }
});

initialize();
