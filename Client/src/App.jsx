import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register"; 
import Login from "./Components/Login";
import Home from "./Home";
import AboutUs from "./Components/AboutUs";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
};

export default App;
