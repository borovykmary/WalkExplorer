import React from "react";
import { Popup } from "react-map-gl";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DescriptionPopup = ({
  descriptionPopup,
  selectedRoute,
  onClose,
  onModifyRoute,
}) => {
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

        <div className="popup-body">
          <p style={{ fontSize: "14px", margin: "0 0 10px 0" }}>
            {descriptionPopup.description}
          </p>
        </div>

        <button className="popup-button" onClick={onModifyRoute}>
          Modify Route
          <ArrowForwardIcon fontSize="small" style={{ marginLeft: "5px" }} />
        </button>
      </div>
    </Popup>
  );
};

export default DescriptionPopup;
