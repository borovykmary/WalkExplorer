import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import profilePic from "./R.png"; // Replace with your profile photo image path
import editIcon from "./edit.jpg"; // Replace with your edit icon image path
import backIcon from "./thin_ar.jpg"; // Replace with your back icon image path
import favoriteRoutesIcon from "./thik_ar.jpg"; // Replace with your favorite routes button image path

function Profile() {
  // State variables for editing mode, user data, and file input for profile picture
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("User123");
  const [email, setEmail] = useState("user@example.com");
  const [profileImage, setProfileImage] = useState(profilePic);
  const [newImage, setNewImage] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmChanges = () => {
    setProfileImage(newImage || profilePic); // Use the new image or keep the existing one
    setIsEditing(false);
    // You can add additional logic to save the updated data (e.g., API call)
  };

  return (
    <div className="profile-container">
      {/* Top section with back button, profile picture, and edit button */}
      <div className="profile-header">
        <Link to="/map">
          <img src={backIcon} alt="Back" className="back-button" />
        </Link>
        <div className="profile-photo">
          <img
            src={newImage || profileImage} // Show new image if available
            alt="Profile"
            className="profile-photo-img"
          />
        </div>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-button"
          onClick={handleEditClick} // Trigger edit mode
        />
      </div>

      {/* User Info Section */}
      {isEditing ? (
        <div className="user-info">
          <div className="username-section">
            <h2 className="username-title">Username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
            />
          </div>
          <div className="email-section">
            <h2 className="email-title">Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>
          <div className="image-upload-section">
            <h2 className="image-title">Change Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
          </div>
          <div className="confirm-btn-container">
            <button
              className="button confirm-btn"
              onClick={handleConfirmChanges}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="user-info">
          <div className="username-section">
            <h2 className="username-title">Username</h2>
            <p className="username-value">{username}</p>
          </div>
          <div className="email-section">
            <h2 className="email-title">Email</h2>
            <p className="email-value">{email}</p>
          </div>
        </div>
      )}

      {/* Favorite Routes Section */}
      <div className="favorite-routes">
        <p className="favorite-routes-title">
          Favorite Routes
          <Link to="/favorite-routes">
            <img
              src={favoriteRoutesIcon}
              alt="Favorite Routes"
              className="favorite-routes-btn"
            />
          </Link>
        </p>
      </div>

      {/* Sign Out Button */}
      <button className="sign-out-btn">Sign Out</button>
    </div>
  );
}

export default Profile;
