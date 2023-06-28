class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then(checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(checkResponse);
  }

  updateAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then(checkResponse);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(checkResponse);
  }

  likeCard(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers,
    }).then(checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(checkResponse);
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

const groupId = 'web_ptbr_04';
const token = '56988fc2-c072-4a64-b0a6-6eaae5ae8b3e';

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

export default api;