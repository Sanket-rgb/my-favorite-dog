import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";

function Login() {
  const name = useRef();
  const email = useRef();

  const [error, setError] = useState();

  const navigate = useNavigate();

  const checkFieldValidation = () => {
    if (!name.current.value && !email.current.value) {
      setError("Please enter name and email.");
    } else if (name.current.value && !email.current.value) {
      setError("Please enter email.");
    } else if (!name.current.value && email.current.value) {
      setError("Please enter name.");
    }
  };

  const handleSubmit = async (e) => {
    checkFieldValidation();
    e.preventDefault();
    console.log(name.current.value, email.current.value);

    const baseUrl = "https://frontend-take-home-service.fetch.com";
    const endpoint = "/auth/login";

    const url = baseUrl + endpoint;

    const LoginData = { name: name.current.value, email: email.current.value };

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LoginData),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log(response);
      //   console.log(response.headers.get("Set-Cookie"));

      //   const authToken = response.headers.get("Set-Cookie");
      //   if (authToken && authToken.includes("fetch-access-token")) {
      //     console.log("Auth token:", authToken);
      //   }
      if (response.ok) {
        console.log("Login Successful");
        navigate(
          "/home",
          {
            state: {
              name: name.current.value,
            },
          }
          // { replace: true }
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit}>
          <label>Login</label>
          <input
            type="text"
            ref={name}
            placeholder="Name"
            onChange={() => setError("")}
          ></input>
          <input
            type="email"
            ref={email}
            placeholder="Email"
            onChange={() => setError("")}
          ></input>
          {error && <h6>{error}</h6>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
