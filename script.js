/*const request = async function () {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/complexSearch?query=fish&apiKey=4f717214a3364dfdb0042f479169f170"
  );
  const data = await res.json();
  console.log(data);

  /* Richiesta per informazioni nutrizionali

const nutritionRes = await fetch(
  "https://api.spoonacular.com/recipes/642941/nutritionWidget.json?apiKey=4f717214a3364dfdb0042f479169f170"
);

const nutrition = await nutritionRes.json();
console.log(nutrition);

/* Richiesta per ingredienti 

  const  ingRes = await fetch(
    "https://api.spoonacular.com/recipes/1003464/ingredientWidget.json"
  );

  const ing = await ingRes.json();
  console.log(ing);
};*/

const requestMeal = async function () {
  const res = await fetch(
    "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=43.7&lon=11.2&appid=13f160d255bb357f3c1624f666e4e52c"
  );
  const data = await res.json();
  console.log(data);
};

/** API Weather key: 13f160d255bb357f3c1624f666e4e52c */

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const inputQuery = document.querySelector(".input-query");
const buttonQuery = document.querySelector(".button-query");
const searchContainer = document.querySelector(".search-container");
const contents = document.querySelectorAll(".content");
const recipeDetails = document.querySelector(".recipe-details");
const recipePicture = document.querySelector(".recipe-picture");
const recipePictureContainer = document.querySelector(
  ".recipe-picture-container"
);
const recipeButtons = document.querySelectorAll(".recipe-button");
const ingredientsList = document.querySelector(".ingredients-list");
const stepList = document.querySelector(".step-list");
const nutritionList = document.querySelector(".nutrition-list");

console.log(buttonQuery);

let search = [];
let images = [];

/* Ricercare lista di ricette in base a una parola */

const requestSpoon = async function () {
  try {
    images = [];
    const query = inputQuery.value;
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=4f717214a3364dfdb0042f479169f170`
    );
    const data = await res.json();
    search = data.results;
    console.log(data);
    console.log(search);
    searchContainer.innerHTML = "";
    search.forEach((recipe) =>
      searchContainer.insertAdjacentHTML(
        "beforeend",
        `<a class="recipe" href="#${recipe.id}">
          <img
            class="recipe-miniature"
            src="${recipe.image}"
          />
          <h2 class="recipe-title">
            ${recipe.title}
          </h2>
        </a>`
      )
    );
    console.log(search);
    search.forEach((recipe) => images.push([recipe.id, recipe.image]));
    console.log(images);
  } catch (err) {
    alert(`Something went wrong: ${err}`);
  }
};

buttonQuery.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log("ok");
  console.log(inputQuery.value);
  requestSpoon();
});

/* Visualizzazione delle informazioni di una ricetta (ingredienti, istruzioni, informazioni nutrizionali), quando ci si clicca sopra */

["hashchange"].forEach((ev) =>
  window.addEventListener(ev, async function () {
    try {
      const id = window.location.hash.slice(1);
      const searched = document.querySelector(`a[href='#${id}']`);
      const recipes = document.querySelectorAll(".recipe");
      console.log(recipes);
      recipes.forEach((rec) => (rec.style.backgroundColor = "#61a5c2"));
      searched.style.backgroundColor = "#eee";
      const imgArr = images.find((el) => el[0] === +id);

      recipePictureContainer.innerHTML = "";
      recipePictureContainer.insertAdjacentHTML(
        "afterbegin",
        `<img class="recipe-miniature"
            src="${imgArr[1]}"/>`
      );

      const res1 = await fetch(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=4f717214a3364dfdb0042f479169f170`
      );
      const data1 = await res1.json();
      const ingredients = data1.ingredients;

      ingredientsList.innerHTML = "";
      ingredients.forEach((ingr) =>
        ingredientsList.insertAdjacentHTML(
          "afterbegin",
          `<li class="ingredient">
                <svg
                  class="ingredient-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M231.81,32.19a28,28,0,0,0-39.67.07L18.27,210.6A8,8,0,0,0,22.2,224a154.93,154.93,0,0,0,35,4c33.42,0,66.88-10.88,98.33-32.21,31.75-21.53,50.15-45.85,50.92-46.88a8,8,0,0,0-.74-10.46l-18.74-18.76,45-48A28.08,28.08,0,0,0,231.81,32.19ZM189.22,144.63a225.51,225.51,0,0,1-43.11,38.18c-34.47,23.25-70,32.7-105.84,28.16l106.3-109ZM220.5,60.5l-.18.19-44.71,47.67L157.74,90.47l45.78-47a12,12,0,0,1,17,17Z"
                  ></path></svg
                ><span class='ingredient-name'>${ingr.name}</span>: ${ingr.amount.metric.value} ${ingr.amount.metric.unit}
              </li>`
        )
      );
      const res2 = await fetch(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=4f717214a3364dfdb0042f479169f170`
      );
      const data2 = await res2.json();

      const steps = data2[0].steps;
      stepList.innerHTML = "";
      steps.forEach((st, i) =>
        stepList.insertAdjacentHTML(
          "beforeend",
          `<li class="step-description">
                <span class="step">Step ${i + 1}</span> : ${st.step}
              </li>`
        )
      );
      const res3 = await fetch(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=4f717214a3364dfdb0042f479169f170`
      );
      const data3 = await res3.json();
      const nutrients = data3.nutrients;
      const protein = data3.caloricBreakdown.percentProtein;
      const fat = data3.caloricBreakdown.percentFat;
      const carbs = data3.caloricBreakdown.percentCarbs;
      const properties = data3.properties;
      nutritionList.innerHTML = "";
      nutrients.forEach((nut) =>
        nutritionList.insertAdjacentHTML(
          "beforeend",
          `<li class="nutrition-item">
                <svg
                  class="nutrition-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"
                  ></path>
                </svg>
                <span class="nutrition-span">${nut.name}</span>: ${nut.amount} ${nut.unit},
                <span class="nutrition-span">Percent of daily needs</span>:
                ${nut.percentOfDailyNeeds}
              </li>`
        )
      );
      properties.forEach((prop) =>
        nutritionList.insertAdjacentHTML(
          "beforeend",
          `<li class="nutrition-item">
                <svg
                  class="nutrition-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"
                  ></path>
                </svg>
                <span class="nutrition-span">${prop.name}</span>: ${prop.amount}${prop.unit}
              </li>`
        )
      );
      nutritionList.insertAdjacentHTML(
        "beforeend",
        `<li class="nutrition-item">
                <svg
                  class="nutrition-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"
                  ></path>
                </svg>
                <span class="nutrition-span">Percent protein</span>: ${protein}
              </li>
              <li class="nutrition-item">
                <svg
                  class="nutrition-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"
                  ></path>
                </svg>
                <span class="nutrition-span">Percent fat</span>: ${fat}
                
              </li><li class="nutrition-item">
                <svg
                  class="nutrition-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85ZM128,216a72.08,72.08,0,0,1-72-72c0-22,8.09-44.79,24.06-67.84l26.37,25.58a8,8,0,0,0,13.09-3l22.27-61.07C164.21,58.08,200,97.91,200,144A72.08,72.08,0,0,1,128,216Z"
                  ></path>
                </svg>
                <span class="nutrition-span">Percent carbs</span>: ${carbs}
                
              </li>`
      );
    } catch (err) {
      alert(err);
    }
  })
);

