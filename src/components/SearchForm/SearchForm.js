import React, { useRef } from 'react';
import newsApi from '../../utils/NewsApi';

const SearchForm = (props) => {

  const searchRef = useRef();

    function newsSearch() {
      newsApi.search(searchRef.current.value)
        .then((res) => {
          props.setVisibleCards(3);
          props.setCards(res.articles);
          return
        })
    }

    function handleEnterKey(e) {
      if (e.key === 'Enter') {
        newsSearch();
      }
    }

  return (
    <section className="search-container">
      <div className="search-container__width">
        <h2 className="search-container__title">What's going on in the world?</h2>
        <p className="search-container__subtitle">Find the latest news on any topic and save them in your personal account</p>
        <div className='search-bar'>
          <input ref={searchRef} onKeyUp={handleEnterKey} type="text" placeholder="Enter topic" className='search-bar__input' />
          <button onClick={newsSearch} className='search-bar__button'>Search</button>
        </div>
      </div>
    </section>

  );
}

export default SearchForm;