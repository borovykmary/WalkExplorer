import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Ensure you have Register.css file
import logo from "../logo.png"; // Correct path for logo

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = () => {
    if (email && password && repeatPassword) {
      if (password === repeatPassword) {
        alert("Registering...");
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="welcome-text">Welcome to Walker Explorer</h2>{" "}
      {/* Welcome message */}
      <input
        type="email"
        className="input-field"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <small className="input-helper-text">Enter your email</small>{" "}
      {/* Helper text for email */}
      <input
        type="password"
        className="input-field"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <small className="input-helper-text">Enter your password</small>{" "}
      {/* Helper text for password */}
      <input
        type="password"
        className="input-field"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <small className="input-helper-text">Enter password one more time</small>{" "}
      {/* Helper text for repeat password */}
      <button className="button login-btn" onClick={handleRegister}>
        Sign In
      </button>
      <div className="register-link">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>{" "}
        {/* Link to login page */}
      </div>
    </div>
  );
}

export default Register;
