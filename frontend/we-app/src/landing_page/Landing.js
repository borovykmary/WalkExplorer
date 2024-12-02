import React from "react";
import logo from "../logo.png"; // Adjust relative path
import woodenSign from "./Woden_sign.png"; // Adjust relative path

import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Landing.css";

function Landing() {
  return (
    <div className="app-container">
      {/* Logo Section */}
      <div className="logo-box">
        <img src={logo} alt="Walk Explorer Logo" className="logo" />
      </div>

      {/* Menu Icon */}
      <div
        className="menu-icon"
        onClick={() => (window.location.href = "/profile")}
      >
        ☰
      </div>

      {/* Main Content */}
      <div className="landing-content">
        <h1>
          Introducing <span className="walk-explorer">Walk Explorer</span>
        </h1>

        <p>
          “Whether you’re a visitor or a local, Walk Explorer curates the
          perfect walking journey through Wrocław. Choose your interests, set
          your pace, and enjoy a route crafted just for you.”
        </p>
        <Link to="/login">
          <button className="get-started-btn">Get Started</button>
        </Link>

        {/* Wooden Sign and Orange Circle */}
        <div className="visual-container">
          <div className="orange-circle"></div>
          <img src={woodenSign} alt="Wooden Sign" className="wooden-sign" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
