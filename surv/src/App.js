import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Survey from "./components/Survey";
import Home from './components/Home';
import { Link } from '@mui/material';
import Bottom from "./components/Bottom";



function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
        <Bottom />
      </BrowserRouter>
    </div>
  )
  

}

export default App;
