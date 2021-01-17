export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  setNewCard({ place, link }) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: place,
          link: link
        })
      })
      .then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._getResponse);
  }




  setLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._getResponse);
  }




  getUser() {
    return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  setUser({ title, subtitle }) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          about: subtitle
        })
      })
      .then(this._getResponse);
  }

  setUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: newAvatar
        })
      })
      .then(this._getResponse);
  }



}