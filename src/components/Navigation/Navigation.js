import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {

  function renderSavedArticlesLink() {
    if (props.isLoggedIn) {
      return (
        <NavLink to='/saved-news' exact={true} activeClassName="navbar__link_active_dark" className={`navbar__link ${props.navigationLinkColors('navbar__link_dark')}`}>Saved articles</NavLink>
      )
    } else {
      return
    }
  }

  return (
    <div className={`navbar ${props.isNavOpen ? 'navbar_active' : ''}`}>
      <NavLink to='/' exact={true} activeClassName="navbar__link_active" className={`navbar__link ${props.navigationLinkColors('navbar__link_dark')}`}>Home</NavLink>
      {renderSavedArticlesLink()}
    </div>
  );
}

export default Navigation;