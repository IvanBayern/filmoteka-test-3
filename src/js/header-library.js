import { renderPagination, renderFilmCards, goUp } from './common.js';
import { getStore } from './local-storage.js';




const KEY_WATCHED = 'watched';

const KEY_QUEUE = 'queue';

// треба додати кнопкам в library name="watched" and name="queue" так lass active на queue






const PER_PAGE = 6;

let allData = [];
let currentPage = 1;

const queueRef = document.querySelector('.btn__queue');
const watchedRef = document.querySelector('.btn__watched');
const listRef = document.querySelector('.my__library-container');



const galleryLibrary = document.querySelector('.js-gallery-library');

// в library треба додати в body
// <ul class="film-card-list js-gallery-library">
//       <!-- Render Data expected -->
//     </ul>

window.addEventListener('load', () => {
  queueRef.click();
});

listRef.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  const { name: key, tagName } = evt.target;

  if (tagName !== 'BUTTON') return;

  switch (key) {
    case KEY_QUEUE:
      queueRef.classList.add('active');
      watchedRef.classList.remove('active');
      break;
    case KEY_WATCHED:
      watchedRef.classList.add('active');
      queueRef.classList.remove('active');
      break;
  }

  emptyRef.classList.add('is-hidden');

  allData = [...paginateAllData(key)];

  console.log('In header-library: ', allData);

  if (!allData.length) {
    clearGallery();
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = 'Your film list is empty.';
    return;
  }
  currentPage = 1;

  try {
    console.log(allData);

    renderFilmCards(allData[currentPage - 1], galleryLibrary);
    renderPagination(currentPage, allData.length, pagLibraryRef);
  } catch (error) {
    clearGallery();
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = 'Something went wrong.';
  }
}

function clearGallery() {
  galleryLibrary.innerHTML = '';
  pagLibraryRef.innerHTML = '';
}

// function paginateAllData(key) {
//   try {
//     let filmStorage = getStore(key);

//     if (!filmStorage.length) return filmStorage;

//     const allStorageDataByPages = [];
//     for (let i = 0; i < filmStorage.length; i += PER_PAGE) {
//       let end =
//         i + PER_PAGE < filmStorage.length ? i + PER_PAGE : filmStorage.length;
//       allStorageDataByPages.push(filmStorage.slice(i, end));
//     }
//     console.log('allStorageDataByPages: ', allStorageDataByPages);
//     return allStorageDataByPages;
//   } catch (error) {
//     return [];
//   }
// }


