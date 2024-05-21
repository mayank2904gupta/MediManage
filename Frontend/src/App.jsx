import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import axios from "axios";
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;