import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/Authentication/auth";
import styles from "../Styles/Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    validateUsername();
    validateEmail();
    e.preventDefault();

    const params = {
      name: username,
      email,
    };
    const response = await login(params);

    if (response.ok) {
      navigate("/home", {
        state: {
          name: username,
        },
        replace: true,
      });
    } else {
      window.alert("Error : Status Code " + response.status);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit}>
          <label>Login</label>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validateUsername}
          ></input>
          {usernameError && <h6 className="error">{usernameError}</h6>}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          ></input>
          {emailError && <h6 className="error">{emailError}</h6>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
