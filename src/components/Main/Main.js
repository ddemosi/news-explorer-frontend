import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';

const Main = (props) => {

  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);
  const [isLoading, toggleIsLoading] = useState(false);

  return (
    <div className="main">
      <SearchForm
        setCards={setCards}
        setVisibleCards={setVisibleCards}
        toggleIsLoading={toggleIsLoading}
      />
      {visibleCards
        ? <NewsCardList
          isSavedNewsRoute={false}
          isLoggedIn={props.isLoggedIn}
          cards={cards}
          visibleCards={visibleCards}
          setVisibleCards={setVisibleCards}
        ></NewsCardList>
        : ""
      }

      {isLoading
        ? <div>
          <Preloader />
          <NothingFound />
        </div>
        : <NewsCardList
          isSavedNewsRoute={false}
          isLoggedIn={props.isLoggedIn}
        ></NewsCardList>
      }

      <About />

    </div>
  );
}

export default Main;