import React, { useCallback, useEffect, useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import api from '../../utils/MainApi';

const SavedNews = ({ isLoading, toggleIsLoading, isLoggedIn, deleteArticleHandler }) => {

  const [savedCards, setSavedCards] = useState();
  const [sortedKeywords, setSortedKeywords] = useState([]);

  // Delete button elevated state so cards can be rerendered after delete

  function deleteCard(id) {
    if (id) {
      deleteArticleHandler(id)
        .then(() => {
          localStorage.removeItem('articles');
          retrieveCards();
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }

  // function to sort keywords by number of times that keyword was used

  const returnKeywordRankings = (arr) => {
    // don't run unless savedCards is set
    if (arr) {
      // extract keywords from savedCards and put in new array
      let keywords = [];
      arr.forEach((card) => {
        const lowercase = card.keyword.toLowerCase();
        keywords.push(lowercase);
        return;
      });
      // sort new array and place in object
      let result = {};
      for (let i = 0; i < keywords.length; ++i) {
        if (!result[keywords[i]])
          result[keywords[i]] = 0;
        ++result[keywords[i]];
      }
      // make a shallow copy of result that you can delete properties without messing with result.length
      const keywordsCopy = { ...result }

      // loop through object and delete top result from the shallow copy, then loop again

      let sortedResult = [];
      for (let i = 0; i < Object.keys(result).length; ++i) {
        const reducedObj = Object.keys(keywordsCopy).reduce((a, b) => keywordsCopy[a] > keywordsCopy[b] ? a : b);
        sortedResult.push(reducedObj);
        delete keywordsCopy[reducedObj];
      };

      // THIS RETURNS AN ARRAY OF SORTED KEYWORDS, NOT A SORTED OBJECT

      return sortedResult;

    } else {
      return
    }
  };

  // Sort cards by keyword

  function sortCardsByKeyword(refArray, objectToSort) {

    const itemPositions = {};
    for (const [index, id] of refArray.entries()) {
      itemPositions[id] = index;
    }

    objectToSort.sort((a, b) => itemPositions[a.keyword] - itemPositions[b.keyword]);

    return objectToSort;

  }

  // Effect to retrieve cards and set to proper values

  const retrieveCards = useCallback(() => {
    toggleIsLoading(true);
    // Check local storage for articles
    const cards = JSON.parse(localStorage.getItem('articles'));
    if (cards) {
        const keywordRankArray = returnKeywordRankings(cards);
        setSortedKeywords(keywordRankArray);
        setSavedCards(cards);
        toggleIsLoading(false);
    } else {
      api.getArticles()
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
            return
          });
          return newCards;
        })
        .then((newCards) => {
          // sort cards by keyword
          const keywordRankArray = returnKeywordRankings(newCards);
          setSortedKeywords(keywordRankArray);
          return sortCardsByKeyword(keywordRankArray, newCards);
        })
        .then((sortedCards) => {
          // set sorted cards into localstorage and onto the DOM
          localStorage.setItem('articles', JSON.stringify(sortedCards));
          setSavedCards(sortedCards);
          toggleIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [toggleIsLoading, setSavedCards, setSortedKeywords])

  // Render cards when they arrive

  function renderCardList() {
    // check if there are cards
    // if you don't, it will crash, since savedCards doesn't have length
    if (!savedCards) {
      return <NothingFound error={true} />
    } else {
      if (isLoading) {
        return (
          <Preloader />
        )
      } else if (!isLoading) {
        if (savedCards.length === 0) {
          return (
            <NothingFound error={false} />
          )
        } else if (savedCards) {
          return (
            <NewsCardList
              isSavedNewsRoute={true}
              isLoggedIn={isLoggedIn}
              cards={savedCards}
              setCards={setSavedCards}
              visibleCards={savedCards.length}
              setVisibleCards={null}
              deleteCardHandler={deleteCard}
              sortedKeywords={sortedKeywords}

            />
          )
        }
      }
      return
    }

  }

  useEffect(() => {
    retrieveCards();

  }, [retrieveCards]);


  return (
    <section className="saved-news">

      <SavedNewsHeader
        savedCards={savedCards}
        sortedKeywords={sortedKeywords}
      />


      {renderCardList()}

    </section>
  );
}

export default SavedNews;