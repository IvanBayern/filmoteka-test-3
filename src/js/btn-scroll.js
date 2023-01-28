export const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('mousewheel', e => {
      e.wheelDelta < 0 ? this.hide() : this.show();
    });

    this.el.onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.hide();
      btnDown.show();
    };
  },
};

btnUp.addEventListener();

export const btnDown = {
  el: document.querySelector('.btn-bottom'),
  show() {
    this.el.classList.remove('btn-bottom_hide');
  },
  hide() {
    this.el.classList.add('btn-bottom_hide');
  },
  addEventListener() {
    window.addEventListener('mousewheel', e => {
      e.wheelDelta < 0 ? this.show() : this.hide();
    });

    this.el.onclick = () => {
      window.scrollTo({
        top: document.documentElement.offsetHeight - 80,
        left: 0,
        behavior: 'smooth',
      });
      this.hide();
      btnUp.show();
    };
  },
};

btnDown.addEventListener();
