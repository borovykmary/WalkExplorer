import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import profilePic from "./R.png";
import editIcon from "./edit.jpg";
import backIcon from "./thin_ar.jpg";
import favoriteRoutesIcon from "./thik_ar.jpg";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(""); // Initially empty
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
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        } else if (response.ok) {
          return response.json();
        } else {
          return response.text(); // Log non-JSON responses
        }
      })
      .then((data) => {
        console.log("Fetched Profile Data:", data); // Debugging
        if (typeof data === "string") {
          console.log("Error response:", data); // Log HTML or plain text response
        } else {
          // Correctly set state
          setUsername(data.username || ""); // Ensure empty username is handled
          setEmail(data.email);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        navigate("/login");
      });
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmChanges = () => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:8000/api/profile/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ username }), // Only sending the username
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false);
          return response.json();
        } else {
          throw new Error("Failed to update username.");
        }
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => console.error("Error updating profile:", error));
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
          onClick={handleEditClick}
        />
      </div>

      {/* User Info Section */}
      {isEditing ? (
        <div className="user-info">
          {/* Username Section */}
          <div className="username-section">
            <h2 className="username-title">Username</h2>
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
                placeholder="Set your username"
              />
            ) : (
              <p className="username-value">
                {username || "No username set. Click edit to set one."}
              </p>
            )}
          </div>

          {/* Email Section */}
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
          {/* Username Section */}
          <div className="username-section">
            <h2 className="username-title">Username</h2>
            <p className="username-value">
              {username || "No username set. Click edit to set one."}
            </p>
          </div>

          {/* Email Section */}
          <div className="email-section">
            <h2 className="email-title">Email</h2>
            <p className="email-value">{email || "No email found."}</p>{" "}
            {/* Proper email rendering */}
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
