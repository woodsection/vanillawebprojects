const $galleryBox = document.getElementById("galleryBox");
const $detailBox = document.getElementById("detailBox");
const $searchMsg = document.getElementById("searchMsg");
const $searchBtn = document.getElementById("searchBtn");
const $randomBtn = document.getElementById("randomBtn");

const BASEURL = "http://www.themealdb.com/api/json/v1/1";

async function getRandomMeal() {
  const url = `${BASEURL}/random.php`;
  const data = await (await fetch(url)).json();
  return data.meals[0];
}

async function getMealListByName(name) {
  const url = `${BASEURL}/search.php?s=${name}`;
  const data = await (await fetch(url)).json();
  return data.meals;
}

function drawMsg(msg) {
  $searchMsg.textContent = msg;
}

function enableMealDetail() {
  $detailBox.classList.replace("disable", "enable");
  $galleryBox.classList.add("enable", "disable");
}

function enableMealList() {
  $galleryBox.classList.replace("disable", "enable");
  $detailBox.classList.add("enable", "disable");
}

function drawMealDetail(meal) {
  $detailBox.innerHTML = "";

  const ingredients = [];

  const tags = [];
  if (meal.strTags && meal.strTags.includes(",")) {
    tags.concat(meal.strTags.split(","));
  } else if (meal.strTags) {
    tags.push(meal.strTags);
  } else {
    tags.push("not exist");
  }

  Object.entries(meal).forEach(([key, value]) => {
    if (key.includes("strIngredient") && value) {
      ingredients.push(value);
    }
  });
  const detailStr = `
  <p id="detailTitle" class="detailTitle">${meal.strMeal}</p>
  <div id="detailImg" class="detailImg" 
    style="background-image: url(${meal.strMealThumb})">
  </div>
  <div id="detailTagBox" class="detailTagBox">
    ${tags.map(tag => `<p class="tag">${tag}</p>`).join("")}
  </div>
  <p id="foodInstructions" class="foodInstructions">${meal.strInstructions}</p>
  <div id="detailIngredientsBox" class="detailIngredientsBox">
    ${ingredients
      .map(ingredient => `<div class="detailIngredient">${ingredient}</div>`)
      .join("")}
  </div>`;
  $detailBox.innerHTML = detailStr;
  enableMealDetail();
}

function drawMealList(meals) {
  // draw meal list dom
  $galleryBox.innerHTML = "";
  enableMealList();
  Array.from(meals).forEach(meal => {
    const span = document.createElement("span");
    span.textContent = meal.strMeal;
    const div = document.createElement("div");
    div.classList.add("galleryImg");
    div.style.backgroundImage = `url(${meal.strMealThumb})`;

    div.addEventListener("click", async () => {
      drawMealDetail(meal);
    });

    div.appendChild(span);
    $galleryBox.appendChild(div);
  });
}

function addEvents() {
  $searchBtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput.value) {
      const meals = await getMealListByName(searchInput.value);
      if (!meals) {
        drawMsg("There are no search results. Try again!");
      } else {
        drawMsg(`Search results for '${searchInput.value}':`);
        drawMealList(meals);
      }
    }
  });

  $randomBtn.addEventListener("click", async () => {
    const meal = await getRandomMeal();
    if (meal) {
      drawMsg(`Detail for '${meal.idMeal}':`);
      drawMealDetail(meal);
    }
  });
}

window.addEventListener("load", addEvents);
