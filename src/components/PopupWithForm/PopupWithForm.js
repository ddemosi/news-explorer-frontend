import React, { useState, useRef } from 'react';
import validator from 'validator';

const PopupWithForm = (props) => {

  // State constants
  const [submitActive, toggleSubmitButton] = useState(false);
  const [isRegisterSuccess, toggleRegisterSuccess] = useState(false);

  // Ref assignments
  const emailRef = useRef('')
  const passwordRef = useRef('');
  const nameRef = useRef('');


  function closePopup() {
    props.togglePopup(false);
  }

  function toggleRegisterPopup() {
    props.toggleIsRegisterPopup(!props.isRegisterPopup);
  }

  function handleSignin() {
    props.toggleLoggedIn(true);
    closePopup();
  }

  function handleRegister() {
    toggleRegisterSuccess(true);
    props.toggleLoggedIn(true);
  }

  function isRegister() {
    if (props.isRegisterPopup) {
      return (
        <>
        <h2 className="popup__title">Sign up</h2>
        <form className="popup__form popup__form_register form">
          <label className="form__label" htmlFor="register-email">Email</label>
          <input className="form__input" type="email" id="register-email" ref={emailRef} placeholder="Email"></input>
          {}
          <span className="form__error">error</span>
          <label className="form__label" htmlFor="register-password">Password</label>
          <input className="form__input" type="password" id="register-password" ref={passwordRef} placeholder="Password"></input>
          <span className="form__error">error</span>
          <label className="form__label" htmlFor="register-username">Username</label>
          <input className="form__input" type="text" id="register-username" ref={nameRef} placeholder="Username"></input>
          <span className="form__error">error</span>
        </form>
        <button onClick={handleRegister} className={`popup__submit ${submitActive ? 'popup__submit_active' : ''}`}>{props.isRegisterPopup ? "Sign up" : "Sign in"}</button>
          <p className="popup__swap-form-text">or <button onClick={toggleRegisterPopup} className="popup__swap-form-button">Sign in</button></p>
        </>
      )
    } else {
      return (
        <>
        <h2 className="popup__title">Sign in</h2>
        <form className="popup__form popup__form_signin form">
          <label className="form__label" htmlFor="register-email">Email</label>
          <input className="form__input" type="email" id="register-email" ref={emailRef} placeholder="Email"></input>
          <span className="form__error">error</span>
          <label className="form__label" htmlFor="register-password">Password</label>
          <input className="form__input" type="password" id="register-password" ref={passwordRef} placeholder="Password"></input>
          <span className="form__error">error</span>
        </form>
        <button onClick={handleSignin} className={`popup__submit ${submitActive ? 'popup__submit_active' : ''}`}>{props.isRegisterPopup ? "Sign up" : "Sign in"}</button>
          <p className="popup__swap-form-text">or <button onClick={toggleRegisterPopup} className="popup__swap-form-button">Sign up</button></p>
        </>
      )
    }
  }

  return (
    <section className={`modal ${props.isPopupOpen ? 'modal_visible' : ''}`}>
      <div className={`popup ${props.isPopupOpen ? 'popup_visible' : ''}`}>
        <div className="form-width">
          <i className="popup__exit" onClick={closePopup}></i>
          {isRegister()}
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;