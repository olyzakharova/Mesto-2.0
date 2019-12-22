/* eslint-disable import/prefer-default-export */
export class Popup {
  constructor(element) {
    this.element = element;
    const closeButton = this.element.querySelector('.popup__close');
    closeButton.addEventListener('click', this.close);
  }

  get asElement() {
    return this.element;
  }

  open = () => {
    this.element.classList.add('popup_is-opened');
  }

  close = () => {
    this.element.classList.remove('popup_is-opened');
  }
}
