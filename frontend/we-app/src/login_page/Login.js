import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../res/logo-we.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      alert("Logging in...");
    } else {
      alert("Please enter both email and password.");
    }
  };

  const handleGuest = () => {
    navigate("/main");
  };

  return (
    <div className="app-container">
      <LogoIcon className="logo"> </LogoIcon>
      <div className="welcome-text">Welcome to Walker Explorer!</div>
      <input
        type="email"
        className="input-field"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button login-btn" onClick={handleLogin}>
        Log In
      </button>
      <button className="button guest-btn" onClick={handleGuest}>
        Continue as Guest
      </button>
      <div className="forgot-password-link">
        <p>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
