import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import logo from "../logo.png"; // Ensure the logo path is correct

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (email) {
      alert("A password reset link has been sent to your email.");
      // Add logic to send password reset link (e.g., API call)
    } else {
      alert("Please enter your email.");
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Walk Explorer Logo" className="logo" />
      <h2 className="welcome-text">Forgot Password</h2>
      <p className="instruction-text">
        Enter your email below to receive a password reset link.
      </p>
      <input
        type="email"
        className="input-field"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="button reset-btn" onClick={handleResetPassword}>
        Reset Password
      </button>
      <div className="register-link">
        <p>
          Remembered your password? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
