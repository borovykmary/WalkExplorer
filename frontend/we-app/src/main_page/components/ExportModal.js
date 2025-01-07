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

const ExportModal = ({ open, onClose, route }) => {
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

  const googleMapsLink = generateGoogleMapsLink(route);
  const handleCheckboxChange = (event) => {
    setAddToFavourites(event.target.checked);
  };

  const handleClose = () => {
    if (addToFavourites) {
      // Add the route to favourites logic here
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 400,
          margin: "auto",
          mt: "20vh",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your route is completely generated
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can export it to Google Maps by copying this link:
        </Typography>
        <Typography variant="body2" gutterBottom>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            {googleMapsLink}
          </a>
        </Typography>
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
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ExportModal;
