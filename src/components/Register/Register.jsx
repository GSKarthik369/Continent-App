import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long, contain at least 1 capital letter, 1 number, and 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const usernameExists = storedUsers.some((user) => user.username === username);
    const emailExists = storedUsers.some((user) => user.email === email);

    if (usernameExists) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    if (emailExists) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Create an Account</h2>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
      </div>
      <div className="register-image">
        <img
          src="https://via.placeholder.com/300x400?text=Illustration"
          alt="Register Illustration"
        />
      </div>
    </div>
  );
};

export default Register;
