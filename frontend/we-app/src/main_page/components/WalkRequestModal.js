import React, { useState } from "react";
// import axios from "axios";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const WalkRequestModal = ({ isVisible, onClose, onRouteGenerated }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [walkType, setWalkType] = useState("Thematic Walk");
  const [newToTown, setNewToTown] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");

  if (!isVisible) return null;

  /* const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate_route/",
        { user_input: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Generated Route:", response.data);
      onRouteGenerated(response.data);
      
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
    if (step === 1) {
      setLoading(true);

      // Simulate AI processing delay
      setTimeout(() => {
        setLoading(false);
        setStep(2); // Proceed to additional input step
      }, 2000);
    } else if (step === 2) {
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

      const coordinates = mockResponse.routes[0]?.geometry?.coordinates;

      if (coordinates) {
        onRouteGenerated(coordinates); // Pass mock data to Main.js
        onClose(); // Close the modal
      } else {
        console.error("Mock data error: no coordinates found.");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        {step === 1 && (
          <>
            <div className="text">
              Please tell us your plans! State things like time span, type of
              walk, are you new to town? Share all the details, I will help you
              to make a pleasant trip.
            </div>
            <select
              className="dropdown"
              value={walkType}
              onChange={(e) => setWalkType(e.target.value)}
            >
              <option value="Thematic Walk">Thematic Walk</option>
              <option value="Historical">Historical</option>
              <option value="Nature-themed">Nature-themed</option>
              <option value="Modern">Modern</option>
              <option value="Art-themed">Art-themed</option>
              <option value="Other">Other</option>
            </select>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={newToTown}
                onChange={(e) => setNewToTown(e.target.checked)}
              />
              New-to-town
            </label>
            <textarea
              className="textarea"
              placeholder="Add Text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text">
              You have not provided details about the time span. Would you like
              to stop at a café/restaurant?
            </div>
            <textarea
              className="textarea"
              placeholder="Add additional details here"
              value={additionalInput}
              onChange={(e) => setAdditionalInput(e.target.value)}
            ></textarea>
          </>
        )}

        <div className="actions">
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <button className="button-lets-walk" onClick={handleSubmit}>
              {step === 1 ? "Let's go!" : "Submit"}{" "}
              <ArrowForwardIcon fontSize="small" />
            </button>
          )}
          <button className="closeButton" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WalkRequestModal;
