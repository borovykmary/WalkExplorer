import React, { useState, useEffect } from "react";
import "./FavouritesModal.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const FavouritesModal = ({
  isVisible,
  onClose,
  onSelectRoute,
  onDeleteRoute,
}) => {
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);

  const fetchSavedRoutes = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Access token:", token);
      const response = await fetch("http://localhost:8000/api/routes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched saved routes:", data);
      if (data.routes) {
        const colors = ["#5C4FA1", "#8DAD78", "#BB088B"];
        let colorIndex = 0;
        const routes = data.routes
          .map((route) => {
            const color = colors[colorIndex % colors.length];
            colorIndex++;
            let path, mainWaypoints;
            try {
              path = JSON.parse(route.path);
              mainWaypoints = JSON.parse(route.mainWaypoints);
            } catch (parseError) {
              console.error("Error parsing route data:", parseError);
              return null;
            }
            console.log("path :", path);
            console.log("mainWaypoints :", mainWaypoints);
            return {
              routeId: route.route_id,
              name: route.title,
              description: route.description,
              path: path,
              mainWaypoints: mainWaypoints,
              color: color,
            };
          })
          .filter((route) => route !== null);
        setSavedRoutes(routes);
      } else {
        console.error("No routes found in the response.");
      }
    } catch (error) {
      console.error("Error fetching saved routes:", error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchSavedRoutes();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const confirmDelete = (route) => {
    setRouteToDelete(route);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/routes/${routeToDelete.routeId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        onDeleteRoute(routeToDelete.routeId);
        setRouteToDelete(null);
        fetchSavedRoutes();
      } else {
        console.error("Failed to delete the route");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <button
              onClick={() => {
                handleDelete();
                setRouteToDelete(null);
                fetchSavedRoutes();
              }}
            >
              Confirm
            </button>
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
            <button
              onClick={() => {
                onSelectRoute(selectedRoute);
                setSelectedRoute(null);
                onClose();
              }}
            >
              Select
            </button>
            <CloseIcon className="close-icon" onClick={handleBack} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesModal;
