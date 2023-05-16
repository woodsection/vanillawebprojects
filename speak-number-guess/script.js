const recognition = new webkitSpeechRecognition();
const msgBoxEl = document.getElementById("msgBox");
recognition.continuous = true;

const randomNum = Math.floor(Math.random() * 100) + 1;

console.log(randomNum);

function drawInvalid(text, isNumber) {
  let tip = "";
  if (isNumber) {
    tip = `<p>${text < randomNum ? "GO HIGHER" : "GO LOWER"}</p>`;
  }
  msgBoxEl.innerHTML = `
  <div>You said: </div>
  <span class="msg">${text}</span>
  <div>That is not a valid number</div>
  ${tip}`;
}

function drawReset(text) {
  recognition.stop();
  const section = document.querySelector("section");
  section.innerHTML = `
  <p class="win">Congrats! You have guessed the number!</p>
  <p class="win">It was ${text}</p>
  <button id="playAgainBtn" onclick="location.reload()">Play Again</button>`;
}

function checkCollect(e) {
  const text = e.results[e.results.length - 1][0].transcript.trim();
  const isNumber = /^[0-9]+$/.test(text);
  if (isNumber && randomNum === Number(text)) {
    drawReset(text);
  } else {
    drawInvalid(text, isNumber);
  }
}

recognition.onresult = e => {
  checkCollect(e);
};

window.addEventListener("load", () => {
  recognition.start();
});
