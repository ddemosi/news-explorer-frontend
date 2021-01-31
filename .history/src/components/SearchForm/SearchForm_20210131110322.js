import React, { useRef } from 'react';

import newsApi from '../../utils/NewsApi';
import api from '../../utils/MainApi';
import { incrementVisibleCardsVariable} from '../../utils/constants';

const SearchForm = ({ setCards, setVisibleCards, toggleIsLoading, isLoggedIn }) => {

  const searchRef = useRef();

  // check if any of the cards match cards that are already saved

  function searchAndSort(savedCards) {
    newsApi.search(searchRef.current.value)
      .then((res) => {
        // array of articles to be compared then returned after loop
        let newArticles = []
        let urlArray = [];
        // check if there are no saved cards or an error
        if (savedCards.length === 0 || null) {
          // if there are no local card, loop articles and assign keyword. Then return
          res.articles.forEach((article) => {
            article.keyword = searchRef.current.value;
            newArticles.push(article);
          });

          return newArticles;

        } else if (!savedCards) {
          // check for card retrieval error
          throw new Error('Saved articles retrieval failed');
        } else {
          // loop through saved cards and extract the url
          savedCards.forEach((card) => {
            urlArray.push(card.url);
          });

          // loop through articles, compare, then assign a special property if the article
          // has already been saved
          res.articles.forEach((article) => {
            if (urlArray.includes(article.url)) {
              article.isSaved = true;
              // loop through saved cards and find matching url object, then copy it's id to the rendered card
              savedCards.forEach((card) => {
                if(card.url === article.url) {
                  article._id = card._id;
                }
                return
              })
            };
            // then assign keyword
            article.keyword = searchRef.current.value;
            newArticles.push(article);
            return
          })
        }
        // finally, return the articles with the new properties
        return newArticles;
      })
      .then((articles) => {
        if (articles) {
          setVisibleCards(incrementVisibleCardsVariable);
          setCards(articles);
          return
        } else {
          toggleIsLoading(false);
          throw new Error('Unhandled request error')
        }
      })
      .then(() => {
        // clear loading icon
        toggleIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Search click handler

  function newsSearch() {
    if (searchRef.current.value.length > 0) {
      // set loading icon
      toggleIsLoading(true);

      // if user is not logged in, ignore sorting function, but still assign keywords
      if (!isLoggedIn) {

        newsApi.search(searchRef.current.value)
          .then((res) => {
            // loop through articles and assign keyword
            let newArticles = [];
            res.articles.forEach((article) => {
              article.keyword = searchRef.current.value;
              newArticles.push(article);
            });
            return newArticles;
          })
          .then((articles) => {
            if (articles) {
              setVisibleCards(incrementVisibleCardsVariable);
              setCards(articles);
              return
            } else {
              toggleIsLoading(false);
              throw new Error('Unhandled request error')
            }
          })
          .then(() => {
            toggleIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
          return
      }

      // if user is logged in, assign keyword and sort cards


      // elevated scope to avoid crashing when data isn't returned fast enough
      let savedCards

      // retrieve cards from local storage or api. Save to savedCards variable
      if (localStorage.getItem('articles')) {
        savedCards = JSON.parse(localStorage.getItem('articles'));
        searchAndSort(savedCards);
      } else {
        // get local data from server for comparison
        api.getArticles()
          .then((res) => {
            // send to sorting handler
            searchAndSort(res);
            return;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    return
  }

  function searchHandler(e) {
    e.preventDefault();
    newsSearch();
  }

  function handleEnterKey(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      searchHandler(e);
    }
    return
  }

  return (
    <section className="search-container">
      <div className="search-container__width">
        <h2 className="search-container__title">What's going on in the world?</h2>
        <p className="search-container__subtitle">Find the latest news on any topic and save them in your personal account</p>
        <form onSubmit={searchHandler} className='search-bar'>
          <input ref={searchRef} onKeyUp={handleEnterKey} type="text" placeholder="Enter topic" className='search-bar__input' />
          <button type="submit" className='search-bar__button'>Search</button>
        </form>
      </div>
    </section>

  );
}

export default SearchForm;