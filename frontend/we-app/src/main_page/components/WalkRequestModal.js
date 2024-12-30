import React, { useState } from "react";
import axios from "axios";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const WalkRequestModal = ({ isVisible, onClose, onRouteGenerated }) => {
  const [userInput, setUserInput] = useState("");

  if (!isVisible) return null;

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/generate_route/", userInput, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      console.log("Generated Route:", response.data);
      onRouteGenerated(response.data);
    } catch (error) {
      console.error("Error generating route:", error);
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