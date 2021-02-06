import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useComponentWillMount } from '../../utils/useComponentWillMount';

import Navigation from '../Navigation/Navigation';

const Header = (props) => {

  // state and context declarations

  const { togglePopup, toggleFormPopup, signoutHandler, handlePopup, toggleNav, isNavOpen } = props;


  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();

  // const location = useLocation();

  // handlers

  function handleSignout() {

    signoutHandler()
      .then(() => {
        props.toggleLoggedIn(false);
        toggleNav(false);
        localStorage.removeItem('articles');
        localStorage.removeItem('token');
        localStorage.removeItem('recent-search-keyword');
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
    history.location.state = null;
    return
  })

  // effect to handle redirect from /saved-news if not logged in
  useEffect(() => {
    if (history.location.state === null || history.location.state === undefined) {
      return
    } else if (history.location.state.redirected){
      handlePopup();
      return
    }
    return
  }, [history.location.state, handlePopup]);

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