import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

const Main = (props) => {

const [isLoading, toggleIsLoading] = useState(false);

  return (
    <div className="main">
      <SearchForm
        toggleIsLoading={toggleIsLoading}
      />

      {isLoading
        ? <Preloader></Preloader>
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