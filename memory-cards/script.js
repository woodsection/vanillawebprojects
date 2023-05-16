const addNewCardBtnEl = document.getElementById("addNewCardBtn");
const addCardBoxEl = document.getElementById("addCardBox");
const addCardBtn = document.getElementById("addCardBtn");
const clearCardsBtnEl = document.getElementById("clearCardsBtn");
const cardBoxEl = document.getElementById("cardBox");
const pagingTextEl = document.getElementById("pagingText");
const beforeBtnEl = document.getElementById("beforeBtn");
const nextBtnEl = document.getElementById("nextBtn");

const cards = JSON.parse(localStorage.getItem("cards")) || [];
let currentCard = 1;

function updatePageText() {
  pagingTextEl.textContent =
    cards.length >= 1 ? `${currentCard}/${cards.length}` : "";
}

function toggleAddContainer() {
  addCardBoxEl.classList.toggle("show");
}

function drawCard() {
  updatePageText();
  cardBoxEl.innerHTML = "";
  if (!cards.length) {
    cardBoxEl.className = "cardBox";
    return;
  }

  cardBoxEl.classList.add("question");

  const card = cards[currentCard - 1];
  const flip = document.createElement("div");
  flip.className = "flipIcon";

  const i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-arrows-rotate");

  const span = document.createElement("span");
  span.textContent = "Flip";

  flip.appendChild(i);
  flip.appendChild(span);

  const questionEl = document.createElement("p");
  questionEl.className = "question";
  const answerEl = document.createElement("p");
  answerEl.className = "answer";
  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;

  cardBoxEl.appendChild(flip);
  cardBoxEl.appendChild(questionEl);
  cardBoxEl.appendChild(answerEl);
}

addNewCardBtnEl.addEventListener("click", () => {
  toggleAddContainer();
});

addCardBtn.addEventListener("click", e => {
  e.preventDefault();
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question && answer) {
    const card = { question, answer };
    cards.push(card);
    localStorage.setItem("cards", JSON.stringify(cards));
    pagingTextEl.textContent = `${currentCard}/${cards.length}`;
    toggleAddContainer();
    drawCard();
    questionEl.value = "";
    answerEl.value = "";
  }
});

clearCardsBtnEl.addEventListener("click", () => {
  localStorage.removeItem("cards");
  cards.length = 0;
  drawCard();
});

beforeBtnEl.addEventListener("click", () => {
  if (currentCard <= 1) {
    currentCard = 1;
    return;
  }
  currentCard -= 1;

  drawCard();
});

nextBtnEl.addEventListener("click", () => {
  if (currentCard >= cards.length) {
    return;
  }
  currentCard += 1;

  drawCard();
});

cardBoxEl.addEventListener("click", () => {
  const classes = cardBoxEl.classList;
  if (classes.contains("question")) {
    classes.remove("question");
    classes.add("answer");
  } else {
    classes.remove("answer");
    classes.add("question");
  }
});

drawCard();
