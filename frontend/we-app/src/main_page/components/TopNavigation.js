import React from "react";
import "./TopNavigation.css";
import { useNavigate } from "react-router-dom";

const TopNavigation = ({ closeMenu }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    closeMenu();
    navigate("/profile");
  };

  return (
    <>
      <div className="menu-overlay" onClick={closeMenu}></div>

      <div className="slide-menu open">
        <button className="close-btn" onClick={closeMenu}>
          ×
        </button>
        <div className="menu-content">
          <div className="menu-item" onClick={goToProfile}>
            Profile Settings
          </div>
          <div className="menu-item">Home Page</div>
          <button className="logout-btn">Log Out</button>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
