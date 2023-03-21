function menuToggle(e) {
  const mainEl = document.querySelector("main");
  if (mainEl.classList.contains("nav")) {
    mainEl.classList.remove("nav");
  } else {
    mainEl.classList.add("nav");
  }
}

function modal(e) {
  const modalEl = document.getElementById("modal");
  const modalScreen = document.getElementById("modalScreen");
  if (modalEl.classList.contains("show")) {
    modalEl.classList.remove("show");
    modalScreen.classList.remove("show");
  } else {
    modalEl.classList.add("show");
    modalScreen.classList.add("show");
  }
}
