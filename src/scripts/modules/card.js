/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { popupBigImage } from '../index';

export class Card {
  constructor(name, link) {
    this.card = this.createCard(name, link);
  }

  createCard(name, link) {
    this.placeCard = document.createElement('div');
    this.likeIcon = document.createElement('button');
    this.cardImage = document.createElement('div');
    this.deleteIcon = document.createElement('button');
    const cardDesc = document.createElement('div');
    const cardName = document.createElement('h3');

    this.placeCard.classList.add('place-card');
    this.likeIcon.classList.add('place-card__like-icon');

    this.cardImage.classList.add('place-card__image');
    this.deleteIcon.classList.add('place-card__delete-icon');
    cardDesc.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    this.cardImage.setAttribute('imageURL', link);
    this.cardImage.style.backgroundImage = `url(${link})`;
    this.cardImage.appendChild(this.deleteIcon);
    cardName.textContent = name;
    cardDesc.appendChild(cardName);
    cardDesc.appendChild(this.likeIcon);

    this.placeCard.appendChild(this.cardImage);
    this.placeCard.appendChild(cardDesc);
  }

  addListeners() {
    this.likeIcon.addEventListener('click', this.like);
    this.deleteIcon.addEventListener('click', this.remove);
    this.cardImage.addEventListener('click', this.open);
  }

  get asElement() {
    return this.placeCard;
  }

  get asObject() {
    return { name: this.name, link: this.link };
  }

  // удаление карточки по нажатию
  remove = (event) => {
    event.stopPropagation();
    this.placeCard.parentNode.removeChild(this.placeCard);
  }

  // лайк на карточку
  like = () => {
    this.likeIcon.classList.toggle('place-card__like-icon_liked');
  }

  // открытие большого изображения
  open = (event) => {
    const bigPicture = document.querySelector('.popup__big-image');
    bigPicture.src = event.target.getAttribute('imageURL');
    popupBigImage.open();
  }

  renderCard() {
    this.addListeners();
  }
}
