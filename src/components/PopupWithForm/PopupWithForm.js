import React, { useState, useRef } from 'react';
import validator from 'validator';

import api from '../../utils/MainApi';

const PopupWithForm = (props) => {

  // State constants

  const [errors, setErrors] = useState({});
  const [signinFailed, toggleSigninFailed] = useState(false);
  const [badRequest, toggleBadRequest] = useState(false);

  // Ref assignments

  const emailRef = useRef()
  const passwordRef = useRef();
  const nameRef = useRef();

  // Submit handlers

  function handleRegisterSubmit(e) {
    e.preventDefault();

    api.register(
      emailRef.current.value,
      passwordRef.current.value,
      nameRef.current.value)
      .then((res) => {
        if (res) {
          // Toggle states for register success popup
          props.toggleRegisterSuccess(true);
          props.toggleFormPopup(false);
          props.toggleRegisterSuccessPopup(true);
        } else {
          // Toggle states for register failure popup
          props.toggleRegisterSuccess(false);
          props.toggleFormPopup(false);
          props.toggleRegisterSuccessPopup(true);
        }
      })
      .catch((err) => {
        // Toggle states for register failure popup

        props.toggleRegisterSuccess(false);
        props.toggleFormPopup(false);
        props.toggleRegisterSuccessPopup(true);

        console.log(err);
      })
  }

  function handleSigninSubmit(e) {
    e.preventDefault()
    api.signin(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        if (res) {
          api.getUserInfo()
            .then((res) => {
              props.setCurrentUser(res);
            })
            .then(() => {
              emailRef.current.value = "";
              passwordRef.current.value = "";
              toggleSigninFailed(false);
              props.toggleFormPopup(false);
              props.toggleLoggedIn(true);
              closePopup();
            })
        }
        else {
          toggleSigninFailed(true);
          toggleBadRequest(true);
        }
      })
      .catch((err) => {
        if (err === "Error: 400") {
          toggleSigninFailed(true);
          toggleBadRequest(true);
        } else {
          toggleSigninFailed(true);
          console.log(err);
        }
      })
  }

  // Input validation

  function validateInputs(email, password, username = null) {

    const errors = {};

    if (!email || !validator.isEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is a required field";
    } else if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      errors.password = "Password must be at least 8 characters and contain a number and a capital letter.";
    }

    if (username === null) {

    } else if (!username) {
      errors.username = "Username is a required field.";
    } else if (username.length < 5) {
      errors.username = "Username must be at least 6 characters";
    }

    return errors;
  }

  function registerFormOnChange() {
    const validatedInputs = validateInputs(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
    if (Object.keys(validatedInputs).length === 0) {
      setErrors(false);
      return
    }
    setErrors(validatedInputs);
    return
  }

  function signinFormOnChange() {
    const validatedInputs = validateInputs(emailRef.current.value, passwordRef.current.value)
    if (Object.keys(validatedInputs).length === 0) {
      setErrors(false);
      return
    }

    setErrors(validatedInputs);
    return
  }

  // Misc utility functions (toggling popups, conditional rendering, etc)

  function closePopup() {
    props.togglePopup(false);
  }

  function toggleRegisterPopup() {
    toggleBadRequest(false);
    props.toggleIsRegisterPopup(!props.isRegisterPopup);
  }

  // Conditional rendering of Sign up or Sign in form

  function isRegister() {
    if (props.isRegisterPopup) {
      return (
        <>
          <h2 className="popup__title">Sign up</h2>
          <form onChange={() => registerFormOnChange()} onSubmit={handleRegisterSubmit} className="popup__form popup__form_register form">
            <label className="form__label" htmlFor="register-email">Email</label>
            <input className="form__input" type="email" id="register-email" ref={emailRef} placeholder="Email" required></input>
            {errors.email ? <span className="form__error">{errors.email}</span> : ''}

            <label className="form__label" htmlFor="register-password">Password</label>
            <input className="form__input" type="password" id="register-password" ref={passwordRef} placeholder="Password" required></input>
            {errors.password ? <span className="form__error">{errors.password}</span> : ''}

            <label className="form__label" htmlFor="register-username">Username</label>
            <input className="form__input" type="text" id="register-username" ref={nameRef} placeholder="Username" required></input>
            {errors.username ? <span className="form__error">{errors.username}</span> : ''}

            <button type="submit" className={`popup__submit ${!errors ? 'popup__submit_active' : ''}`}>{props.isRegisterPopup ? "Sign up" : "Sign in"}</button>
          </form>

          <p className="popup__swap-form-text">or <button onClick={toggleRegisterPopup} className="popup__swap-form-button">Sign in</button></p>
        </>
      )
    } else {
      return (
        <>
          <h2 className="popup__title">Sign in</h2>
          <form onChange={signinFormOnChange} onSubmit={handleSigninSubmit} className="popup__form popup__form_signin form">
            <label className="form__label" htmlFor="register-email">Email</label>
            <input className="form__input" type="email" id="register-email" ref={emailRef} placeholder="Email" required></input>
            {errors.email ? <span className="form__error">{errors.email}</span> : ''}

            <label className="form__label" htmlFor="register-password">Password</label>
            <input className="form__input" type="password" id="register-password" ref={passwordRef} placeholder="Password" required></input>
            {errors.password ? <span className="form__error">{errors.password}</span> : ''}

            {signinFailed ? <span className="form__error">{badRequest ? 'Invalid email or password' : 'Something went wrong, please try again'}</span> : ''}

            <button type="submit" className={`popup__submit ${!errors ? 'popup__submit_active' : ''}`}>{props.isRegisterPopup ? "Sign up" : "Sign in"}</button>
          </form>


          <p className="popup__swap-form-text">or <button onClick={toggleRegisterPopup} className="popup__swap-form-button">Sign up</button></p>
        </>
      )
    }
  }

  // Actual component, lol

  return (
    <>
      {props.isFormPopupOpen ? isRegister() : ""}
    </>
  );
}

export default PopupWithForm;