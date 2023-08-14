import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <Login /> },
    {
      path: "home",
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
