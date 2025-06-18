import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Character from "./Pages/Character";
import Cast from "./Pages/Cast";

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cast" element={<Cast />} />
          <Route path="/cast/character/:id" element={<Character />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
