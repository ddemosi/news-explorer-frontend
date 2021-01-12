import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, toggleLoggedIn] = useState(false);
  const [isRegisterPopup, toggleIsRegisterPopup] = useState(false);
  const [isPopupOpen, togglePopup] = useState(false);

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
                  togglePopup={togglePopup}
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
          <PopupWithForm
            isRegisterPopup={isRegisterPopup}
            toggleIsRegisterPopup={toggleIsRegisterPopup}
            isPopupOpen={isPopupOpen}
            togglePopup={togglePopup}
            toggleLoggedIn={toggleLoggedIn}
          >

          </PopupWithForm>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;