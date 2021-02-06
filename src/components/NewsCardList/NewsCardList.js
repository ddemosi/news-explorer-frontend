import React, { useState } from 'react';

import NewsCard from '../NewsCard/NewsCard';
import NothingFound from '../NothingFound/NothingFound';

import { maxVisibleCards, incrementVisibleCardsVariable} from '../../utils/constants';

const NewsCardList = (props) => {
  const [hideButton, toggleButton] = useState(false);

  function incrementVisibleCards() {
    if (props.visibleCards > maxVisibleCards) {
      toggleButton(true);
      return
    } else {
      const newVisibleCards = props.visibleCards + incrementVisibleCardsVariable;
      props.setVisibleCards(newVisibleCards);
    }

  }

  function renderCardList() {
    if (props.cards.length === 0) {
      return <NothingFound error={false} />
    } else if (props.cards) {
      return props.cards.slice(0, props.visibleCards).map((card) => {

        return <NewsCard
          key={card.url}
          _id={card._id}
          keyword={card.keyword}
          date={card.publishedAt}
          title={card.title}
          description={card.description}
          source={card.source.name}
          url={card.url}
          image={card.urlToImage}
          isSaved={card.isSaved}
          isSavedNewsRoute={props.isSavedNewsRoute}
          isLoggedIn={props.isLoggedIn}
          deleteArticleHandler={props.deleteArticleHandler}
          saveArticle={props.saveArticle}
          togglePopup={props.togglePopup}
        />
      });
    } else {
      return <NothingFound error={true} />
    }
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
            renderCardList()
          }
        </ul>


        {!props.isSavedNewsRoute && !hideButton ? <button onClick={incrementVisibleCards} className="news-card-list__show-more">Show more</button> : ''}

      </div>
    </section>
  );
}

export default NewsCardList;