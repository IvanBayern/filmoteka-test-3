import { setStore, getStore, removeStore } from './local-storage.js';
import ModalFilm from './modal-film.js';
import { changeStore, getFilmData } from './common.js';

const gallery = document.querySelector('.js-gallery-library');
const closeBtn = document.querySelector('[data-modal-close]');
const overlay = document.querySelector('[data-modal');
const btnWrapperRef = document.querySelector('.btn__wrapper');
// const btnWatched = document.querySelector('.btn_watched');
// const btnQueue = document.querySelector('.btn_queue');

const modalFilm = new ModalFilm();

gallery.addEventListener('click', onOpenModal);
closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);
overlay.addEventListener('click', onOverlayClose);

function onOpenModal(evt) {
  const { id, nodeName, name } = evt.target;

  evt.preventDefault();
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
  modalFilm.close();

  closeBtn.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onCloseModalEsc);

  window.location.reload();
}

function onCloseModalEsc(evt) {
  if (evt.code === 'Escape') {
    modalFilm.close();

    closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

function onOverlayClose(evt) {
  const { currentTarget, target } = evt;
  console.log(currentTarget, target);
  if (currentTarget === target) onCloseModal();
}
