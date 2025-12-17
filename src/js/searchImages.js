import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53734660-27d678c11e0bffdf5dc1da34e';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function fetchImages(searchQuery) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('Pixabay API error');
    }
    return response.json();
  });
}

function createGalleryMarkup(images = []) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
      </li>
    `
    )
    .join('');
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.search.value.trim();
  if (!query) return;

  gallery.innerHTML = '';
  showLoader();

  fetchImages(query)
    .then(data => {
      hideLoader();
      if (!query) {
        iziToast.error({
          title: 'Oops!',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const markup = createGalleryMarkup(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
    })
    .catch(error => {
      hideLoader();
      console.error(error);
    });
});
