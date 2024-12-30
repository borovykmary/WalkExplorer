import React from "react";
import "./FavouritesModal.css";

const FavouritesModal = ({
  isVisible,
  onClose,
  savedRoutes,
  onSelectRoute,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fav-modal-overlay">
      <div className="fav-modal-content">
        <div className="fav-modal-header">
          <h2>Favourite Routes</h2>
          <button className="fav-close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="fav-modal-body">
          {savedRoutes.length > 0 ? (
            savedRoutes.map((route, index) => (
              <div
                key={index}
                className="route-item"
                onClick={() => onSelectRoute(route)}
              >
                <h3>{route.name}</h3>
                <p>{route.description}</p>
              </div>
            ))
          ) : (
            <p>No saved routes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesModal;
