import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Popup from '../Popup/Popup';



const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, toggleLoggedIn] = useState(false);
  const [isRegisterPopup, toggleIsRegisterPopup] = useState(false);
  const [isPopupOpen, togglePopup] = useState(false);
  const [isFormPopupOpen, toggleFormPopup] = useState(false);
  const [isRegisterSuccessPopupOpen, toggleRegisterSuccessPopup] = useState(false);
  const [isRegisterSuccess, toggleRegisterSuccess] = useState(false);

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
                />

                <Main
                  isLoggedIn={isLoggedIn}
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
                />

                <SavedNewsHeader />

                <SavedNews
                  isLoggedIn={isLoggedIn}
                />

                <Footer />

              </Route>
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
  );
}

export default App;