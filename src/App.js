import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for session in localStorage
    const session = localStorage.getItem("userSession");
    if (session) setIsAuthenticated(true);
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem("userSession", email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Provider>
  );
};

export default App;
