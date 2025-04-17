// app.js
import { fetchPhotos } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const gallery = document.getElementById("gallery");
  const loadMore = document.getElementById("load-more");

  let currentQuery = "";
  let currentPage = 1;
  const PER_PAGE = 12;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentQuery = input.value.trim() || "wallpaper";
    currentPage = 1;
    gallery.innerHTML = "";
    await loadAndRender();
  });

  loadMore.addEventListener("click", async () => {
    currentPage++;
    await loadAndRender();
  });

  currentQuery = "wallpaper";
  loadAndRender();

  async function loadAndRender() {
    loadMore.disabled = true;
    const photos = await fetchPhotos(currentQuery, PER_PAGE, currentPage);
    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="img-wrap">
          <img src="${photo.src.medium}" alt="${photo.alt || ""}">
        </div>
        <div class="card-content">
          <h3>${photo.alt || "Untitled"}</h3>
          <p>By: ${photo.photographer}</p>
          <a href="${
            photo.url
          }" target="_blank" rel="noopener">View on Pexels</a>
        </div>
      `;
      gallery.appendChild(card);
    });
    loadMore.disabled = false;
    loadMore.style.display = photos.length ? "block" : "none";
  }
});
