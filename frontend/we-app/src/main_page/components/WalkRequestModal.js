import React, { useState } from "react";
import axios from "axios";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const WalkRequestModal = ({ isVisible, onClose, onRouteGenerated }) => {
  const [userInput, setUserInput] = useState("");

  if (!isVisible) return null;

  /* const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate_route/",
        { user_input: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Generated Route:", response.data);
      // Handle the response data as needed
      if (response.data.route) {
        onClose();
        alert("Route generated! Check the map."); // Placeholder for now
      }
    } catch (error) {
      console.error("Error generating route:", error);
    }
  };
  */
  const handleSubmit = () => {
    const mockResponse = {
      routes: [
        {
          geometry: {
            coordinates: [
              [17.020462, 51.094802],
              [17.022123, 51.095678],
              [17.024567, 51.096789],
              [17.0289, 51.097456],
              [17.0315, 51.1083], // Waypoint
              [17.037, 51.1105], // Endpoint
            ],
          },
          distance: 5000,
          duration: 3600,
        },
      ],
      waypoints: [
        { location: [17.020462, 51.094802], name: "Start Point" },
        { location: [17.0315, 51.1083], name: "Waypoint" },
        { location: [17.037, 51.1105], name: "End Point" },
      ],
    };

    console.log("Mocked Route:", mockResponse);

    // Simulate API response
    const coordinates = mockResponse.routes[0]?.geometry?.coordinates;

    if (coordinates) {
      onRouteGenerated(coordinates); // Pass mock data to Main.js
      onClose(); // Close the modal
    } else {
      console.error("Mock data error: no coordinates found.");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="text">
          Please tell us your plans! State things like time span, type of walk,
          are you new to town?
        </div>
        <textarea
          className="textarea"
          placeholder="Add Text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <div className="actions">
          <button className="button" onClick={handleSubmit}>
            Lets go! <ArrowForwardIcon fontSize="small" />
          </button>
          <button className="closeButton" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkRequestModal;
