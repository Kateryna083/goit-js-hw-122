import iziToast from 'iziToast';
import 'iziToast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderImages,
  displayMessage,
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = document.querySelector('#search-input');
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    displayMessage('Please enter a search term');
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchTerm);

    if (images.length === 0) {
      displayMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(images);
      lightbox.refresh();
    }
  } catch (error) {
    displayMessage('Failed to fetch images. Please try again later.');
  } finally {
    loader.style.display = 'none';
  }
});
