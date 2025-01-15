import React, { useState } from "react";
import "./FavouritesModal.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const FavouritesModal = ({
  isVisible,
  onClose,
  savedRoutes,
  onSelectRoute,
  onDeleteRoute,
}) => {
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  if (!isVisible) return null;

  const confirmDelete = (route) => {
    setRouteToDelete(route);
  };

  const handleDelete = () => {
    onDeleteRoute(routeToDelete);
    setRouteToDelete(null);
  };
  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
  };

  const handleBack = () => {
    setSelectedRoute(null);
  };

  return (
    <div className="fav-modal-overlay">
      <div className="fav-modal-content">
        <div className="fav-modal-header">
          <h2>Favourite Routes</h2>
          <CloseIcon className="fav-close-button" onClick={onClose} />
        </div>
        <div className="fav-modal-body">
          {savedRoutes.length > 0 ? (
            savedRoutes.map((route, index) => (
              <div
                key={index}
                className="route-item"
                onClick={() => handleSelectRoute(route)}
              >
                <div className="route-info">
                  <h3>{route.name}</h3>
                  <p>{route.description}</p>
                </div>
                <DeleteIcon
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(route);
                  }}
                />
              </div>
            ))
          ) : (
            <p>No saved routes available.</p>
          )}
        </div>
      </div>
      {routeToDelete && (
        <div className="confirm-delete-overlay">
          <div className="confirm-delete-content">
            <p>Are you sure you want to delete this route?</p>
            <button onClick={handleDelete}>Confirm</button>
            <CloseIcon
              className="close-icon"
              onClick={() => setRouteToDelete(null)}
            />
          </div>
        </div>
      )}
      {selectedRoute && (
        <div className="route-detail-overlay">
          <div className="route-detail-content">
            <h3>{selectedRoute.name}</h3>
            <p>{selectedRoute.description}</p>
            <button onClick={() => onSelectRoute(selectedRoute)}>Select</button>
            <CloseIcon className="close-icon" onClick={handleBack} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesModal;
