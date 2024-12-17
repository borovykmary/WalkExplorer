import React from "react";
import { ReactComponent as LogoIcon } from "../res/logo-we.svg";
import LandingBg from "../res/landing-bg.svg";

import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Landing.css";

function Landing() {
  return (
    <div className="app-container">
      <div className="background-image-container">
        <img src={LandingBg} alt="Background" className="background-image" />
      </div>
      <div className="content-container">
        <div className="logo-box">
          <LogoIcon className="logo-landing" />
        </div>

        <div className="landing-content">
          <h1>Introducing</h1>
          <h1 className="walk-explorer">Walk Explorer</h1>

          <p className="description">
            “Whether you’re a visitor or a local, Walk Explorer curates the
            perfect walking journey through Wrocław. Choose your interests, set
            your pace, and enjoy a route crafted just for you.”
          </p>
          <Link to="/login">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
