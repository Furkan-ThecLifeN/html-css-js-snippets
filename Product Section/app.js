// API Configuration
const API_BASE_URL = "https://tasty-treats-backend.p.goit.global/api";
let currentPage = 1;
const recipesPerPage = 9;
let totalPages = 1;
let currentFilters = {
  title: "",
  time: "",
};

// DOM Elements
const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const timeDropdown = document.getElementById("timeDropdown");
const paginationContainer = document.getElementById("pagination");
const themeToggle = document.getElementById("themeToggle");
const infiniteSlider = document.querySelector(".infinite-slider");
const timeDisplay = document.getElementById("timeDisplay");

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  // Load initial recipes
  fetchRecipes();

  // Set up event listeners
  setupEventListeners();

  // Set up theme toggle
  setupThemeToggle();

  // Set up hero slider animation
  setupHeroSliderAnimation();
});

// Fetch recipes from API
async function fetchRecipes() {
  try {
    showLoading();

    // Build query parameters
    const params = new URLSearchParams({
      page: currentPage,
      limit: recipesPerPage,
    });

    // Add filters if they exist
    if (currentFilters.title) params.append("title", currentFilters.title);
    if (currentFilters.time) params.append("time", currentFilters.time);

    const response = await fetch(
      `${API_BASE_URL}/recipes?${params.toString()}`
    );
    const data = await response.json();

    // Calculate total pages
    totalPages = Math.ceil(data.total / recipesPerPage);

    // Display recipes
    displayRecipes(data.results);

    // Update pagination
    updatePagination();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML =
      '<p class="error">Failed to load recipes. Please try again later.</p>';
  } finally {
    hideLoading();
  }
}

// Display recipes in 3-column rows
function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipeContainer.innerHTML =
      '<p class="no-results">No recipes found. Try different filters.</p>';
    return;
  }

  // Split recipes into groups of 3 for each row
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

// Render star rating
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

// Set up event listeners
function setupEventListeners() {
  // Search input
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentFilters.title = searchInput.value.trim();
      currentPage = 1;
      fetchRecipes();
    }, 500);
  });

  // Time filter dropdown toggle
  document.querySelector(".filter-box.time").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("open");
    e.stopPropagation();
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", closeAllDropdowns);

  // Time filter selection
  document.querySelectorAll("#timeDropdown div").forEach((item) => {
    item.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-value");
      const filterText = this.textContent;
      applyTimeFilter(filterValue, filterText);
    });
  });
}

// Apply time filter and refresh recipes
function applyTimeFilter(value, text) {
  currentFilters.time = value;
  timeDisplay.textContent = text;
  currentPage = 1;
  fetchRecipes();
  closeAllDropdowns();
}

// Update pagination UI
function updatePagination() {
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  // Previous button
  if (currentPage > 1) {
    const prevLink = document.createElement("a");
    prevLink.href = "#";
    prevLink.className = "prev";
    prevLink.innerHTML = "&laquo;";
    prevLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage--;
      fetchRecipes();
      window.scrollTo({ top: recipeContainer.offsetTop, behavior: "smooth" });
    });
    paginationContainer.appendChild(prevLink);
  }

  // Page numbers - show limited pages around current page
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust if we're at the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // First page and ellipsis
  if (startPage > 1) {
    const firstPageLink = document.createElement("a");
    firstPageLink.href = "#";
    firstPageLink.className = "page-number";
    firstPageLink.textContent = "1";
    firstPageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = 1;
      fetchRecipes();
      window.scrollTo({ top: recipeContainer.offsetTop, behavior: "smooth" });
    });
    paginationContainer.appendChild(firstPageLink);

    if (startPage > 2) {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.style.padding = "8px 16px";
      paginationContainer.appendChild(ellipsis);
    }
  }

  // Visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.className = `page-number ${i === currentPage ? "active" : ""}`;
    pageLink.textContent = i;
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      fetchRecipes();
      window.scrollTo({ top: recipeContainer.offsetTop, behavior: "smooth" });
    });
    paginationContainer.appendChild(pageLink);
  }

  // Last page and ellipsis
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.style.padding = "8px 16px";
      paginationContainer.appendChild(ellipsis);
    }

    const lastPageLink = document.createElement("a");
    lastPageLink.href = "#";
    lastPageLink.className = "page-number";
    lastPageLink.textContent = totalPages;
    lastPageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = totalPages;
      fetchRecipes();
      window.scrollTo({ top: recipeContainer.offsetTop, behavior: "smooth" });
    });
    paginationContainer.appendChild(lastPageLink);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.className = "next";
    nextLink.innerHTML = "&raquo;";
    nextLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage++;
      fetchRecipes();
      window.scrollTo({ top: recipeContainer.offsetTop, behavior: "smooth" });
    });
    paginationContainer.appendChild(nextLink);
  }
}

// Close all filter dropdowns
function closeAllDropdowns() {
  document.querySelectorAll(".filter-box").forEach((box) => {
    box.classList.remove("open");
  });
}

// Set up theme toggle
function setupThemeToggle() {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  // Toggle theme when switch is clicked
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

// Set up hero slider animation
function setupHeroSliderAnimation() {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    infiniteSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, 5000);
}

// Show loading indicator
function showLoading() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.id = "loadingSpinner";
  recipeContainer.innerHTML = "";
  recipeContainer.appendChild(loader);
}

// Hide loading indicator
function hideLoading() {
  const loader = document.getElementById("loadingSpinner");
  if (loader) {
    loader.remove();
  }
}
