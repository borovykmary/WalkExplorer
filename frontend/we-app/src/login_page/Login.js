import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle the "Log In" button click
  const handleLogin = () => {
    if (email && password) {
      alert("Logging in...");
      // Add logic for logging in (e.g., API call)
    } else {
      alert("Please enter both email and password.");
    }
  };

  // Handle "Continue as Guest" button click
  const handleGuest = () => {
    navigate("/map"); // Redirect to the Map page
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Walk Explorer Logo" className="logo" />
      <h2 className="welcome-text">Welcome to Walker Explorer!</h2>
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
          <Link to="/register">Don't have an account? Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
