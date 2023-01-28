import { getStore, setStore, removeStore } from './local-storage.js';
import ModalFilm from './modal-film';



const btnWrapperRef = document.querySelector('.btn__wrapper');
// const btnWatched = document.querySelector('.btn_watched');
// const btnQueue = document.querySelector('.btn_queue');




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
