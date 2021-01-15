import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';

const Main = (props) => {

const [isLoading, toggleIsLoading] = useState(false);

  return (
    <div className="main">
      <SearchForm
        toggleIsLoading={toggleIsLoading}
      />

      {isLoading
        ? <div>
          <Preloader/>
          <NothingFound/>
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