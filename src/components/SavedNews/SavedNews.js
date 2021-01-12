import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

const SavedNews = (props) => {
  return (
    <section className="saved-news">
      <NewsCardList
        isLoggedIn={props.isLoggedIn}
        isSavedNewsRoute={true} />
    </section>
  );
}

export default SavedNews;