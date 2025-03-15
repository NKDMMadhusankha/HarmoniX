import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register"; 

const Home = () => <h1>Welcome to Home Page</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default Home Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
