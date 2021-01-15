import React from 'react';

const SearchForm = (props) => {

function submit() {
  props.toggleIsLoading(true)
  setTimeout(() => {
    props.toggleIsLoading(false);
  }, 3000);
}

  return (
    <section className="search-container">
      <div className="search-container__width">
        <h2 className="search-container__title">What's going on in the world?</h2>
        <p className="search-container__subtitle">Find the latest news on any topic and save them in your personal account</p>
        <div className='search-bar'>
          <input type="text" placeholder="Enter topic" className='search-bar__input' />
          <button onClick={submit} className='search-bar__button'>Search</button>
        </div>
      </div>
    </section>

  );
}

export default SearchForm;