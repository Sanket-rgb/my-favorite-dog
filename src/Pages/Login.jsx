import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";

function Login() {
  const name = useRef("");
  const email = useRef("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
          "/home"
          // { replace: true }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" ref={name}></input>
          <label>Email</label>
          <input type="email" ref={email}></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
