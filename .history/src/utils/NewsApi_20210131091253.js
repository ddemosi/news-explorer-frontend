const apiKey = "0faa4eab3d374a6d99b353e5310a09b0";
const url = "https://nomoreparties.co/news/v2";
const endpoint = "/everything";
const pageSize = 100;

const newsApiEndpoints = {
  url,
  endpoint,
  auth: {
    Authorization: apiKey,
  },
  pageSize,
  apiKey,
}

class NewsApi {
  constructor({ url, endpoint, auth, pageSize, apiKey }) {
    this._url = url;
    this._endpoint = endpoint;
    this._auth = auth;
    this._pageSize = pageSize;
    this._apiKey = apiKey
  }

  _checkResponse(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  search(keyword) {
    return fetch(`${this._url}${this._endpoint}?q=${keyword}&from=${new Date(Date.now() - 604800000)}&to=${new Date(Date.now())}&pageSize=${pageSize}&apiKey=${apiKey}`, {
      headers: this._auth
    })
      .then((res) => {
        return this._checkResponse(res)
      })
  }
}

const newsApi = new NewsApi(newsApiEndpoints);

export default newsApi;