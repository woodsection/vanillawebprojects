const mainEl = document.querySelector("main");
const toggleBtnEl = document.getElementById("toggleBtn");
const voicesSelect = document.getElementById("voices");
const modalEl = document.getElementById("modal");
const modalCloseEl = document.getElementById("modalClose");
const modalFormEl = document.getElementById("modalForm");
const ssu = new SpeechSynthesisUtterance();
const voiceList = [];

const initalData = [
  {
    text: "I'M THIRSTY",
    img: "img/drink.jpg",
  },
  {
    text: "I'M HUNGRY",
    img: "img/food.jpg",
  },
  {
    text: "I'M TIRED",
    img: "img/tired.jpg",
  },
  {
    text: "I'M HURT",
    img: "img/hurt.jpg",
  },
  {
    text: "I'M HAPPY",
    img: "img/happy.jpg",
  },
  {
    text: "I'M ANGRY",
    img: "img/angry.jpg",
  },
  {
    text: "I'M SAD",
    img: "img/sad.jpg",
  },
  {
    text: "I'M SCARED",
    img: "img/scared.jpg",
  },
  {
    text: "I WANT TO GO OUTSIDE",
    img: "img/outside.jpg",
  },
  {
    text: "I WANT TO GO HOME",
    img: "img/home.jpg",
  },
  {
    text: "I WANT TO GO SCHOOL",
    img: "img/school.jpg",
  },
  {
    text: "I WANT TO GO GRANDMAS",
    img: "img/grandma.jpg",
  },
];

function drawGrid() {
  initalData.forEach(v => {
    const articleEl = document.createElement("article");
    articleEl.className = "card";

    const imgEl = document.createElement("img");
    imgEl.className = "cardImg";
    imgEl.src = v.img;

    const divEl = document.createElement("div");
    divEl.className = "cardTextBox";

    const pEl = document.createElement("p");
    pEl.className = "cardText";
    pEl.textContent = v.text;
    divEl.appendChild(pEl);

    articleEl.appendChild(imgEl);
    articleEl.appendChild(divEl);

    mainEl.appendChild(articleEl);

    articleEl.addEventListener("click", () => {
      ssu.text = pEl.textContent;
      window.speechSynthesis.speak(ssu);
    });
  });
}

function getVoices() {
  speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    voices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voicesSelect.appendChild(option);
      voiceList.push(voice);
    });
  };
}

function toggleModal() {
  modalEl.classList.toggle("show");
}

function changeVoice(voiceName) {
  ssu.voice = voiceList.find(v => v.name === voiceName);
}

function toggleEvent() {
  toggleBtnEl.addEventListener("click", () => {
    toggleModal();
  });
  modalCloseEl.addEventListener("click", () => {
    toggleModal();
  });
}

function submitEvent() {
  modalFormEl.addEventListener("submit", e => {
    e.preventDefault();
    ssu.text = e.target.querySelector("textarea").value;
    window.speechSynthesis.speak(ssu);
  });
}

function changeVoiceEvent() {
  voicesSelect.addEventListener("change", e => {
    const text = e.target.options[e.target.selectedIndex].textContent;
    const name = text.replace(/\s*\([^)]*\)/g, "");
    changeVoice(name);
  });
}

function addEvents() {
  toggleEvent();
  submitEvent();
  changeVoiceEvent();
}

function init() {
  drawGrid();
  getVoices();
  addEvents();
}

window.addEventListener("load", () => {
  init();
});
