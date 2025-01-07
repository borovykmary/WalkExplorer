import React, { useState } from "react";
import axios from "axios";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const WalkRequestModal = ({ isVisible, onClose, onRouteGenerated }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [walkType, setWalkType] = useState("Thematic Walk");
  const [timeSpan, setTimeSpan] = useState("Time Span");
  const [showOtherMessage, setShowOtherMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isVisible) return null;
  const colors = ["#FFD700", "#0000FF", "#E94B3E"];
  let colorIndex = 0;

  const handleSubmit = async () => {
    if (!userInput) {
      setErrorMessage("Please fill in the input field.");
      return;
    }
    setLoading(true);

    const requestData = {
      user_input: userInput,
      route_style: walkType,
      route_time: timeSpan,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate_route/",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Generated Route:", response.data);

      if (response.data.routes) {
        const routes = response.data.routes.map((route) => {
          const color = colors[colorIndex % colors.length];
          colorIndex++;
          const mainWaypoints = [
            [route.start.longitude, route.start.latitude],
            ...route.waypoints.map((wp) => [wp.longitude, wp.latitude]),
            [route.endpoint.longitude, route.endpoint.latitude],
          ];
          return {
            name: route.title,
            description: route.description,
            path: mainWaypoints,
            mainWaypoints: mainWaypoints,
            color: color,
          };
        });

        onRouteGenerated(routes);
        onClose();
      } else {
        console.error("No routes found in the response.");
      }
    } catch (error) {
      console.error("Error generating route:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleTimeSpanChange = (e) => {
    const value = e.target.value;
    setTimeSpan(value);
    if (value === "Other") {
      setShowOtherMessage(true);
    } else {
      setShowOtherMessage(false);
    }
  };
  const handleWalkTypeChange = (e) => {
    const value = e.target.value;
    setWalkType(value);
    if (value === "Other") {
      setShowOtherMessage(true);
    } else {
      setShowOtherMessage(false);
    }
  };
  const handleClose = () => {
    if (userInput || walkType !== "Thematic Walk" || timeSpan !== "Time Span") {
      setShowConfirmation(true);
    } else {
      resetFields();
      onClose();
    }
  };
  const confirmClose = () => {
    resetFields();
    setShowConfirmation(false);
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmation(false);
  };

  const resetFields = () => {
    setUserInput("");
    setWalkType("Thematic Walk");
    setTimeSpan("Time Span");
    setShowOtherMessage(false);
    setErrorMessage("");
  };

  return (
    <div className="overlay">
      <div className="modal">
        <>
          <div className="text">
            Please tell us your plans! State things like time span, type of
            walk, are you new to town? Share all the details, I will help you to
            make a pleasant trip.
          </div>
          <div className="dropdown-container">
            <select
              className="dropdown"
              value={walkType}
              onChange={handleWalkTypeChange}
            >
              <option value="Thematic Walk">Thematic Walk</option>
              <option value="Historical">Historical</option>
              <option value="Nature-themed">Nature-themed</option>
              <option value="Modern">Modern</option>
              <option value="Art-themed">Art-themed</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="dropdown-2"
              value={timeSpan}
              onChange={handleTimeSpanChange}
            >
              <option value="Time Span">Time Span</option>
              <option value="30 min">30 min</option>
              <option value="1 hour">1 hour</option>
              <option value="1,5 hour">1,5 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="2 hours">2,5 hours</option>
              <option value="2 hours">3 hours</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {showOtherMessage && (
            <div className="message">
              If you select option 'Other' you should provide this information
              in the input.
            </div>
          )}
          <textarea
            className="textarea"
            placeholder="Add Text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </>
        {errorMessage && <div className="message">{errorMessage}</div>}

        <div className="actions">
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <button className="button-lets-walk" onClick={handleSubmit}>
              Let's go!
              <ArrowForwardIcon fontSize="small" />
            </button>
          )}
          <button className="closeButton" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-text">
              You have unsaved changes. Are you sure you want to close?
            </div>
            <div className="confirmation-actions">
              <button className="confirm-button" onClick={confirmClose}>
                Yes
              </button>
              <button className="cancel-button" onClick={cancelClose}>
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WalkRequestModal;
