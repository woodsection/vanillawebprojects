const fromCountryCodes = document.getElementById("fromCountryCodes");
const toCountryCodes = document.getElementById("toCountryCodes");
const swapBtn = document.getElementById("swapBtn");
const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const compare = document.getElementById("compare");

const BASEURL =
  "https://v6.exchangerate-api.com/v6/b407aa05c65b786d6e1f14c5/latest/USD";

async function calculate() {
  const fromCountryCode = fromCountryCodes.value;
  const toCountryCode = toCountryCodes.value;
  const res = await fetch(BASEURL);
  const data = (await res.json()).conversion_rates;

  const toCountryAmount = data[fromCountryCode] / data[toCountryCode];
  compare.textContent = `1 ${fromCountryCode} = ${toCountryAmount} ${toCountryCode}`;
  toAmount.value = (fromAmount.value * toCountryAmount).toFixed(2);
}

function addEvents() {
  fromCountryCodes.addEventListener("change", calculate);
  toCountryCodes.addEventListener("change", calculate);
  fromAmount.addEventListener("input", calculate);
  toAmount.addEventListener("input", calculate);

  swapBtn.addEventListener("click", () => {
    const temp = fromCountryCodes.value;
    fromCountryCodes.value = toCountryCodes.value;
    toCountryCodes.value = temp;
    calculate();
  });
}

async function initialize() {
  const res = await fetch(BASEURL);
  const data = (await res.json()).conversion_rates;
  Object.keys(data).forEach(k => {
    const optionElement1 = document.createElement("option");
    const optionElement2 = document.createElement("option");
    optionElement1.value = k;
    optionElement1.textContent = k;
    optionElement2.value = k;
    optionElement2.textContent = k;
    fromCountryCodes.appendChild(optionElement1);
    toCountryCodes.appendChild(optionElement2);
  });
  calculate();
  addEvents();
}

window.addEventListener("load", initialize);
