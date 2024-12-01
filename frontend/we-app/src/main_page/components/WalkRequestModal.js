import React from "react";
import "./WalkRequestModal.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const WalkRequestModal = ({ isVisible, onClose, onSubmit }) => {
  if (!isVisible) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="text">
          Please tell us your plans! State things like time span, type of walk,
          are you new to town?
        </div>
        <textarea className="textarea" placeholder="Add Text"></textarea>
        <div className="actions">
          <button className="button" onClick={onSubmit}>
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
