import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';

import api from '../../utils/MainApi';

const Main = (props) => {

  const { isLoggedIn, isLoading, toggleIsLoading } = props;

  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);

  function saveArticle({ keyword, title, text, date, source, link, image }) {

    api.addArticle({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    })
      .then(() => {
        localStorage.removeItem('articles');
        return
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function renderCardList() {
    if (isLoading) {
      return (
        <Preloader />
      )
    } else if (!isLoading && visibleCards > 0) {
      if (!cards) {
        return <NothingFound error={true} />
      } else if (cards.length === 0) {
        return (
          <NothingFound error={false} />
        )
      } else if (cards) {
        return (
          <NewsCardList
            isSavedNewsRoute={false}
            isLoggedIn={isLoggedIn}
            cards={cards}
            setCards={setCards}
            visibleCards={visibleCards}
            setVisibleCards={setVisibleCards}
            saveArticle={saveArticle}

          />
        )
      }
    }
    return
  }

  return (
    <div className="main">
      <SearchForm
        setCards={setCards}
        setVisibleCards={setVisibleCards}
        toggleIsLoading={toggleIsLoading}
      />

      {renderCardList()}

      <About />

    </div>
  );
}

export default Main;