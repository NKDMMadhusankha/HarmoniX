import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register"; 
import Login from "./Components/Login";
import Home from "./Home";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import MusicPro from "./Profiles/MusicPro";
import RegistationCatogary from "./Auth/RegistationCatogary";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/musicpro" element={<MusicPro />} />
        <Route path="/catogary" element={<RegistationCatogary />} />
        
      </Routes>
    </Router>
  );
};

export default App;
