const mobileMenu = document.querySelector(".js-menu-container");
const openMenuBtn = document.querySelector(".js-open-menu");
const closeMenuBtn = document.querySelector(".js-close-menu");

const toggleMenu = () => {
  const isOpen = mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open");
  openMenuBtn.setAttribute("aria-expanded", !isOpen);

  const scrollMethod = !isOpen
    ? bodyScrollLock.disableBodyScroll
    : bodyScrollLock.enableBodyScroll;
  scrollMethod(document.body);
};

 openMenuBtn.addEventListener("click", toggleMenu);
 closeMenuBtn.addEventListener("click", toggleMenu);

const mediaQuery = window.matchMedia("(min-width: 768px)");

function handleScreenResize(event) {
  if (event.matches) {
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", "false");
    bodyScrollLock.enableBodyScroll(document.body);
  }
}

mediaQuery.addEventListener("change", handleScreenResize);
