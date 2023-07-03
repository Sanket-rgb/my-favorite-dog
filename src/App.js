import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        {/* Error route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
