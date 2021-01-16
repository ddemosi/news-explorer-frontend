import React from 'react';

import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = (props) => {

  return (
    <section className="news-card-list">
      <div className="news-card-list__width">

        {!props.isSavedNewsRoute
          ? <h2 className="news-card-list__title">
            Search results
            </h2>
          : ""
        }

        <ul className="news-card-list__container">
          <NewsCard
            isSavedNewsRoute={props.isSavedNewsRoute}
            isLoggedIn={props.isLoggedIn}
            ></NewsCard>
          <NewsCard
            isSavedNewsRoute={props.isSavedNewsRoute}
            isLoggedIn={props.isLoggedIn}
            ></NewsCard>
          <NewsCard
            isSavedNewsRoute={props.isSavedNewsRoute}
            isLoggedIn={props.isLoggedIn}
            ></NewsCard>
        </ul>


        {!props.isSavedRoute ? <button className="news-card-list__show-more">Show more</button> : ''}

      </div>
    </section>
  );
}

export default NewsCardList;