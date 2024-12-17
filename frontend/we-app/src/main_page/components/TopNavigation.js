import React from "react";
import "./TopNavigation.css";

const TopNavigation = ({ closeMenu }) => {
  return (
    <>
      <div className="menu-overlay" onClick={closeMenu}></div>

      <div className="slide-menu open">
        <button className="close-btn" onClick={closeMenu}>
          ×
        </button>
        <div className="menu-content">
          <div className="menu-item">Profile Settings</div>
          <div className="menu-item">Home Page</div>
          <div className="user-avatar">AB</div>
          <button className="logout-btn">Log Out</button>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
