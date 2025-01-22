import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LuFacebook } from "react-icons/lu";
import { CiTwitter } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { AiOutlineYoutube } from "react-icons/ai";
import Toast from "react-bootstrap/Toast";
import "./Login.css";

const Login = ({ onLogin }) => {
  const LOG_ENABLED = false;
  /**
   * State maintained for username and email
   */
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [toastType, setToastType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  /**
   * For navigating to dashboard
   */
  const navigate = useNavigate();

  const toPascalCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Check if the user is there in the stored data
     */
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) =>
        (user?.username === identifier || user?.email === identifier) &&
        user?.password === password
    );

    LOG_ENABLED && console.log(storedUsers);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setShow(true);
      setShowMsg("Login successful!");
      setToastType("success");
      /**
       * Login details
       */
      onLogin(user.email, keepSignedIn);
      navigate("/dashboard");
    } else {
      setShow(true);
      setShowMsg("Invalid username/email or password! Please Sign up");
      setToastType("warning");
    }
  };

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
    <div className="login-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <p>
          New user? <a href="/register">Create an account</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username or Email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />{" "}
              Keep me signed in
            </label>
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <div className="divider">
          <span>Or Sign In With</span>
        </div>
        <div className="social-login">
            <button className="social-btn">
              <LuFacebook />
            </button>
            <button className="social-btn">
              <CiTwitter />
            </button>
            <button className="social-btn">
              <SlSocialLinkedin />
            </button>
            <button className="social-btn">
              <AiOutlineYoutube />
            </button>
        </div>
      </div>
      <div className="login-image">
        <img
          src="/assets/img/Login_Illustration.svg"
          alt="Login Illustration"
        />
      </div>
    </div>
    </Fragment>
  );
};

export default Login;
