import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import profilePic from "./R.png";
import editIcon from "./edit.jpg";
import backIcon from "./thin_ar.jpg";
import favoriteRoutesIcon from "./thik_ar.jpg";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(profilePic);
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name || "");
        setEmail(data.email || "");
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        navigate("/login");
      });
  }, [navigate]);

  const handleConfirmChanges = () => {
    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/api/profile/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ first_name: firstName }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to update profile.");
      })
      .then((data) => {
        setFirstName(data.first_name || firstName);
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  return (
    <div className="profile-container">
      {/* Top section */}
      <div className="profile-header">
        <Link to="/main">
          <img src={backIcon} alt="Back" className="back-button" />
        </Link>
        <div className="profile-photo">
          <img
            src={newImage || profileImage}
            alt="Profile"
            className="profile-photo-img"
          />
        </div>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-button"
          onClick={() => setIsEditing(true)}
        />
      </div>

      {/* User Info Section */}
      {isEditing ? (
        <div className="user-info">
          <div className="first-name-section">
            <h2 className="first-name-title">First Name</h2>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="first-name-input"
              placeholder="Set your first name"
            />
          </div>
          <div className="email-section">
            <h2 className="email-title">Email</h2>
            <p className="email-value">{email || "No email found."}</p>
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
          <div className="first-name-section">
            <h2 className="first-name-title">Username</h2>
            <p className="first-name-value">
              {firstName || "No username set. Click edit to set one."}
            </p>
          </div>
          <div className="email-section">
            <h2 className="email-title">Email</h2>
            <p className="email-value">{email || "No email found."}</p>
          </div>
        </div>
      )}

      {/* Favorite Routes Section 
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
      */}

      <button
        className="sign-out-btn"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
