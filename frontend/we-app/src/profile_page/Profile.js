import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [isFavoriteVisible, setIsFavoriteVisible] = useState(false);

  const toggleFavoriteRoutes = () => {
    setIsFavoriteVisible(!isFavoriteVisible);
  };

  return (
    <div className="app-container">
      {/* Profile Header */}
      <h1 className="profile-header">Profile</h1>

      {/* Profile Image Section */}
      <div className="profile-image-container">
        <img
          src="default-profile.jpg"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-image-upload">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">+</label>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="edit-profile">Edit</div>

      {/* Profile Info */}
      <div className="profile-info">
        <span className="profile-info-item">
          Username: <strong>user123</strong>
        </span>
        <span className="profile-info-item">
          Email: <strong>user123@example.com</strong>
        </span>
      </div>

      {/* Favorite Routes Section */}
      <div className="favorite-section">
        <span className="favorite-title" onClick={toggleFavoriteRoutes}>
          Favorite Routes
        </span>
        {isFavoriteVisible && (
          <div className="favorite-routes">
            <p>Route 1</p>
            <p>Route 2</p>
            <p>Route 3</p>
          </div>
        )}
      </div>

      {/* Log Out Button */}
      <button className="logout-btn">Log Out</button>
    </div>
  );
}

export default Profile;
