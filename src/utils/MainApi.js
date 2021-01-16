const main = {
  url: 'http://localhost:3000',
  auth: {
    "Content-Type": "application/json"
  }
}

class Api {
  constructor({ url, auth }) {
    this._url = url;
    this._auth = auth;
  }

  // Private functions

  _checkResponse(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // User and registration

  register(email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._auth,
      body: JSON.stringify({ email, password, name })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._auth,
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  checkToken(jwt) {
    return fetch(`${this._apiEndpoint}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._auth,
    })
      .then((res => {
        return this._checkResponse(res);
      }));
  }

  // Article CRUD

  getArticles() {
    return fetch(`${this._url}/articles`, {
      headers: this._auth,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  addArticle(article) {
    return fetch(`${this._url}/articles`, {
      method: "POST",
      headers: this._auth,
      body: JSON.stringify(article),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  deleteArticle(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._auth,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

}

const api = new Api(main);

export default api;