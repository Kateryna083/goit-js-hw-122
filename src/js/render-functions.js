import iziToast from 'izitoast';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очистка попередніх результатів

  if (images.length === 0) {
    displayMessage(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const lightbox = new SimpleLightbox('.gallery a');

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="card-info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    `;

    gallery.appendChild(card);
  });

  lightbox.refresh(); // Оновлення SimpleLightbox після додавання нових зображень
}

export function displayMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topCenter',
  });
}
