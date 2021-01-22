const main = {
  url: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
  },
  credentialPreference: 'include',
}

class Api {
  constructor({ url, headers, credentialPreference }) {
    this._url = url;
    this._headers = headers;
    this._credential = credentialPreference;
  }

  // Private functions

  _checkResponse(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // User and registration

  register(email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: this._credential,
      headers: this._headers,
      body: JSON.stringify({ email, password, name })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: this._credential,
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  signout() {
    return fetch(`${this._url}/users/logout`, {
      credentials: this._credential,
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: this._credential,
      headers: this._headers,
    })
      .then((res => {
        return this._checkResponse(res);
      }));
  }

  // Article CRUD

  getArticles() {
    return fetch(`${this._url}/articles`, {
      credentials: this._credential,
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  addArticle(article) {
    return fetch(`${this._url}/articles`, {
      credentials: this._credential,
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(article),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  deleteArticle(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      credentials: this._credential,
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

}

const api = new Api(main);

export default api;