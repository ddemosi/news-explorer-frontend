import React, { useState, useRef } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import validator from 'validator';

const PopupWithForm = (props) => {

  // State constants

  const [errors, setErrors] = useState({});

  // Ref assignments
  const emailRef = useRef()
  const passwordRef = useRef();
  const nameRef = useRef();

  function handleRegisterSubmit(e) {
    e.preventDefault();
    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
    props.toggleRegisterSuccess(true);
    props.toggleFormPopup(false);
    props.toggleRegisterSuccessPopup(true);
  }

  function handleSigninSubmit(e) {
    e.preventDefault()
    emailRef.current.value = "";
    passwordRef.current.value = "";
    props.toggleFormPopup(false);
    props.toggleLoggedIn(true);
    closePopup();
  }

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

            <button type="submit" className={`popup__submit ${!errors ? 'popup__submit_active' : ''}`}>{props.isRegisterPopup ? "Sign up" : "Sign in"}</button>
          </form>

          <p className="popup__swap-form-text">or <button onClick={toggleRegisterPopup} className="popup__swap-form-button">Sign up</button></p>
        </>
      )
    }
  }

  return (
    <>
      {props.isFormPopupOpen ? isRegister() : ""}
    </>
  );
}

export default PopupWithForm;