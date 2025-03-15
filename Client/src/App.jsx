import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register"; 
import LandingPage from "./Components/home";

const Home = () => <h1>Welcome to Home Page</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default Home Page */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<LandingPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
