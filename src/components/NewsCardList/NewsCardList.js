import React from 'react';

import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = (props) => {

  function incrementVisibleCards() {
    const newVisibleCards = props.visibleCards + 3;
    props.setVisibleCards(newVisibleCards);
  }

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
          {
            props.cards.slice(0, props.visibleCards).map((card) => {
              return <NewsCard
                key={card.id}
                date={card.publishedAt}
                title={card.title}
                description={card.description}
                source={card.source.name}
                url={card.url}
                image={card.urlToImage}
                isSavedNewsRoute={props.isSavedNewsRoute}
                isLoggedIn={props.isLoggedIn}
                />
            })
          }

        </ul>

        {!props.isSavedRoute ? <button onClick={incrementVisibleCards} className="news-card-list__show-more">Show more</button> : ''}

      </div>
    </section>
  );
}

export default NewsCardList;