import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Trees from "./components/Trees/Trees";
import Plates from "./components/Plates/Plates";
import Dedications from "./components/Dedications/Dedications";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/trees" element={<Trees />}></Route>
          <Route path="/dedications" element={<Dedications />}></Route>
          <Route path="/plates" element={<Plates />}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
