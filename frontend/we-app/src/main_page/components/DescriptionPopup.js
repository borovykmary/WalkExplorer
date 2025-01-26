import React, { useEffect, useState } from "react";
import { Popup } from "react-map-gl";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const fetchAddress = async (longitude, latitude) => {
  const mapboxToken =
    "pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A";

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
  );
  const data = await response.json();
  if (data.features && data.features.length > 0) {
    const place = data.features[0];
    const name = place.text;
    const postcode = place.context.find((c) =>
      c.id.startsWith("postcode")
    ).text;
    return `${name}, ${postcode}`;
  }
  return "Unknown location";
};
const DescriptionPopup = ({
  descriptionPopup,
  selectedRoute,
  onClose,
  handleProceed,
  viewMode,
  handleGoBack,
  handleConfirmSelection,
}) => {
  const [waypointAddresses, setWaypointAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await Promise.all(
        descriptionPopup.mainWaypoints.map(async (waypoint) => {
          const address = await fetchAddress(waypoint[0], waypoint[1]);
          return address;
        })
      );
      setWaypointAddresses(addresses);
    };

    fetchAddresses();
  }, [descriptionPopup]);

  return (
    <>
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
            <div className="waypoints">
              <h4>Waypoints:</h4>
              <ul>
                {waypointAddresses.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            </div>
          </div>

          {viewMode === "default" ? (
            <button className="popup-button" onClick={handleProceed}>
              Proceed
              <ArrowForwardIcon
                fontSize="small"
                style={{ marginLeft: "5px" }}
              />
            </button>
          ) : (
            <div className="button-container-dp">
              <button className="popup-button-goback" onClick={handleGoBack}>
                Go Back
              </button>
              <button
                className="popup-button-confirm"
                onClick={handleConfirmSelection}
              >
                Confirm Selection
              </button>
            </div>
          )}
        </div>
      </Popup>
    </>
  );
};

export default DescriptionPopup;
