import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import CustomerDataEdit from "./components/CustomerDashboard/CustomerDataEdit/CustomerDataEdit";
import CustomerOrders from "./components/CustomerDashboard/CustomerOrders/CustomerOrders";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Order from "./components/Order/Order";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ScrollToTop from "./components/ScrollToTop";

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
          <Route path="/order" element={<Order />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/user" element={<UserDashboard />} />
          /*
          <Route path="/dashboard" element={<CustomerDashboard />}></Route>
          <Route
            path="/dashboard/customerDataEdit"
            element={<CustomerDataEdit />}
          />
          <Route
            path="/dashboard/customerOrders"
            element={<CustomerOrders />}
          />
          */
        </Routes>
      </div>
    </Router>
  );
}

export default App;
