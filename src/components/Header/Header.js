import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useComponentWillMount } from '../../utils/useComponentWillMount';
import api from '../../utils/MainApi';

import Navigation from '../Navigation/Navigation';

const Header = (props) => {

  // state and context declarations

  const { togglePopup, toggleFormPopup, toggleIsRegisterPopup } = props;

  const [isNavOpen, toggleNav] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

  // handlers

  const handlePopup = useCallback(() => {
    togglePopup(true);
    toggleFormPopup(true);
    toggleIsRegisterPopup(false);
    toggleNav(false);
  }, [togglePopup, toggleFormPopup, toggleIsRegisterPopup, toggleNav])

  function handleSignout() {

    api.signout()
      .then(() => {
        props.toggleLoggedIn(false);
        toggleNav(false);
        localStorage.removeItem('articles');
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function toggleNavStatus() {
    if (props.isFormPopupOpen) {
      toggleNav(false);
      togglePopup(false);
      toggleFormPopup(false);
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


  // custom hook to remove popup trigger on refresh
  useComponentWillMount(() => {
    location.state = null;
    return
  })

  // effect to handle redirect from /saved-news if not logged in
  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      return
    } else if (location.state.redirected){
      handlePopup();
      return
    }
    return
  }, [location.state, handlePopup]);

  return (
    <header className={`header ${isNavOpen ? 'header_nav-active' : ''}`}>
      <div className='header__size'>
        <p className={`header__logo ${navigationLinkColors('header__logo_dark')} `}>NewsExplorer</p>

        <button onClick={toggleNavStatus} className={`header__icon ${isNavOpen ? 'header__icon_active' : ''} ${props.isFormPopupOpen || props.isPopupOpen ? 'header__icon_active' : ''} ${navigationLinkColors('header__icon_dark')}`}></button>
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
              onClick={handlePopup}
              className={`header__signin ${navigationLinkColors('header__signin_dark')}`}>Sign in</button>}
        </div>

      </div>
    </header>
  );
}

export default Header;