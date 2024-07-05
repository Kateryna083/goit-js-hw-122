export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

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
}

export function displayMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topCenter',
  });
}
