import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import CustomerDataEdit from "./components/CustomerDashboard/CustomerDataEdit/CustomerDataEdit";
import CustomerOrders from "./components/CustomerDashboard/CustomerOrders/CustomerOrders";
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
          <Route path="/dashboard" element={<CustomerDashboard />}></Route>
          <Route path="/dashboard/customerDataEdit" element={<CustomerDataEdit />} />
          <Route path="/dashboard/customerOrders" element={<CustomerOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
