import React from 'react';

const NewsCard = (props) => {

  function deleteOrSave() {
    if (props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button className="news-card__delete-button">
          <span className="news-card__save-button-label"><p>Remove from saved</p></span>
        </button>
      )
    } else if (!props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button className="news-card__save-button"></button>
      )
    } else {
      return (
        <button className="news-card__save-button">
          <span className="news-card__save-button-label"><p>Sign in to save articles</p></span>
        </button>
      )
    }
  }

  function keywords() {
    if (props.isSavedNewsRoute) {
      return (
        <div className="news-card__keyword">
          <p>Test</p>
        </div>
      )
    }
  }

  function formatDate() {
    return props.date.split("T")[0];
  }

  return (
    <li className="news-card">
      <a className="news-card__anchor" href={props.url} target="_blank" rel="noopener noreferrer">
        {deleteOrSave()}
        {keywords()}
        <div className="news-card__image" style={{
          backgroundImage: `url(${props.image})`
        }}></div>
        <div className="news-card__info-container">
          <p className="news-card__date">{formatDate()}</p>
          <h3 className="news-card__title">{props.title}</h3>
          <p className="news-card__snippet">{props.description}</p>
          <p className="news-card__source">{props.source}</p>
        </div>
      </a>
    </li>
  );
}

export default NewsCard;