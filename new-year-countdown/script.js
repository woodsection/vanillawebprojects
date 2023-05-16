const secEl = document.getElementById("sec");
const minEl = document.getElementById("min");
const houEl = document.getElementById("hou");
const dayEl = document.getElementById("day");
const nyEl = document.getElementById("comming-year");

function updateTime() {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1);

  const t = nextYear.getTime() - now.getTime();
  const sec = Math.floor(t / 1000);
  const min = Math.floor(sec / 60);
  const hou = Math.floor(min / 60);
  const day = Math.floor(hou / 24);

  secEl.textContent = (sec % 60).toString().padStart(2, "0");
  minEl.textContent = (min % 60).toString().padStart(2, "0");
  houEl.textContent = (hou % 24).toString().padStart(2, "0");
  dayEl.textContent = day.toString().padStart(3, "0");
  nyEl.textContent = nextYear.getFullYear();
}

setTimeout(() => {
  document.querySelector("main").className = "";
}, 1000);

setInterval(updateTime, 1000);
