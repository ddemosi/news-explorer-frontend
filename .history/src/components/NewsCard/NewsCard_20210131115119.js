import React, { useEffect, useState } from 'react';

const NewsCard = ({ _id,
  keyword,
  date,
  title,
  description,
  source,
  url,
  image,
  isSaved,
  isSavedNewsRoute,
  isLoggedIn,
  deleteCard,
  saveArticle
}) => {

  const [isSavedIcon, toggleIsSavedIcon] = useState(false);
  const [cardId, setCardId] = useState("");

  // Utility functions to help with formatting

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

  function formatDate() {
    if (isSavedNewsRoute) {
      return date.substr(0, 15);
    } else {
      return date.split("T")[0];
    }
  };

  // Click handlers

  async function handleDelete() {
    const cardDeleted = await deleteCard(cardId);
    if (cardDeleted) {
      toggleIsSavedIcon(false);
      return
    }
    //otherwise throw error
    throw new Error('Save article request unsuccessful')
  };

  async function handleArticleSave() {
    // prevent action if article is already saved
    if (isSavedIcon) {
      handleDelete()
      return
    } else {

      // send article up to Main component to be handled

      const savedArticleId = await saveArticle({
        keyword: keyword,
        title: title,
        text: description,
        date: date,
        source: source,
        link: url,
        image: image,
      })

      if (savedArticleId) {
        // if saveArticle returns true
        toggleIsSavedIcon(true);
        setCardId(savedArticleId)
        return
      } else {
        toggleIsSavedIcon(false);
        //otherwise throw error
        throw new Error('Save article request unsuccessful')

      }
    }
  };

  // Effect to check if article contains an isSaved properties, which is assigned during the api call
  // This is only relevant when searching for cards on NewsApi, not local.

  useEffect(() => {
    if (isSaved) {
      toggleIsSavedIcon(true);
    };
    return
  }, [isSaved, toggleIsSavedIcon]);

  // functions for conditional rendering of components

  function deleteOrSave() {
    if (isSavedNewsRoute && isLoggedIn) {
      return (
        <button onClick={handleDelete} className="news-card__delete-button">
          <span className="news-card__save-button-label"><p>Remove from saved</p></span>
        </button>
      )
    } else if (!isSavedNewsRoute && isLoggedIn) {
      return (
        <button onClick={(e) => { e.stopPropagation(); handleArticleSave() }} className={`news-card__save-button ${isSavedIcon ? 'news-card__save-button_active' : ''}`}></button>
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
    if (isSavedNewsRoute) {
      return (
        <div className="news-card__keyword">
          <p>{capitalize(keyword)}</p>
        </div>
      )
    }
  }

  // effect to set cardId to a dynamic state on mount

  useEffect(() => {
    if (_id) {
      setCardId(_id);
      return
    } else {
      setCardId(null);
    }
    return
  })

  return (
    <li className="news-card">
      {deleteOrSave()}
      <a className="news-card__anchor" href={url} target="_blank" rel="noopener noreferrer">
        {keywords()}
        <div className="news-card__image" style={{
          backgroundImage: `url(${image})`
        }}></div>
        <div className="news-card__info-container">
          <p className="news-card__date">{formatDate()}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__snippet">{description}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
    </li>
  );
}

export default NewsCard;