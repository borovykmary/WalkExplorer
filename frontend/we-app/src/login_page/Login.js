import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../logo.png"; // Adjust the path according to the folder structure

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    alert("Continuing as guest...");
    // Implement guest login logic here
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Walk Explorer Logo" className="logo" />
      <h2 className="welcome-text">Welcome to Walker Explorer!!!</h2>{" "}
      {/* Add welcome text here */}
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
          <Link to="/forgot-password">Forgot your password?</Link>{" "}
          {/* Link to Forgot Password page */}
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
