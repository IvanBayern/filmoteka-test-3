import { KEY_CURRENT_ID, KEY_WATCHED, KEY_QUEUE } from './constants';
import { getStore, setStore } from './local-storage';

const dataDefault = {
  adult: false,
  backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
  genre_ids: [28, 12, 14, 878],
  id: 299536,
  original_language: 'en',
  original_title: 'Avengers: Infinity War',
  overview:
    'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
  poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  release_date: '2018-04-25',
  title: 'Avengers: Infinity War',
  video: false,
  vote_average: 8.3,
  vote_count: 6937,
  popularity: 358.799,
};

export const movieGenresIds = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function getGenre(genre_ids) {
  return genre_ids.map(id => movieGenresIds[id]).join(', ');
}

export default class ModalFilm {
  constructor(selector) {
    this.refs = this.getRefs(selector);
    this.data = dataDefault;
  }

  getRefs(selector) {
    const refs = {};

    refs.body = document.querySelector('body');
    refs.modal = document.querySelector('[data-modal]');
    refs.modalCloseBtn = document.querySelector('[data-modal-close]');
    refs.posterPath = document.querySelector('#film__poster-path');
    refs.title = document.querySelector('#film__title');
    refs.voteAverage = document.querySelector('#film__vote-average');
    refs.voteCount = document.querySelector('#film__vote-count');
    refs.popularity = document.querySelector('#film__popularity');
    refs.originalTitle = document.querySelector('#film__original-title');
    refs.genre = document.querySelector('#film__genre');
    refs.overview = document.querySelector('#film__overview');
    refs.trailer = document.querySelector('#trailer');
    refs.btnWatched = document.querySelector('.btn_watched');
    refs.btnQueue = document.querySelector('.btn_queue');

    return refs;
  }

  open() {
    this.refs.modal.classList.remove('is-hidden');
    this.refs.body.classList.add('body--modal-open');
  }

  close() {
    this.refs.modal.classList.add('is-hidden');
    this.refs.body.classList.remove('body--modal-open');
  }

  setCurrentID(id) {
    setStore(KEY_CURRENT_ID, id);
  }

  checkInStore(key) {
    try {
      const dataStore = getStore(key);
      if (!dataStore) return `add to ${key}`;
      const id = getStore(KEY_CURRENT_ID);
      return dataStore.find(data => data.id === Number(id))
        ? `remove from ${key}`
        : `add to ${key}`;
    } catch (error) {
      console.log(error.message);
    }
  }

  rerenderBtnWrapper() {
    this.refs.btnWatched.textContent = this.checkInStore(KEY_WATCHED);
    this.refs.btnQueue.textContent = this.checkInStore(KEY_QUEUE);
  }

  modifyDataFilm(dataImport = dataDefault) {
    this.data = dataImport;

    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genre_ids,
      overview,
      id,
    } = this.data;

    this.refs.posterPath.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    this.refs.posterPath.alt = `${title}`;
    this.refs.title.textContent = `${title}`;
    this.refs.voteAverage.textContent = `${vote_average}`;
    this.refs.voteCount.textContent = `${vote_count}`;
    this.refs.popularity.textContent = `${popularity}`;
    this.refs.originalTitle.textContent = `${original_title}`;
    this.refs.genre.textContent = `${getGenre(genre_ids)}`;
    this.refs.overview.textContent = `${overview}`;
    this.refs.trailer.setAttribute('data-movie-id', id);

    this.setCurrentID(id);
    this.rerenderBtnWrapper();

    if (poster_path === null) {
      this.refs.posterPath.src =
        'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    }
    if (overview === '') {
      this.refs.overview.textContent = 'No information';
    }
  }

  get dataFilm() {
    return this.data;
  }

  set dataFilm(newData) {
    this.data = newData;
  }
}
