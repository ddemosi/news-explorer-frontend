const apiKey = "0faa4eab3d374a6d99b353e5310a09b0";
const url = "http://newsapi.org/v2";
const endpoint = "/everything";
const pageSize = 100;

const newsApiEndpoints = {
  url,
  endpoint,
  auth: {
    Authorization: apiKey,
  },
  pageSize
}

class NewsApi {
  constructor({ url, endpoint, auth, pageSize }) {
    this._url = url;
    this._endpoint = endpoint;
    this._auth = auth;
    this._pageSize = pageSize
  }

  _checkResponse(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  search(keyword) {
    return fetch(`${this._url}${this._endpoint}?q=${keyword}&from=${new Date(Date.now() - 604800000)}&to=${new Date(Date.now)}&pageSize=${pageSize}`, {
      headers: this._auth
    })
      .then((res) => {
        return this._checkResponse(res)
      })
  }
}

const newsApi = new NewsApi(newsApiEndpoints);

export default newsApi;