var allMeals = [];
var filteredMeals = [];

var searchInput = document.getElementById("search-input");
var sortSelect = document.getElementById("sort-select");
var mealContainer = document.getElementById("meal-container");
var loading = document.getElementById("loading");

async function fetchMeals() {
  var letters = ["a", "b", "c", "d", "e"];
  allMeals = [];

  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter;

    try {
      var response = await fetch(url);
      var data = await response.json();
      if (data.meals) {
        allMeals = allMeals.concat(data.meals);
      }
    } catch (error) {
      console.error("Error fetching meals for " + letter + ":", error);
    }
  }

  filteredMeals = allMeals.slice();
  displayMeals(filteredMeals);
}

function displayMeals(meals) {
  loading.style.display = "none";
  mealContainer.innerHTML = "";

  if (meals.length === 0) {
    mealContainer.innerHTML = "<p>No meals found.</p>";
    return;
  }

  for (var i = 0; i < meals.length; i++) {
    var meal = meals[i];

    var card = document.createElement("div");
    card.className = "meal-card";

    var img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;

    var info = document.createElement("div");
    info.className = "meal-info";

    var title = document.createElement("h3");
    title.textContent = meal.strMeal;

    var category = document.createElement("p");
    category.textContent = "Category: " + meal.strCategory;

    var area = document.createElement("p");
    area.textContent = "Area: " + meal.strArea;

    info.appendChild(title);
    info.appendChild(category);
    info.appendChild(area);

    card.appendChild(img);
    card.appendChild(info);

    mealContainer.appendChild(card);
  }
}

function sortMeals() {
  var sortValue = sortSelect.value;

  if (sortValue === "name-asc") {
    filteredMeals.sort(function (a, b) {
      return a.strMeal.localeCompare(b.strMeal);
    });
  } else if (sortValue === "name-desc") {
    filteredMeals.sort(function (a, b) {
      return b.strMeal.localeCompare(a.strMeal);
    });
  } else if (sortValue === "area-asc") {
    filteredMeals.sort(function (a, b) {
      return a.strArea.localeCompare(b.strArea);
    });
  } else if (sortValue === "area-desc") {
    filteredMeals.sort(function (a, b) {
      return b.strArea.localeCompare(a.strArea);
    });
  }

  displayMeals(filteredMeals);
}

function filterMeals() {
  var query = searchInput.value.toLowerCase();

  filteredMeals = allMeals.filter(function (meal) {
    return (
      meal.strMeal.toLowerCase().includes(query) ||
      meal.strCategory.toLowerCase().includes(query)
    );
  });

  sortMeals();
}
searchInput.addEventListener("input", filterMeals);
sortSelect.addEventListener("change", sortMeals);

fetchMeals();
