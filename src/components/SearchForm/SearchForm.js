import React, { useEffect, useRef, useState } from 'react';

import { incrementVisibleCardsVariable } from '../../utils/constants';

const SearchForm = ({ setCards, setVisibleCards, toggleIsLoading, isLoggedIn, getUserArticles, searchHandler }) => {

  const searchRef = useRef();

  // disable inputs state
  const [disableInputs, toggleInputDisable] = useState(false);

  // check if any of the cards match cards that are already saved

  function searchAndSort(savedCards) {
    searchHandler(searchRef.current.value)
      .then((res) => {
        // array of articles to be compared then returned after loop
        let newArticles = []
        let urlArray = [];
        // check if there are no saved cards or an error
        if (!savedCards) {
          // check for card retrieval error
          throw new Error('Saved articles retrieval failed');
        } else if (savedCards.length === 0 || null) {
          // if there are no local card, loop articles and assign keyword. Then return
          res.articles.forEach((article) => {
            article.keyword = searchRef.current.value;
            newArticles.push(article);
          });

          return newArticles;

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
                if (card.url === article.url) {
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
          disableInputs(false);
          throw new Error('Unhandled request error')
        }
      })
      .then(() => {
        // clear loading icon
        toggleIsLoading(false);
        toggleInputDisable(false);
      })
      .catch((err) => {
        toggleInputDisable(false);
        console.log(err);
      })
  }

  // Search click handler

  function newsSearch() {
    // disable input to prevent unwanted requests
    toggleInputDisable(true);
    localStorage.setItem('recent-search-keyword', searchRef.current.value);
    if (searchRef.current.value.length > 0) {
      // set loading icon
      toggleIsLoading(true);

      // if user is not logged in, ignore sorting function, but still assign keywords
      if (!isLoggedIn) {

        searchHandler(searchRef.current.value)
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
            toggleInputDisable(false);
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
        return
      } else {
        // get local data from server for comparison
        getUserArticles()
          .then((res) => {
            // loop cards and set article format to the same as the NewsAPI
          let newCards = []
          res.forEach((card) => {
            const newCard = {
              _id: card._id,
              keyword: card.keyword,
              publishedAt: card.date,
              title: card.title,
              description: card.text,
              source: card.source,
              url: card.link,
              urlToImage: card.image,
            }

            newCards.push(newCard);
          });
          return newCards;
          })
          .then((newCards) => {
            // send to sorting handler
            localStorage.setItem('articles', JSON.stringify(newCards));
            searchAndSort(newCards);
            return;
          })
          .catch((err) => {
            console.log(err);
          });
        return
      }
    }
    return
  }

  function searchEventHandler(e) {
    e.preventDefault();
    newsSearch();
  }

  function handleEnterKey(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      searchEventHandler(e);
    }
    return
  }

  // search on dom mount
  useEffect(() => {
    const recentSearch = localStorage.getItem('recent-search-keyword');
    if (recentSearch) {
      searchRef.current.value = recentSearch;
      newsSearch();
      return
    }
    return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <section className="search-container">
      <div className="search-container__width">
        <h2 className="search-container__title">What's going on in the world?</h2>
        <p className="search-container__subtitle">Find the latest news on any topic and save them in your personal account</p>
        <form onSubmit={searchEventHandler} className='search-bar'>
          <input ref={searchRef} onKeyUp={handleEnterKey} type="text" placeholder="Enter topic" className={`search-bar__input ${disableInputs ? 'search-bar__input_disabled' : ''}`} disabled={disableInputs} />
          <button type="submit" className='search-bar__button'>Search</button>
        </form>
      </div>
    </section>

  );
}

export default SearchForm;