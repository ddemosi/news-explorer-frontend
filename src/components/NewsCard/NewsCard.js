import React, { useState } from 'react';

const NewsCard = (props) => {

  const [isSaved, toggleIsSaved] = useState(false);

  function deleteOrSave() {
    if (props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button className="news-card__delete-button">
          <span className="news-card__save-button-label"><p>Remove from saved</p></span>
        </button>
      )
    } else if (!props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button className={`news-card__save-button ${isSaved ? 'news-card__save-button_active' : ''}`} onClick={() => toggleIsSaved(!isSaved)}></button>
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

  return (
    <li className="news-card">
      {deleteOrSave()}
      {keywords()}
      <div className="news-card__image"></div>
      <div className="news-card__info-container">
        <p className="news-card__date">Test</p>
        <h3 className="news-card__title">Test</h3>
        <p className="news-card__snippet">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
        <p className="news-card__source">Test</p>
      </div>
    </li>
  );
}

export default NewsCard;