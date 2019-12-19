class Api {
  constructor(config) {
    this.url = config.url;
    this.userUrl = config.userUrl;
    this.headers = config.headers;
  }

  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  patchPromise(name, about) {
    return fetch(this.url + this.userUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(res => this.getResponseJson(res));
  }

  patchData(name, job) {
    this.patchPromise(name, job)
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(this.url + this.userUrl, {
      headers: this.headers,
    })
      .then(res => this.getResponseJson(res))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(this.url + this.userUrl, {
      headers: this.headers,
    })
      .then(res => this.getResponseJson(res))
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo() {
    return fetch(this.url + this.userUrl, {
      headers: this.headers,
    })
      .then(res => this.getResponseJson(res))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
/**
 * Здравствуйте
 * При попытке поменять профиль возникают ошибки, надо исправить
 * index.js:78 Uncaught TypeError: Cannot read property 'valid' of undefined
    at isValid (index.js:78)
    at HTMLFormElement.validateEditProfile (index.js:131)  здравствуйте. изменила тут валидацию вообще немного
 *
 * При отключении интернета можно добавить карточку. Такого не должно быть, интернета же нет.
 * Должна быть проверка на то что данные пришли и если всё хорошо, передавать управление классу по добавлению карточек ОК ПОЧИНИЛА
 *
 * Реализация перебора данных
 * api2.getInitialCards()
.then((res) => {
  // console.log(res);
  res.forEach(card => {
    renderedCards.addCard(card.name, card.link);
  })
});
 * должен делать класс CardList ОК ПОЧИНИЛА
 *
 * Зачем вы дублируете код ??
 * api1.getUserInfo();
api1.patchData('Olya', 'Frontend Developer')
api1.getUserInfo();                             код я дублировала для того, чтоб посмотреть, что пришло до передачи новых данных. 
                                                мол сначала передала одно, оно пришло. а потом другое. оно тоже пришло)
                                                просто забыла удалить свои проверки, прошу прощения
 *
 *
 *
 */