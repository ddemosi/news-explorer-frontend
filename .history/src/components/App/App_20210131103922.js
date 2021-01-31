import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Popup from '../Popup/Popup';

import api from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';



const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, toggleLoggedIn] = useState(null);
  const [isRegisterPopup, toggleIsRegisterPopup] = useState(false);
  const [isPopupOpen, togglePopup] = useState(false);
  const [isFormPopupOpen, toggleFormPopup] = useState(false);
  const [isRegisterSuccessPopupOpen, toggleRegisterSuccessPopup] = useState(false);
  const [isRegisterSuccess, toggleRegisterSuccess] = useState(false);
  const [isLoading, toggleIsLoading] = useState(false);
  const [serverError, toggleServerError] = useState(null);

  function registrationSuccessToSignin() {
    toggleIsRegisterPopup(false);
    toggleRegisterSuccessPopup(false);
    toggleFormPopup(true);
  }
  function registrationFailRedirect() {
    toggleIsRegisterPopup(true);
    toggleRegisterSuccessPopup(false);
    toggleFormPopup(true);
  }

  // api handlers

  function getUserInfo() {
    return api.getUserInfo();
  }

  function registerHandler(email, password, name) {
    return api.register(email, password, name);
  }

  function signinHandler(email, password) {
    return api.signin(email, password);
  }

  function signoutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('recent-search-keyword');
    return api.signout();
  }

  function deleteArticleHandler(id) {
    return api.deleteArticle(id);
  }

  function saveCardHandler(id) {

  }

  function checkIsLoggedInBeforeRender() {
    if (isLoggedIn === null && serverError === null) {
      return (

        <Preloader/>

      )
    } else if (serverError) {
      return (

        <NothingFound error={true}/>

      )
    } else {
      return (
        <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div className='page'>

          <Router>
            <Switch>
              <Route exact path='/'>
                <Header
                  isLoggedIn={isLoggedIn}
                  toggleLoggedIn={toggleLoggedIn}
                  isPopupOpen={isPopupOpen}
                  isFormPopupOpen={isFormPopupOpen}
                  toggleIsRegisterPopup={toggleIsRegisterPopup}
                  togglePopup={togglePopup}
                  toggleFormPopup={toggleFormPopup}
                  isSavedNewsRoute={false}
                  signoutHandler={signoutHandler}
                />

                <Main
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  toggleIsLoading={toggleIsLoading}
                  isPopupOpen={isPopupOpen}
                  isFormPopupOpen={isFormPopupOpen}
                  togglePopup={togglePopup}
                  toggleFormPopup={toggleFormPopup}
                />

                <Footer />
              </Route>

              <Route exact path="/saved-news">
                <Header
                  isLoggedIn={isLoggedIn}
                  isSavedNewsRoute={true}
                  isPopupOpen={isPopupOpen}
                  isFormPopupOpen={isFormPopupOpen}
                  toggleIsRegisterPopup={toggleIsRegisterPopup}
                  toggleFormPopup={toggleFormPopup}
                  togglePopup={togglePopup}
                  toggleLoggedIn={toggleLoggedIn}
                  signoutHandler={signoutHandler}
                />

                <ProtectedRoute
                  component={SavedNews}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  toggleIsLoading={toggleIsLoading}
                  toggleFormPopup={toggleFormPopup}
                  togglePopup={togglePopup}
                />

                <Footer />

              </Route>
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
          {isFormPopupOpen
            ? <Popup
              togglePopup={togglePopup}
              toggleFormPopup={toggleFormPopup}
              isPopupOpen={isPopupOpen}
            >
              <PopupWithForm
                isRegisterPopup={isRegisterPopup}
                toggleIsRegisterPopup={toggleIsRegisterPopup}
                isFormPopupOpen={isFormPopupOpen}
                toggleFormPopup={toggleFormPopup}
                isRegisterSuccessPopupOpen={isRegisterSuccessPopupOpen}
                toggleRegisterSuccessPopup={toggleRegisterSuccessPopup}
                togglePopup={togglePopup}
                toggleLoggedIn={toggleLoggedIn}
                isRegisterSuccess={isRegisterSuccess}
                toggleRegisterSuccess={toggleRegisterSuccess}
                setCurrentUser={setCurrentUser}
                registerHandler={registerHandler}
                signinHandler={signinHandler}
                getUserInfo={getUserInfo}
              />
            </Popup>
            : ""}

          {isRegisterSuccessPopupOpen
            ? <Popup
              isPopupOpen={isPopupOpen}
              togglePopup={togglePopup}
              toggleFormPopup={toggleFormPopup}
            >
              {isRegisterSuccess
                ?
                <>
                  <h2 className="popup__title">Registration completed successfully!</h2>
                  <button className="popup__swap-form-text popup__swap-form-button" onClick={registrationSuccessToSignin}>Sign in</button>
                </>
                :
                <>
                  <h2 className="popup__title">Oops! Something went wrong</h2>
                  <button className="popup__swap-form-text popup__swap-form-button" onClick={registrationFailRedirect}>Try again</button>
                </>
              }

            </Popup>
            : ""}

        </div>
      </div>
    </CurrentUserContext.Provider>
      )
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          toggleLoggedIn(true);
          toggleServerError(false);
          return
        }

      })
      .catch((err) => {
        if (err === 'Error: 401') {
          toggleLoggedIn(false);
          toggleServerError(false);
        } else {
          toggleServerError(true);
          console.log(err);
          return
        }
      })
    }
    toggleLoggedIn(false);
    toggleServerError(false);
    return
  }, [])

  return checkIsLoggedInBeforeRender();
}

export default App;