import { fetchImages } from './js/pixabay-api.js';
import { renderImages, displayMessage } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    displayMessage('Please enter a search term.');
    return;
  }

  loader.classList.add('visible'); // Відображення індикатора завантаження

  try {
    const images = await fetchImages(searchTerm);
    renderImages(images);
  } catch (error) {
    displayMessage('Failed to fetch images. Please try again.');
  } finally {
    loader.classList.remove('visible'); // Приховання індикатора завантаження
  }
});
