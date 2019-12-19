//переменные
const placesList = document.querySelector('.places-list');
const newCardPopup = new Popup(document.querySelector('#add-new-card'));
const popupEditProfile = new Popup(document.querySelector('#edit-user-info'));
const newCardForm = document.forms.new;
const editUserForm = document.forms.user;
const submitFormButton = newCardPopup.asElement.querySelector('.popup__button');
const submitEditUser = popupEditProfile.asElement.querySelector('.popup__button');
const popupBigImage = new Popup(document.querySelector('#show-image'));
const editUserInfoButton = document.querySelector('.user-info__edit-button');
const openNewCardPopupButton = document.querySelector('.user-info__button');

openNewCardPopupButton.addEventListener('click', () => {
  newCardPopup.open()
})

editUserInfoButton.addEventListener('click', () => {
  popupEditProfile.open()
})

const myConfig1 = {
  url: 'http://95.216.175.5/cohort5',
  userUrl: '/users/me',
  headers: {
    authorization: 'f7a10af5-9c1b-41f8-aa5a-315add12ea4b',
    'Content-Type': 'application/json'
  },
};

const myConfig2 = {
  url: 'http://95.216.175.5/cohort5',
  userUrl: '/cards',
  headers: {
    authorization: 'f7a10af5-9c1b-41f8-aa5a-315add12ea4b',
    'Content-Type': 'application/json'
  },
};

const api1 = new Api(myConfig1);
const api2 = new Api(myConfig2);
 

const renderedCards = new CardList(placesList);
renderedCards.render();
// api2.getInitialCards()
// .then((res) => {
//   res.forEach(card => {
//     renderedCards.addCard(card.name, card.link);
//   })
// });


// api1.patchPromise1('Olya', 'Frontend Developer')
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
           }
          else {
             errorElement.textContent = 'Длина должна быть от 2 до 30 символов';
             }
      }

      return false;
  }
  else {

      errorElement.textContent = '';
      return true;
  }
}

function errorReset(parentNode) {
  const errorsCollection = Array.from(parentNode.getElementsByTagName('span'));
  errorsCollection.forEach(function (item) {

    let idToCheck = item.id;

    if (idToCheck.includes('error')) {
      item.textContent = '';
    }
  });
}

function validateAddCard() {
  let validatePlace = isValid(newCardForm.elements.name);
  let validateURL = isValid(newCardForm.elements.link);
  if (validatePlace && validateURL) {

    enablePopUpButton(submitFormButton);

  }
  else {

    popupDisableButton(submitFormButton);

  }
}

// function validateEditProfile() {
//   let validateUserName = isValid(editUserForm.elements.username.value);
//   let validateAbout = isValid(editUserForm.elements.about.value);

//   if (validateUserName && validateAbout) {

//     enablePopUpButton(submitEditUser);
//   }
//   else {

//     popupDisableButton(submitEditUser);
//   }
// }

// редактирование данных профиля
function editFormSubmit(event) {
 // event.preventDefault();
  // api1.patchPromise(editUserForm.elements.username.value, editUserForm.elements.username.value);
  // .then((res) => {})
  // document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
  // document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value
  // event.preventDefault();
  // enablePopUpButton(submitEditUser);
  // popupEditProfile.close();

      api1.patchPromise(editUserForm.elements.username.value,editUserForm.elements.username.value)
        .then(res => {
        api1.getUserInfo(res);
        document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
        document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value
        enablePopUpButton(submitEditUser);
        popupEditProfile.close();
        })
        .catch((err) => {console.log(err)});
    event.preventDefault();
}

function addFormElement(event) {
  event.preventDefault();
  const name = newCardForm.elements.name;
  const link = newCardForm.elements.link;
  renderedCards.addCard(name.value, link.value);
  newCardForm.reset();
  popupDisableButton(submitFormButton);
  newCardPopup.close();
}


// Обработчики событий
newCardForm.addEventListener('input', validateAddCard);
newCardForm.addEventListener('submit', addFormElement);
// editUserForm.addEventListener('input', validateEditProfile);
editUserForm.addEventListener('submit', editFormSubmit);

/****
 * Здравствуйте.
 *
 * Весь лишний код при создании карточки необходимо вынести в отдельный метод ОК 
 * Необходимо удалить const initialCards. Она больше не нужна и в коде её не место. OK
 *
 * В класс API вы передаёте http://95.216.175.5/cohort5' . Это класс не должен знать о том
 * на какой ресур ходить. Эти данные должны передаваться при инициализации ОК
 *
 * В класс API ничего не должен знать о карточка и вообще о какой либо реализации, всю работу с DOM надо удалить ОК только с формой не получилось это исключить(при изменении имени)
 *
 * С класса API необходимо удалить из конструктора
 *  this.getUserInfo();
    this.getInitialCards();
    this.editUserInfo();
 * Сам класс должен вызываться из других классов ОК
 *
 * Из класса CardList необходимо удалить. Этому в конструкторе не место ОК
 *
    this.cards = initialCards ? initialCards.map(({ name, link }) => ({ rendered: false, card: new Card(name, link) })) : [];
 *
 * В функции function addFormElement(event) вы вызываете
 * cards.addCard(name.value, link.value);
 * где искать в коде переменную cards, это надо передавать в качестве параметров
 * тоже и newCardForm  - ok
 *
 * Функцию function isValid(elementToCheck) разбить на несколько небольших функций. Слишком много условий...
 *
 * Это очень тяжело понять
 * if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength')))
 *
 *
 *
 * *
 * Про создание карточки.
 * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного криэйта DOM-элементов.
       cardTemplate() {
           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                   </div>`
       };
 * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного криэйта DOM-элементов.
       cardTemplate() {
           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                   </div>`
       };
 * Обратите внимание на использование backtick ` - это новый нововведение ES6, в нем можно корректно переносить строки и вставлять внутрь разметки JS-код.
 * Конкретнее про вставку JS-кода. Сейчас вы используете способ стандарта ES5 - ' + card.link + ‘. Грузно, не правда ли?
 * В ES6, используя ` бэктик, появляется возможность интерполяции `Строковое значение разметки ${console.log(‘А здесь уже JavaScript’)} `;
 * Обладая данными знаниями, возникает идея оптимизации createCard - теперь эта функция по прежнему принимает card, содержащую нужные параметры, которые
 * непосредственно вставляются в разметку.
       cardTemplate(string) {
           return `<div class="place-card">
                             ${string}
                   </div>`
       };
 *  Этот кусок разметки в дальнейшем можно вставить в DOM, воспользовавшись методом insertAdjacentHTML().
 *  Однако такой способ вставки пользовательских строк является менее безопасным
 *  https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML
 *
 * 2. Путь оптимизации уже текущего кода с использованием documentFragment и уменьшении работы над DOM.
 *     https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment - здесь можно почитать о данном методе и его кейсах.
 *     https://developer.mozilla.org/ru/docs/Web/HTML/Element/template - очень интересный тег, его также можно использовать для создание компонентов.
 *
 *
 */