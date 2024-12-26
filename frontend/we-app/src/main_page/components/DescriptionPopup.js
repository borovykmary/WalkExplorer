import React from "react";
import { Popup } from "react-map-gl";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DescriptionPopup = ({ descriptionPopup, selectedRoute, onClose }) => {
  return (
    <Popup
      longitude={descriptionPopup.longitude}
      latitude={descriptionPopup.latitude}
      closeOnClick={true}
      onClose={onClose}
      className="custom-popup"
      closeButton={false}
    >
      <div className="popup-content">
        {/* Header Section */}
        <div
          className="popup-header"
          style={{
            borderBottom: `4px solid ${selectedRoute.color}`,
            marginBottom: "10px",
            paddingBottom: "5px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              color: selectedRoute.color,
            }}
          >
            {descriptionPopup.name}
          </h3>
        </div>

        {/* Body Section */}
        <div className="popup-body">
          <p style={{ fontSize: "14px", margin: "0 0 10px 0" }}>
            {descriptionPopup.description}
          </p>
          <h4
            style={{
              fontSize: "14px",
              margin: "10px 0 5px",
              fontWeight: "600",
            }}
          >
            Waypoints:
          </h4>
          <ul style={{ padding: "0 15px", margin: 0, listStyle: "none" }}>
            <li style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>Start:</strong> your location
            </li>
            <li style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>Stop point:</strong> National Wroclaw Museum
            </li>
            <li style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>Stop point:</strong> Art monument "name"
            </li>
            <li style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>Food Stop:</strong> Seafood restaurant "Marine"
            </li>
            <li style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>End point:</strong> River Odra
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <button className="popup-button">
          Modify Route
          <ArrowForwardIcon fontSize="small" style={{ marginLeft: "5px" }} />
        </button>
      </div>
    </Popup>
  );
};

export default DescriptionPopup;
