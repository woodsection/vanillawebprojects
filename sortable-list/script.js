const richEl = document.getElementById("rich-list");
const richList = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

let draggedEl = null;

function checkRanking() {
  const richListEl = richEl.querySelectorAll("li");
  // const richListEl = richEl.getElementsByTagName("li");
  richListEl.forEach((r, i) => {
    const name = r.getElementsByClassName("name")[0];
    if (name.textContent === richList[i]) {
      name.classList.add("match");
      name.classList.remove("unmatch");
    } else {
      name.classList.add("unmatch");
      name.classList.remove("match");
    }
  });
}

function getShuffledRichList() {
  const cRichList = JSON.parse(JSON.stringify(richList));
  cRichList.sort(() => Math.random() - 0.5);
  // cRichList.forEach((e, i) => {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [cRichList[i], cRichList[j]] = [cRichList[j], cRichList[i]];
  // });
  return cRichList;
}

function addDragEventListeners(el) {
  el.addEventListener("dragstart", e => {
    draggedEl = e.target;
    e.dataTransfer.setData("nameBox", e.target.innerHTML);
  });
  el.addEventListener("drop", e => {
    if (
      draggedEl.classList[0] === e.target.classList[0] &&
      draggedEl !== e.target
    ) {
      draggedEl.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData("nameBox");
    }
    el.classList.remove("over");
  });
  el.addEventListener("dragover", e => {
    el.classList.add("over");
    e.preventDefault();
  });
  el.addEventListener("dragenter", () => {
    el.classList.add("over");
  });
  el.addEventListener("dragleave", () => {
    el.classList.remove("over");
  });
  el.addEventListener("dragend", () => {
    draggedEl = null;
  });
}

function drawRichList() {
  const shuffledRichList = getShuffledRichList();
  shuffledRichList.forEach(r => {
    const li = document.createElement("li");
    const numSpan = document.createElement("span");
    const nameDiv = document.createElement("div");
    const nameSpan = document.createElement("span");
    const i = document.createElement("i");

    numSpan.classList.add("num");
    nameDiv.classList.add("nameBox");
    nameDiv.draggable = true;
    nameSpan.classList.add("name");
    nameSpan.textContent = r;
    i.classList.add("fas", "fa-grip-lines");

    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(i);
    li.appendChild(numSpan);
    li.appendChild(nameDiv);
    richEl.appendChild(li);

    addDragEventListeners(nameDiv);
  });
}

document.getElementById("check").addEventListener("click", checkRanking);

drawRichList();
