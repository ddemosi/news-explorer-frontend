import React, { useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const SavedNewsHeader = (props) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='saved-news-header'>
      <div className="saved-news-header__width">
        <p className="saved-news-header__label">Saved articles</p>
        <h2 className="saved-news-header__title">
          {currentUser.name}Danny, you have 5{/* insert usercontext.length here */} saved articles
        </h2>
        <p className="saved-news-header__keyword-text">
          By keywords: <span className="saved-news-header__keywords">Test</span>
        </p>
      </div>
  </section>
  );
}

export default SavedNewsHeader;