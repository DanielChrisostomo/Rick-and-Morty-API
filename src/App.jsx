import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Character from './Components/Sections/Character';
import Cast from './Components/Sections/Cast';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cast" element={<Cast />} />
          <Route path="/cast/character/:id" element={<Character />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
