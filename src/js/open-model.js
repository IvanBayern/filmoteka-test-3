import { getStore, setStore, removeStore } from './local-storage.js';
import ModalFilm from './modal-film';
import {
  handleBackButtonClick,
  trailerButtonRef,
  handleTrailerButtonClick,
} from './trailer';
import { changeStore, getFilmData } from './common.js';

const gallery = document.querySelector('.js-gallery');
const closeBtn = document.querySelector('[data-modal-close]');
const btnWrapperRef = document.querySelector('.btn__wrapper');
// const btnWatched = document.querySelector('.btn_watched');
// const btnQueue = document.querySelector('.btn_queue');

const modalFilm = new ModalFilm();

gallery.addEventListener('click', onOpenModal);
closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);

function onOverlayClose(event) {
  if (!event.target.closest('.modal') && event.target.closest('.backdrop')) {
    onCloseModal();
  }
}
document.addEventListener('click', onOverlayClose);

function onOpenModal(evt) {
  const { id, nodeName, name } = evt.target;
  evt.preventDefault();
  trailerButtonRef.addEventListener('click', handleTrailerButtonClick);

  if (nodeName !== 'IMG') return;

  const dataCurrentFilm = getFilmData(id);

  modalFilm.modifyDataFilm(dataCurrentFilm);
  modalFilm.open();

  btnWrapperRef.addEventListener('click', onBtnClick);
}

function onBtnClick(evt) {
  const { nodeName, name: key } = evt.target;
  if (nodeName !== 'BUTTON') return;
  changeStore(key);
  modalFilm.rerenderBtnWrapper();
}

closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);

function onCloseModal() {
  const iframeContainer = document.querySelector('.iframe-container');
  const trailerContainer = document.querySelector('.film__info-wrapper');

  handleBackButtonClick(iframeContainer, trailerContainer);

  modalFilm.close();

  closeBtn.removeEventListener('click', onCloseModal);
  trailerButtonRef.removeEventListener('click', handleTrailerButtonClick);
  window.removeEventListener('keydown', onCloseModalEsc);
}

function onCloseModalEsc(evt) {
  if (evt.code === 'Escape') {
    modalFilm.close();

    closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

////////////// checks for button /////////////////

function checkWatchedStorage(currentFilm) {
  try {
    const getWatchedFromStorage = localStorage.getItem('WatchedMovies');
    const getWatchedArray = JSON.parse(getWatchedFromStorage);
    const checkWatchedStorage = getWatchedArray.find(
      option => option.id === currentFilm.id
    );
    if (checkWatchedStorage) {
      btnWatched.classList.replace('watched_send', 'watched_remove');
      btnWatched.textContent = 'REMOVE FROM WATCHED';
    } else {
      btnWatched.classList.replace('watched_remove', 'watched_send');
      btnWatched.textContent = 'ADD TO WATCHED';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    btnWatched.classList.replace('watched_remove', 'watched_send');
  }
}

function checkQueueStorage(currentFilm) {
  try {
    const getQueueFromStorage = localStorage.getItem('QueueMovies');
    const getQueueArray = JSON.parse(getQueueFromStorage);
    const checkQueueStorage = getQueueArray.find(
      option => option.id === currentFilm.id
    );
    if (checkQueueStorage) {
      btnQueue.classList.replace('queue_send', 'queue_remove');
      btnQueue.textContent = 'REMOVE FROM QUEUE';
    } else {
      btnQueue.classList.replace('queue_remove', 'queue_send');
      btnQueue.textContent = 'ADD TO QUEUE';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    btnQueue.classList.replace('queue_remove', 'queue_send');
  }
}
