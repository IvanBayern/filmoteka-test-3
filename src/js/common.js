import { setStore, getStore, removeStore } from './local-storage.js';
import { getGenre } from './modal-film';


import {
 
  FILM_CURRENT_PAGE,
  KEY_QUEUE,
  KEY_WATCHED,
  FILM_CURRENT_PAGE,
  KEY_CURRENT_ID,
} from './constants.js';







// ref = where need to render
export function renderFilmCards(data, ref) {
  ref.innerHTML = '';
  let markup = data
    .map(({ id, poster_path, genre_ids, title, release_date }) => {
      let genresStr = getGenre(genre_ids);
      let year = !release_date ? '' : release_date.substring(0, 4);
      if (genresStr && year) genresStr += ' | ';
      if (!title) title = 'no information';

      let smallImg = !!poster_path
        ? IMG_PATH + SMALL_SIZE + poster_path
        : NO_IMAGE;

      return `
      <li class="film-card">
         	<a href="#" class="film-card__link">
            <img
              class="film-card__film-img"
              src="${smallImg}"
              alt="${title}"
              id="${id}"
            />
            <h3 class="film-card__film-name">${title}</h3>
            <p class="film-card__genre">${genresStr}${year}</p>
          </a>
        </li>
							`;
    })
    .join('');

  ref.innerHTML = markup;

  //

  setStore(FILM_CURRENT_PAGE, [...data]);
  //
}

export function getFilmData(filmId) {
  let filmList = [];

  let fromStore = getStore(KEY_QUEUE);
  if (fromStore) filmList = [...fromStore];

  fromStore = getStore(KEY_WATCHED);
  if (fromStore) filmList = [...filmList, ...fromStore];

  fromStore = getStore(FILM_CURRENT_PAGE);
  if (fromStore) filmList = [...filmList, ...fromStore];

  return filmList.find(film => film.id === Number(filmId));
}

export function changeStore(key) {
  try {
    const dataStore = getStore(key);

    console.log(dataStore, getStore(KEY_CURRENT_ID));
    const currentId = getStore(KEY_CURRENT_ID);
    const idx = dataStore.findIndex(({ id }) => id === currentId);

    console.log('Index: ', idx);

    if (idx === -1) {
      dataStore.push(getFilmData(currentId));
    } else {
      dataStore.splice(idx, 1);
    }

    dataStore[0] ? setStore(key, dataStore) : removeStore(key);
  } catch (error) {
    console.log(error.message);
  }
}
