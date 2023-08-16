import React from "react";
import { json, redirect } from "react-router-dom";
import Authentication from "../components/Authentication";

function LoginPage() {
  return <Authentication />;
}

export default LoginPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const loginData = {
    name: data.get("username"),
    email: data.get("email"),
  };

  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not login" }, { status: response.status });
  }

  return redirect("/home");
}
