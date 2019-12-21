/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
export class Api {
  constructor(config) {
    this.url = config.url;
    this.userUrl = config.userUrl;
    this.headers = config.headers;
  }

  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  patchPromise(name, about) {
    return fetch(this.url + this.userUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => this.getResponseJson(res));
  }

  patchData(name, job) {
    this.patchPromise(name, job)
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(this.url + this.userUrl, {
      headers: this.headers,
    })
      .then((res) => this.getResponseJson(res))
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
      .then((res) => this.getResponseJson(res))
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo() {
    return fetch(this.url + this.userUrl, {
      headers: this.headers,
    })
      .then((res) => this.getResponseJson(res))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