/* Richiesta per informazioni nutrizionali*/
/* 
  const nutritionRes = await fetch(
    "https://api.spoonacular.com/recipes/642941/nutritionWidget.json?apiKey=4f717214a3364dfdb0042f479169f170"
  );

  const nutrition = await nutritionRes.json();
  console.log(nutrition);

  /* Richiesta per ingredienti */

/*const ingRes = await fetch(
    "https://api.spoonacular.com/recipes/1003464/ingredientWidget.json"
  );

  const ing = await ingRes.json();
  console.log(ing);
};*/

/* Swichin between ingredients, instructions, nutrition tabs*/

recipeButtons.forEach((btn) =>
  btn.addEventListener("click", function () {
    console.log(this.getAttribute("open"));
    contents.forEach((cntent) => cntent.classList.add("hidden"));
    const open = document.querySelector(
      `.content[content=${this.getAttribute("open")}]`
    );
    open.classList.remove("hidden");
  })
);

/* Smooth srolling to the calculator */

const calculatorLink = document.querySelector(".to-calories");
const calculator = document.querySelector(".calculator");

calculatorLink.addEventListener("click", function (e) {
  e.preventDefault();

  calculator.scrollIntoView({ behavior: "smooth" });
});

/* Burning calories calculator */

const inputCalories = document.querySelector(".calories");
const inputWeight = document.querySelector(".weight");
const data = document.querySelector(".data");
const answerList = document.querySelector(".answer-list");

