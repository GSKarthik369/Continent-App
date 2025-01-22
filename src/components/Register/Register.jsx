import React, { useState, Fragment } from "react";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [toastType, setToastType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toPascalCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setShow(true);
      setShowMsg(
        "Password must be at least 8 characters long, contain at least 1 capital letter, 1 number, and 1 special character"
      );
      setToastType("warning");
      return;
    }

    if (password !== confirmPassword) {
      setShow(true);
      setShowMsg("Passwords do not match!");
      setToastType("warning");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const usernameExists = storedUsers.some(
      (user) => user.username === username
    );
    const emailExists = storedUsers.some((user) => user.email === email);

    if (usernameExists) {
      setShowMsg("Username already exists. Please choose a different one");
      setShow(true);
      setToastType("warning");
      return;
    }

    if (emailExists) {
      setShowMsg("Email already exists. Please choose a different one");
      setShow(true);
      setToastType("warning");
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    setShow(true);
    setShowMsg("Registration successful! Redirecting to sign in");
    setToastType("success");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  console.log(toastType)

  return (
    <Fragment>
      {/* Toast container */}
      <div className="toast-container">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          bg={toastType}
        >
          <Toast.Header>
            <strong className="me-auto">{toPascalCase(toastType)}</strong>
          </Toast.Header>
          <Toast.Body>{showMsg}</Toast.Body>
        </Toast>
      </div>
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
            src="/assets/img/Login_Illustration.svg"
            alt="Register Illustration"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
