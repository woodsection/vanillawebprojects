const { localStorage } = window;

const movieSelectEl = document.getElementById("movieList");
const seatCountEl = document.getElementById("seatCount");
const totalPriceEl = document.getElementById("price");
const seatEl = document.querySelectorAll(
  "#cinemaBox .row .seat:not(.occupied)",
);

let selectedSeats;
let selectedMovieIndex;
let selectedMoviePrice;

function toggleClasses(seat) {
  if (seat.classList.contains("select")) {
    seat.classList.remove("select");
    return;
  }
  seat.classList.add("select");
}

function updateDescription() {
  movieSelectEl.options[selectedMovieIndex].selected = true;
  seatCountEl.textContent = selectedSeats.length;
  totalPriceEl.textContent = selectedSeats.length * selectedMoviePrice;
}

function updateLocalStorage() {
  selectedSeats.sort();
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  localStorage.setItem("selectedMovieIndex", selectedMovieIndex);
  localStorage.setItem("selectedMoviePrice", selectedMoviePrice);
}

function updateView() {
  selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  selectedMovieIndex = localStorage.getItem("selectedMovieIndex") || 0;
  selectedMoviePrice =
    localStorage.getItem("selectedMoviePrice") ||
    movieSelectEl.options[0].value;

  selectedSeats.forEach(v => {
    const seat = seatEl.item(v);
    toggleClasses(seat);
  });

  updateDescription();
}

movieSelectEl.addEventListener("change", event => {
  const index = event.target.selectedIndex;
  const price = event.target.value;
  selectedMoviePrice = price;
  selectedMovieIndex = index;
  updateLocalStorage();
  updateDescription();
});

seatEl.forEach((seat, index) => {
  seat.addEventListener("click", () => {
    if (seat.classList.contains("select")) {
      selectedSeats = selectedSeats.filter(v => {
        return v !== index;
      });
    } else {
      selectedSeats.push(index);
    }
    toggleClasses(seat);
    updateLocalStorage();
    updateDescription();
  });
});

updateView();
