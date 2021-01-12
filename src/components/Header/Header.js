import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {

  const [isNavOpen, toggleNav] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  function togglePopup() {
    props.togglePopup(true);
    toggleNav(false);
  }

  function handleSignout() {
    props.toggleLoggedIn(false);
    toggleNav(false);
  }

  function toggleNavStatus() {
    if (props.isPopupOpen) {
      toggleNav(false);
      props.togglePopup(false);
    } else {
      toggleNav(!isNavOpen);
    }
  }

  function navigationLinkColors(activeClass) {
    if (props.isSavedNewsRoute && !isNavOpen) {
      return activeClass;
    } else if (props.isSavedNewsRoute && isNavOpen) {
      return '';
    } else {
      return '';
    }
  }
  return (
    <header className={`header ${isNavOpen ? 'header_nav-active' : ''}`}>
      <div className='header__size'>
        <p className={`header__logo ${navigationLinkColors('header__logo_dark')} `}>NewsExplorer</p>

        <button onClick={toggleNavStatus} className={`header__icon ${isNavOpen ? 'header__icon_active' : ''} ${props.isPopupOpen ? 'header__icon_active' : ''} ${navigationLinkColors('header__icon_dark')}`}></button>
        <div className={`header__mobile-nav ${isNavOpen ? 'header__mobile-nav_visible' : ''}`}>
          <Navigation
            isLoggedIn={props.isLoggedIn}
            isSavedNewsRoute={props.isSavedNewsRoute}
            isNavOpen={isNavOpen}
            navigationLinkColors={navigationLinkColors}
          />

          {props.isLoggedIn
            ? <button
              onClick={handleSignout}
              className={`header__signout ${navigationLinkColors('header__signout_dark')}`}>{`${isNavOpen ? 'Sign out' : currentUser.name}`}</button>
            : <button
              onClick={togglePopup}
              className={`header__signin ${navigationLinkColors('header__signin_dark')}`}>Sign in</button>}
        </div>

      </div>
    </header>
  );
}

export default Header;