import React from "react";
import { Form } from "react-router-dom";
import useInput from "../hooks/use-input";
import styles from "../Styles/Login.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@") && value.includes(".com");
function Authentication() {
  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (userNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const userNameClasses = userNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <div className={styles["login__container"]}>
      <div className={styles["login__container_form"]}>
        <Form method="post">
          <label>Login</label>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userNameValue}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
          ></input>
          {userNameHasError && (
            <p className="error-text">Please enter a user name.</p>
          )}
          <label htmlFor="email">E-mail Address</label>
          <input
            type="text"
            id="email"
            name="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
          {emailHasError && (
            <p className="error-text">Please enter an Email.</p>
          )}
          <button disabled={!formIsValid}>Login</button>
        </Form>
      </div>
    </div>
  );
}

export default Authentication;
