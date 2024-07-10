// main.js

import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', handleSearch);

function handleSearch(evt) {
  evt.preventDefault();
  currentPage = 1; // Скидаємо сторінку до початкового значення при новому пошуку
  currentQuery = evt.currentTarget.elements.query.value.trim().toLowerCase();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  fetchImages(currentQuery, currentPage);
}

async function fetchImages(query, page) {
  try {
    loader.style.display = 'block'; // Показати індикатор завантаження

    const data = await getPicturesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Nothing found for your request.',
        position: 'topRight',
        timeout: 2000,
      });
      clearGallery();
      return;
    }

    renderImgCard(data.hits); // Відобразити отримані зображення

    // Показати кнопку "Load more" після першого завантаження зображень
    loadMoreBtn.style.display = 'block';

    // Перевірити, чи потрібно ховати кнопку "Load more" після першого завантаження
    checkLoadMoreVisibility(data.totalHits, page);
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    loader.style.display = 'none'; // Ховаємо індикатор завантаження незалежно від результату
  }
}

function clearGallery() {
  gallery.innerHTML = ''; // Очистити галерею в разі пустого результату пошуку
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load more" при пустому результаті
}

function checkLoadMoreVisibility(totalHits, page) {
  const perPage = 15; // Кількість зображень на сторінці

  // Перевірка, чи досягнуто кінця колекції зображень
  if (page * perPage >= totalHits) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 2000,
    });
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
  currentPage++;
  await fetchImages(currentQuery, currentPage);

  // Плавне прокручування сторінки після завантаження нових зображень
  smoothScroll();
}

function smoothScroll() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
