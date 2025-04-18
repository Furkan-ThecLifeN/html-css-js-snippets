/* Nav JS */

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.body.classList = theme;
  localStorage.setItem("theme", theme);
  themeToggle.checked = theme === "dark";
}

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  setTheme(newTheme);
});

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

/* Slider JS */

const slider = document.querySelector(".infinite-slider");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
const totalSlides = slides.length;

function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

setInterval(moveToNextSlide, 5000); 
