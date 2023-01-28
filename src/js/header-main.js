import axios from 'axios';

import { API, KEY, TRENDING, MEDIA_TYPE, TIME_WINDOW } from './constants.js';
import spinnerToggle from './spinner.js';
import { renderPagination, renderFilmCards, goUp } from './common.js';

const galleryRef = document.querySelector('.js-gallery');
const pagRef = document.querySelector('.js-pagination');
const warningRef = document.querySelector('.header__warning');
const inputRef = document.querySelector('.header__input');
const formRef = document.querySelector('.header__form');

let currentQuery = '';
let currentPage = 1;
// 1 - do popular, 0 - do search
let currentProcess = 1;

export function showMessage(message) {
  warningRef.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">${message}</div>`
  );

  setTimeout(() => {
    warningRef.innerHTML = '';
  }, 4000);
}

async function getAPIData(page, process) {
  try {
    let searchPath = '';
    if (process) {
      searchPath = `${API}${TRENDING}/${MEDIA_TYPE}/${TIME_WINDOW}?`;
      searchPath += new URLSearchParams({
        api_key: KEY,
        page,
        include_adult: false,
      });
    } else {
      searchPath = `${API}/search/${MEDIA_TYPE}?`;
      searchPath += new URLSearchParams({
        api_key: KEY,
        language: 'en-US',
        query: inputRef.value.trim().toLowerCase(),
        page,
        include_adult: false,
      });
    }

    const response = await axios.get(searchPath);

    if (response.status !== 200) {
      throw new Error('Service is temporarily unavailable.');
    }

    return response.data;
  } catch (error) {
    showMessage(error.message);
  }
}

function processingAPIData(pageAPI, process) {
  spinnerToggle();
  setTimeout(
    () =>
      getAPIData(pageAPI, process)
        .then(({ page, results, total_pages: pages }) => {
          renderFilmCards(results, galleryRef);
          renderPagination(page, pages, pagRef);
          if (!pages)
            throw new Error(
              `Search result "${currentQuery}" not successful. Enter an another movie name.`
            );
        })
        .catch(error => showMessage(error.message))
        .finally(spinnerToggle()),
    200
  );
}

window.addEventListener('load', () => {
  processingAPIData(currentPage, currentProcess);
});

pagRef.addEventListener('click', onClickPagination);

function onClickPagination(evt) {
  const target = evt.target;

  if (target.textContent === '...' || target.tagName !== 'LI') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);

  processingAPIData(currentPage, currentProcess);

  goUp();
}

formRef.addEventListener('submit', evt => {
  currentProcess = 0;
  currentPage = 1;

  evt.preventDefault();
  currentQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (!currentQuery) {
    const message = 'Search query is empty. Rendering the popular movies.';

    showMessage(message);
    galleryRef.innerHTML = '';
    currentProcess = 1;
  }

  processingAPIData(currentPage, currentProcess);
});

inputRef.addEventListener('input', evt => {
  const query = evt.target;
  const inputBtnClearRef = document.querySelector('.header__btn-clear');

  if (query.value.length) {
    inputBtnClearRef.classList.remove('hidden');
  } else {
    inputBtnClearRef.classList.add('hidden');
    inputBtnClearRef.removeEventListener('click', onClearInput);
  }

  inputBtnClearRef.addEventListener('click', onClearInput);

  function onClearInput() {
    query.value = '';
    inputBtnClearRef.classList.add('hidden');
    inputBtnClearRef.removeEventListener('click', onClearInput);
  }
});
