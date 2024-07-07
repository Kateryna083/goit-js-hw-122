import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (!queryValue) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }


  getPicturesByQuery(queryValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Warning',
          message: 'Nothing found for your request.',
          position: 'topRight',
          timeout: 2000,
        });
      } else {
        renderImgCard(data.hits);
      }
    })
    .catch(onFetchError)
    .finally(() => 
      form.reset());
}

function onFetchError(err) {
  console.error('Fetch Error:', err);
}

// function getPicturesByQuery(query) {
//   const API_KEY = '44784729-ebc9a0f5cc587c2700d41657d';
//   const imageType = 'photo';
//   const orientation = 'horizontal';
//   const safeSearch = true;

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;

//   return fetch(url).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }

//     return res.json();
//   });
// }

// function renderImgCard(images) {
//   galleryList.innerHTML = '';
//   const murkup = images
//     .map(
//       ({ largeImageURL, webformatURL, likes, views, comments, downloads }) =>
//         `
//                 <li class="gallery-item">
//                     <a href="${largeImageURL}">
//                         <img src="${webformatURL}" alt="" class="card-img"/>
//                     </a>
//                     <ul class="galery-item-description">
//                         <li>
//                             <p class="count-text">Likes</p>
//                             <p class="count">${likes}</p>
//                         </li>
//                         <li>
//                             <p class="count-text">Views</p>
//                             <p class="count">${views}</p>
//                         </li>
//                         <li>
//                             <p class="count-text">Comments</p>
//                             <p class="count">${comments}</p>
//                         </li>
//                         <li>
//                             <p class="count-text">Downloads</p>
//                             <p class="count">${downloads}</p>
//                         </li>
//                     </ul>
//                 </li>
//                 `
//     )
//     .join('');
//   galleryList.insertAdjacentHTML('afterbegin', murkup);

//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
// }
