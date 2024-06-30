import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import CustomerDataEdit from "./components/CustomerDashboard/CustomerDataEdit/CustomerDataEdit";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Order from "./components/Order/Order";
import Summary from "./components/Order/Summary/Summary";
import PasswordReminder from "./components/PasswordReminder/PasswordReminder";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import ScrollToTop from "./components/ScrollToTop";
import UserProtectedRoute from "./components/UserProtectedRoute/UserProtectedRoute";
import './tailwind.css';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordReminder" element={<PasswordReminder />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/user" element={<UserProtectedRoute><CustomerDashboard /></UserProtectedRoute>} />
          <Route path="/user/data" element={<UserProtectedRoute><CustomerDataEdit /></UserProtectedRoute>} />
          <Route path="/order/summary" element={<UserProtectedRoute><Summary /></UserProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;