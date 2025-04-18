const API_KEY = "anfwA5w0NtCGuIghyfe2zVZY7I1U50QsHNo2iQ6n1GCK4QwQjHmOCJQP";
const BASE_URL = "https://api.pexels.com/v1/search";

/**
 * Pexels’ten fotoğraf listesi çeker
 * @param {string} query    Arama terimi (örn: 'wallpaper')
 * @param {number} perPage  Sayfa başına fotoğraf adedi (max 80)
 * @param {number} page     Sayfa numarası
 * @returns {Promise<Array>} Fotoğraf objelerinden oluşan dizi
 */

export async function fetchPhotos(query, perPage = 15, page = 1) {
  const url = `${BASE_URL}?query=${encodeURIComponent(
    query
  )}&per_page=${perPage}&page=${page}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: API_KEY },
    });
    const { photos } = await res.json();
    return photos;
  } catch (err) {
    console.error("Fotoğraf çekerken hata oluştu:", err);
    alert("Fotoğraf çekerken hata oluştu:", err);
    return [];
  }
}
