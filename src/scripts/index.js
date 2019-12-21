/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import { Api } from './modules/api';
import { CardList } from './modules/cardlist';
import { Popup } from './modules/popup';

// переменные
const placesList = document.querySelector('.places-list');
const newCardPopup = new Popup(document.querySelector('#add-new-card'));
const popupEditProfile = new Popup(document.querySelector('#edit-user-info'));
const newCardForm = document.forms.new;
const editUserForm = document.forms.user;
const submitFormButton = newCardPopup.asElement.querySelector('.popup__button');
const submitEditUser = popupEditProfile.asElement.querySelector('.popup__button');
export const popupBigImage = new Popup(document.querySelector('#show-image'));
const editUserInfoButton = document.querySelector('.user-info__edit-button');
const openNewCardPopupButton = document.querySelector('.user-info__button');

openNewCardPopupButton.addEventListener('click', () => {
  newCardPopup.open();
});

editUserInfoButton.addEventListener('click', () => {
  popupEditProfile.open();
});


// eslint-disable-next-line no-undef
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';


const myConfig1 = {
  url: serverUrl,
  userUrl: '/users/me',
  headers: {
    authorization: 'f7a10af5-9c1b-41f8-aa5a-315add12ea4b',
    'Content-Type': 'application/json',
  },
};

const myConfig2 = {
  url: serverUrl,
  userUrl: '/cards',
  headers: {
    authorization: 'f7a10af5-9c1b-41f8-aa5a-315add12ea4b',
    'Content-Type': 'application/json',
  },
};


const api1 = new Api(myConfig1);
export const api2 = new Api(myConfig2);

const renderedCards = new CardList(placesList);
renderedCards.render();

api1.getUserInfo();

// функции
function popupDisableButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}

function enablePopUpButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__button_disabled');
}

function isValid(elementToCheck) {
  const errorElement = document.querySelector(`#error-${elementToCheck.name}`);
  if (!elementToCheck.validity.valid) {
    if (elementToCheck.validity.typeMismatch) {
      errorElement.textContent = 'Здесь должна быть ссылка';
    }

    if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {
      if (elementToCheck.validity.valueMissing) {
        errorElement.textContent = 'Это обязательное поле';
      } else {
        errorElement.textContent = 'Длина должна быть от 2 до 30 символов';
      }
    }

    return false;
  }


  errorElement.textContent = '';
  return true;
}

function validateAddCard() {
  const validatePlace = isValid(newCardForm.elements.name);
  const validateURL = isValid(newCardForm.elements.link);
  if (validatePlace && validateURL) {
    enablePopUpButton(submitFormButton);
  } else {
    popupDisableButton(submitFormButton);
  }
}


// редактирование данных профиля
function editFormSubmit(event) {
  event.preventDefault();
  document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
  document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value;
  api1.patchPromise(editUserForm.elements.username.value, editUserForm.elements.about.value)
    .then((res) => {
      api1.getUserInfo(res);
      document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
      document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value;
      enablePopUpButton(submitEditUser);
      popupEditProfile.close();
    })
    .catch((err) => { console.log(err); });
}

function addFormElement(event) {
  event.preventDefault();
  const { name } = newCardForm.elements;
  const { link } = newCardForm.elements;
  renderedCards.addCard(name.value, link.value);
  newCardForm.reset();
  popupDisableButton(submitFormButton);
  newCardPopup.close();
}


// Обработчики событий
newCardForm.addEventListener('input', validateAddCard);
newCardForm.addEventListener('submit', addFormElement);
editUserForm.addEventListener('submit', editFormSubmit);
