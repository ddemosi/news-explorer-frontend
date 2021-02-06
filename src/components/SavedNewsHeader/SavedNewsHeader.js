import React, { useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const SavedNewsHeader = ({ savedCards, sortedKeywords }) => {

  const currentUser = useContext(CurrentUserContext);
  // utility function to capitalize strings
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function keywordList() {
    // check array length and return appropriate string

    if (sortedKeywords.length === 1) {
      return `${capitalize(sortedKeywords[0])}`;
    } else if (sortedKeywords.length === 2) {
      return `${capitalize(sortedKeywords[0])} and ${capitalize(sortedKeywords[1])}`;
    } else if (sortedKeywords.length === 3) {
      return `${capitalize(sortedKeywords[0])}, ${capitalize(sortedKeywords[1])}, and ${capitalize(sortedKeywords[2])}`;
    } else {
      return `${capitalize(sortedKeywords[0])}, ${capitalize(sortedKeywords[1])}, and ${sortedKeywords.length - 2} others`;
    };
  }

  return (
    <section className='saved-news-header'>
      <div className="saved-news-header__width">
        <p className="saved-news-header__label">Saved articles</p>
        <h2 className="saved-news-header__title">
          {currentUser.name}, you have {savedCards && savedCards.length > 0 ? savedCards.length : "no"} saved articles
        </h2>
        {
          sortedKeywords && sortedKeywords.length > 0
            ? <p className="saved-news-header__keyword-text">
              By keywords: <span className="saved-news-header__keywords">{keywordList()}</span>
            </p>
            : ""
        }

      </div>
    </section>
  );
}

export default SavedNewsHeader;