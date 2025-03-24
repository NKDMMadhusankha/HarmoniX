import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register"; 
import Login from "./Components/Login";
import Home from "./Home";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
};

export default App;
