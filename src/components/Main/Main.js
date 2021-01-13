import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

const Main = (props) => {

  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);

  return (
    <div className="main">
      <SearchForm
        setCards={setCards}
        setVisibleCards={setVisibleCards}
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


      <About />

    </div>
  );
}

export default Main;