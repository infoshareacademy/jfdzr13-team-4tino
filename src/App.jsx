import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";




function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
