import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

const Main = (props) => {
  return (
    <div className="main">
      <SearchForm />

      <NewsCardList
        isSavedNewsRoute={false}
        isLoggedIn={props.isLoggedIn}
        ></NewsCardList>

      <About />

    </div>
  );
}

export default Main;