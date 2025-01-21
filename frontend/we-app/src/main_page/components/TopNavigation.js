import React from "react";
import "./TopNavigation.css";
import { useNavigate } from "react-router-dom";

const TopNavigation = ({ closeMenu }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    closeMenu();
    navigate("/profile");
  };
  const LogOut = () => {
    closeMenu();
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const goToHomePage = () => {
    closeMenu();
    localStorage.removeItem("access_token");
    navigate("/");
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
          <div className="menu-item" onClick={goToHomePage}>
            Home Page
          </div>
          <div className="user-avatar">AB</div>
          <button className="logout-btn" onClick={LogOut}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
