import React, { useState } from "react";
import axios from "axios";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const WalkRequestModal = ({ isVisible, onClose, onRouteGenerated }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [walkType, setWalkType] = useState("Thematic Walk");
  const [timeSpan, setTimeSpan] = useState("Time Span");
  const [additionalInput, setAdditionalInput] = useState("");
  const [showOtherMessage, setShowOtherMessage] = useState(false);

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
  */
  const handleSubmit = async () => {
    if (step === 1) {
      setLoading(true);

      // Prepare the request payload
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

        // Handle the response data
        if (response.data.routes) {
          const routes = response.data.routes.map((route) => ({
            name: route.title,
            description: route.description,
            path: [
              [route.start.longitude, route.start.latitude],
              ...route.waypoints.map((wp) => [wp.longitude, wp.latitude]),
              [route.endpoint.longitude, route.endpoint.latitude],
            ],
            color: "#FFD700", // You can customize the color as needed
          }));

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
    } else if (step === 2) {
      // Handle additional input step if needed
      setStep(1); // Reset to step 1 for now
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
