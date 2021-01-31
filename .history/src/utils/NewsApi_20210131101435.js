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

  _getFromDate() {
    const dateObj = new Date(new Date().setDate(new Date().getDate()-5));
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;
    return newdate;
  }

  _getToDate() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;
    return newdate;
  }

  search(keyword) {
    return fetch(`${this._url}${this._endpoint}?q=${keyword}&from=${this._getFromDate()}&to=${this._getToDate()}&pageSize=${pageSize}&apiKey=${apiKey}`, {
      headers: this._auth
    })
      .then((res) => {
        return this._checkResponse(res)
      })
  }
}

const newsApi = new NewsApi(newsApiEndpoints);

export default newsApi;