data.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(answerList);
  answerList.innerHTML = "";
  const calories = +inputCalories.value.replace(",", ".");
  const weight = +inputWeight.value;

  if (!(calories > 0) || !(weight > 0) || isNaN(calories) || isNaN(weight))
    alert("Insert valid values for calories and weight!");
  const walking = Math.ceil((calories * 200) / (2 * 3.5 * weight));
  const running = Math.ceil((calories * 200) / (8 * 3.5 * weight));
  const bicycling = Math.ceil((calories * 200) / (8 * 3.5 * weight));
  const swimming = Math.ceil((calories * 200) / (7 * 3.5 * weight));
  const weightLifting = Math.ceil((calories * 200) / (6 * 3.5 * weight));

  answerList.insertAdjacentHTML(
    "afterbegin",
    `<li class="answer item">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M152,80a32,32,0,1,0-32-32A32,32,0,0,0,152,80Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,32Zm64,112a8,8,0,0,1-8,8c-35.31,0-52.95-17.81-67.12-32.12-2.74-2.77-5.36-5.4-8-7.84l-13.43,30.88,37.2,26.57A8,8,0,0,1,160,176v56a8,8,0,0,1-16,0V180.12l-31.07-22.2L79.34,235.19A8,8,0,0,1,72,240a7.84,7.84,0,0,1-3.19-.67,8,8,0,0,1-4.15-10.52l54.08-124.37c-9.31-1.65-20.92,1.2-34.7,8.58a163.88,163.88,0,0,0-30.57,21.77,8,8,0,0,1-10.95-11.66c2.5-2.35,61.69-57.23,98.72-25.08,3.83,3.32,7.48,7,11,10.57C166.19,122.7,179.36,136,208,136A8,8,0,0,1,216,144Z"
              ></path>
            </svg>
            Walking (ca. 3 km/h) for ${walking} minutes (ca. ${Math.round(
      walking / 60
    )} hrs.)
          </li>
          <li class="answer item">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.58,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.35,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z"
              ></path>
            </svg>
            Running (ca. 8km/h) for ${running} minutes (ca. ${Math.round(
      running / 60
    )} hrs.)
          </li>
          <li class="answer item">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M208,112a47.81,47.81,0,0,0-16.93,3.09L165.93,72H192a8,8,0,0,1,8,8,8,8,0,0,0,16,0,24,24,0,0,0-24-24H152a8,8,0,0,0-6.91,12l11.65,20H99.26L82.91,60A8,8,0,0,0,76,56H48a8,8,0,0,0,0,16H71.41L85.12,95.51,69.41,117.06a48.13,48.13,0,1,0,12.92,9.44l11.59-15.9L125.09,164A8,8,0,1,0,138.91,156l-30.32-52h57.48l11.19,19.17A48,48,0,1,0,208,112ZM80,160a32,32,0,1,1-20.21-29.74l-18.25,25a8,8,0,1,0,12.92,9.42l18.25-25A31.88,31.88,0,0,1,80,160Zm128,32a32,32,0,0,1-22.51-54.72L201.09,164A8,8,0,1,0,214.91,156L199.3,129.21A32,32,0,1,1,208,192Z"
              ></path>
            </svg>
            Bicycling (ca. 16 km/h) for ${bicycling} minutes (ca. ${Math.round(
      bicycling / 60
    )} hrs.)
          </li>
          <li class="answer item">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M88,149.39a8,8,0,0,0,8-8V128h64v15.29a8,8,0,0,0,16,0V32a8,8,0,0,0-16,0V48H96V32a8,8,0,0,0-16,0V141.39A8,8,0,0,0,88,149.39ZM96,112V96h64v16Zm64-48V80H96V64ZM24,168a8,8,0,0,1,8-8c14.42,0,22.19,5.18,28.44,9.34C66,173.06,70.42,176,80,176s14-2.94,19.56-6.66c6.24-4.16,14-9.34,28.43-9.34s22.2,5.18,28.44,9.34c5.58,3.72,10,6.66,19.57,6.66s14-2.94,19.56-6.66c6.25-4.16,14-9.34,28.44-9.34a8,8,0,0,1,0,16c-9.58,0-14,2.94-19.56,6.66-6.25,4.16-14,9.34-28.44,9.34s-22.2-5.18-28.44-9.34C142,178.94,137.57,176,128,176s-14,2.94-19.56,6.66c-6.24,4.16-14,9.34-28.43,9.34s-22.19-5.18-28.44-9.34C46,178.94,41.58,176,32,176A8,8,0,0,1,24,168Zm208,40a8,8,0,0,1-8,8c-9.58,0-14,2.94-19.56,6.66-6.25,4.16-14,9.34-28.44,9.34s-22.2-5.18-28.44-9.34C142,218.94,137.57,216,128,216s-14,2.94-19.56,6.66c-6.24,4.16-14,9.34-28.43,9.34s-22.19-5.18-28.44-9.34C46,218.94,41.58,216,32,216a8,8,0,0,1,0-16c14.42,0,22.19,5.18,28.44,9.34C66,213.06,70.42,216,80,216s14-2.94,19.56-6.66c6.24-4.16,14-9.34,28.43-9.34s22.2,5.18,28.44,9.34c5.58,3.72,10,6.66,19.57,6.66s14-2.94,19.56-6.66c6.25-4.16,14-9.34,28.44-9.34A8,8,0,0,1,232,208Z"
              ></path>
            </svg>
            Swimming laps for ${swimming} minutes (ca. ${Math.round(
      swimming / 60
    )} hrs.)
          </li>
          <li class="answer item">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z"
              ></path>
            </svg>
            Weight lifting for ${weightLifting} minutes (ca. ${Math.round(
      weightLifting / 60
    )} hrs.)
          </li>`
  );
});
