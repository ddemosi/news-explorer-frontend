import React, { useEffect, useState, useCallback } from 'react';
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
import newsApi from '../../utils/NewsApi';



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
  const [isNavOpen, toggleNav] = useState(false);


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

  const handlePopup = useCallback(() => {
    togglePopup(true);
    toggleFormPopup(true);
    toggleIsRegisterPopup(false);
    toggleNav(false);
  }, [togglePopup, toggleFormPopup, toggleIsRegisterPopup, toggleNav])

  // api handlers

  async function getUserInfo() {
    const returnedUserInfo = await api.getUserInfo();
    return returnedUserInfo;
  }

  function registerHandler(email, password, name) {
    return api.register(email, password, name);
  }

  function signinHandler(email, password) {
    return api.signin(email, password);
  }

  function signoutHandler() {
    localStorage.clear();
    return api.signout();
  }

  function getUserArticles() {
    localStorage.removeItem('articles');
    return api.getArticles();
  }

  function deleteArticleHandler(id) {
    if (id) {
      localStorage.removeItem('articles');
      return api.deleteArticle(id);
    } else {
      throw new Error('card ID not submitted');
    }
  }

  function addArticleHandler(article) {
    if (article) {
      return api.addArticle(article);
    } else {
      throw new Error('No article submitted');
    }
  }

  async function searchHandler(keyword) {
    return newsApi.search(keyword);
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
                  handlePopup={handlePopup}
                  toggleNav={toggleNav}
                  isNavOpen={isNavOpen}
                />

                <Main
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  toggleIsLoading={toggleIsLoading}
                  isPopupOpen={isPopupOpen}
                  isFormPopupOpen={isFormPopupOpen}
                  togglePopup={togglePopup}
                  toggleFormPopup={toggleFormPopup}
                  getUserArticles={getUserArticles}
                  addArticleHandler={addArticleHandler}
                  searchHandler={searchHandler}
                  deleteArticleHandler={deleteArticleHandler}
                  handlePopup={handlePopup}
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
                  handlePopup={handlePopup}
                  toggleNav={toggleNav}
                  isNavOpen={isNavOpen}
                />

                <ProtectedRoute
                  component={SavedNews}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  toggleIsLoading={toggleIsLoading}
                  toggleFormPopup={toggleFormPopup}
                  togglePopup={togglePopup}
                  getUserArticles={getUserArticles}
                  deleteArticleHandler={deleteArticleHandler}
                  addArticleHandler={addArticleHandler}
                  handlePopup={handlePopup}
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
          toggleServerError(false);
          toggleLoggedIn(true);
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
      return;
    }
    toggleLoggedIn(false);
    toggleServerError(false);
    return;
  }, [])

  return checkIsLoggedInBeforeRender();
}

export default App;