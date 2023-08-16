import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>{error.status}</h1>
      <p>{error.data.message}</p>
    </>
  );
}

export default ErrorPage;
