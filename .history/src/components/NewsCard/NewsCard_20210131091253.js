import React, { useEffect, useState } from 'react';

const NewsCard = (props) => {

  const [isSaved, toggleIsSaved] = useState(false);

  // Utility functions to help with formatting

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

  function formatDate() {
    if (props.isSavedNewsRoute) {
      return props.date.substr(0, 15);
    } else {
      return props.date.split("T")[0];
    }
  };

  // Click handlers

  function handleDelete() {
    props.deleteCard(props._id);
  };

  async function handleArticleSave() {
    // prevent action if article is already saved
    if (isSaved) {
      return
    } else {

      // send article up to Main component to be handled

      if(await props.saveArticle({
        keyword: props.keyword,
        title: props.title,
        text: props.description,
        date: props.date,
        source: props.source,
        link: props.url,
        image: props.image,
      })
      ) {
        // if saveArticle returns true
        toggleIsSaved(true);
        return
      } else {
        toggleIsSaved(false);
        //otherwise do nothing
        return;
      }
    }
  };

  // Effect to check if article contains an isSaved properties, which is assigned during the api call
  // This is only relevant when searching for cards on NewsApi, not local.

  useEffect(() => {
    if (props.isSaved){
      toggleIsSaved(true);
    };
    return
  }, [props.isSaved, toggleIsSaved]);

  // functions for conditional rendering of components

  function deleteOrSave() {
    if (props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button onClick={handleDelete} className="news-card__delete-button">
          <span className="news-card__save-button-label"><p>Remove from saved</p></span>
        </button>
      )
    } else if (!props.isSavedNewsRoute && props.isLoggedIn) {
      return (
        <button onClick={(e) => { e.stopPropagation(); handleArticleSave() }} className={`news-card__save-button ${isSaved ? 'news-card__save-button_active' : ''}`}></button>
      )
    } else {
      return (
        <button onClick={(e) => { e.stopPropagation(); handleArticleSave() }} className="news-card__save-button">
          <span className="news-card__save-button-label"><p>Sign in to save articles</p></span>
        </button>
      )
    }
  }

  function keywords() {
    if (props.isSavedNewsRoute) {
      return (
        <div className="news-card__keyword">
          <p>{capitalize(props.keyword)}</p>
        </div>
      )
    }
  }

  return (
    <li className="news-card">
      {deleteOrSave()}
      <a className="news-card__anchor" href={props.url} target="_blank" rel="noopener noreferrer">
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