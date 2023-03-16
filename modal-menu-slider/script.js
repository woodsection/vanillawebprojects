function menuToggle(e) {
  if (document.body.classList.contains("nav")) {
    document.body.classList.remove("nav");
  } else {
    document.body.classList.add("nav");
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
