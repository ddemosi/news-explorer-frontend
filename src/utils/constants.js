const incrementVisibleCardsVariable = 3;
const maxVisibleCards = 100;

const apiKey = "6a763a6b37bf49cf9315c6b0dc70547a"

const newsApiInfo = {
  apiKey,
  url: "https://nomoreparties.co/news/v2",
  endpoint: "/everything",
  pageSize: 100,
  auth: {
    Authorization: apiKey,
  },
  searchRange: 7,
}

const main = {
  url: 'https://api.danny-news-explorer.students.nomoreparties.site',
  headers: {
    "Content-Type": "application/json",
  },
  credentialPreference: 'include',
}

export {
  incrementVisibleCardsVariable,
  maxVisibleCards,
  newsApiInfo,
  main,
}