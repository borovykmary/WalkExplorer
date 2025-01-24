import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./ExportModal.css";

const ExportModal = ({ hideCheckbox, isLoggedIn, open, onClose, route }) => {
  const [addToFavourites, setAddToFavourites] = useState(false);
  const generateGoogleMapsLink = (route) => {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const waypoints = route.path
      .map((point) => `${point[1]},${point[0]}`)
      .join("|");
    return `${baseUrl}&origin=${route.path[0][1]},${
      route.path[0][0]
    }&destination=${route.path[route.path.length - 1][1]},${
      route.path[route.path.length - 1][0]
    }&waypoints=${waypoints}`;
  };
  const truncateLink = (link, maxLength = 100) => {
    if (link.length <= maxLength) {
      return link;
    }
    return `${link.substring(0, maxLength)}...`;
  };

  const googleMapsLink = generateGoogleMapsLink(route);
  const truncatedLink = truncateLink(googleMapsLink);

  const handleCheckboxChange = (event) => {
    setAddToFavourites(event.target.checked);
  };

  const handleClose = async () => {
    if (addToFavourites) {
      try {
        const token = localStorage.getItem("access_token");
        console.log("Access token:", token);
        console.log("Route title:", route.name);
        console.log("Route description:", route.description);
        console.log("Route waypoints:", route.path);
        console.log("Route main waypoints:", route.mainWaypoints);

        if (!route.mainWaypoints) {
          console.error("mainWaypoints is null or undefined");
          return;
        }

        const response = await fetch("http://localhost:8000/api/routes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            title: route.name,
            description: route.description,
            path: JSON.stringify(route.path),
            mainWaypoints: JSON.stringify(route.mainWaypoints),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save the route");
        }

        console.log("Route saved successfully");
      } catch (error) {
        console.error("Error saving the route:", error);
      }
    }
    onClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="export-modal">
        <Typography variant="h6" gutterBottom>
          Your route is completely generated
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can export it to Google Maps by copying this link:
        </Typography>
        <Typography variant="body2" gutterBottom>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            {truncatedLink}
          </a>
        </Typography>
        {isLoggedIn && !hideCheckbox && (
          <FormControlLabel
            control={
              <Checkbox
                checked={addToFavourites}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Add to Favourites"
          />
        )}
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ExportModal;
