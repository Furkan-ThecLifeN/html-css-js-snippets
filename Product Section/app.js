const API_BASE_URL = "https://tasty-treats-backend.p.goit.global/api";
let currentPage = 1; 
let currentFilters = {
  title: "",
  time: "",
};

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const timeDropdown = document.getElementById("timeDropdown");
const themeToggle = document.getElementById("themeToggle");
const infiniteSlider = document.querySelector(".infinite-slider");
const timeDisplay = document.getElementById("timeDisplay");

document.addEventListener("DOMContentLoaded", () => {
  fetchRecipes(); // Sayfa yüklendiğinde tarifleri getir
  setupEventListeners(); // Arama ve filtre olaylarını ayarla
  setupThemeToggle(); // Tema ayarlarını başlat
  setupHeroSliderAnimation(); // Slider’ı başlat
});

async function fetchRecipes() {
  try {
    showLoading(); 

    const params = new URLSearchParams({
      page: currentPage,
      limit: 100,
    });

    if (currentFilters.title) params.append("title", currentFilters.title);
    if (currentFilters.time) params.append("time", currentFilters.time);

    const response = await fetch(
      `${API_BASE_URL}/recipes?${params.toString()}`
    );
    const data = await response.json();

    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML =
      '<p class="error">Failed to load recipes. Please try again later.</p>';
  } finally {
    hideLoading(); 
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipeContainer.innerHTML =
      '<p class="no-results">No recipes found. Try different filters.</p>';
    return;
  }

  for (let i = 0; i < recipes.length; i += 3) {
    const rowRecipes = recipes.slice(i, i + 3);
    const row = document.createElement("div");
    row.className = "product-row";

    rowRecipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "food-card";
      recipeCard.style.backgroundImage = `url(${recipe.preview})`;

      recipeCard.innerHTML = `
        <div class="food-title">
          <h3>${recipe.title}</h3>
          <p>${recipe.description || "A delicious recipe to try!"}</p>
          <div class="stars-and-btn">
            <div class="stars">
              <span>${recipe.rating.toFixed(1)}</span>
              ${renderStars(recipe.rating)}
            </div>
            <button class="btn">See recipe</button>
          </div>
        </div>
      `;

      row.appendChild(recipeCard);
    });

    recipeContainer.appendChild(row);
  }
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = "";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<i class="fa-solid fa-star star"></i>';
    } else if (i === fullStars && hasHalfStar) {
      starsHTML += '<i class="fa-solid fa-star-half-alt star"></i>';
    } else {
      starsHTML += '<i class="fa-regular fa-star star"></i>';
    }
  }

  return starsHTML;
}

function setupEventListeners() {
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentFilters.title = searchInput.value.trim();
      fetchRecipes();
    }, 500);
  });

  // Zaman filtre dropdown aç/kapat
  document.querySelector(".filter-box.time").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("open");
    e.stopPropagation();
  });

  document.addEventListener("click", closeAllDropdowns);

  document.querySelectorAll("#timeDropdown div").forEach((item) => {
    item.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-value");
      const filterText = this.textContent;
      applyTimeFilter(filterValue, filterText);
    });
  });
}

// Zaman filtresini Kısmı
function applyTimeFilter(value, text) {
  currentFilters.time = value;
  timeDisplay.textContent = text;
  fetchRecipes();
  closeAllDropdowns();
}

// Tüm dropdown menüleri kapatma
function closeAllDropdowns() {
  document.querySelectorAll(".filter-box").forEach((box) => {
    box.classList.remove("open");
  });
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}

// Hero slider'ı başlat
function setupHeroSliderAnimation() {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    infiniteSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, 5000);
}

// Yükleniyor göstergesi
function showLoading() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.id = "loadingSpinner";
  recipeContainer.innerHTML = "";
  recipeContainer.appendChild(loader);
}

// Yükleniyor göstergesini gizle
function hideLoading() {
  const loader = document.getElementById("loadingSpinner");
  if (loader) {
    loader.remove();
  }
}
