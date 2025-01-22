import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  /**
   * State maintained for username and email
   */
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  /**
   * For navigating to dashboard
   */
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) =>
        (user?.username === identifier || user?.email === identifier) &&
        user?.password === password
    );

    console.log(storedUsers);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      onLogin(user.email, keepSignedIn); // Pass keepSignedIn state
      navigate("/dashboard");
    } else {
      alert("Invalid username/email or password!");
    }
  };

  return (
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
          <button className="social-btn">🔵</button>
          <button className="social-btn">f</button>
          <button className="social-btn">in</button>
          <button className="social-btn">🐦</button>
        </div>
      </div>
      <div className="login-image">
        <img
          src="/assets/img/Login_Illustration.svg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default Login;
