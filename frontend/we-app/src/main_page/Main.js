import React, { useState } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Main.css";
import TopNavigation from "./components/TopNavigation";
import WalkRequestModal from "./components/WalkRequestModal";
import { ReactComponent as BarsIcon } from "./assets/bars-2.svg";
import { ReactComponent as FavouritesIcon } from "./assets/favourites.svg";
import { ReactComponent as AddIcon } from "./assets/button-add.svg";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const mockRoutes = [
  {
    name: "Golden Path",
    color: "#FFD700", // Yellow
    description:
      "Golden Path takes you on a delightful walk starting at Example street. You will pass through charming residential streets, stop by the historic Stare Miasto (Old Town), and finish with a beautiful view at Wrocław Market Square.",
    path: [
      [17.0362, 51.1227], // Start
      [17.032, 51.1105], // Stop 1: Stare Miasto (Old Town)
      [17.038, 51.1095], // Stop 2: Wrocław Market Square
    ],
  },
  {
    name: "Sea Breeze",
    color: "#0000FF", // Blue
    description:
      "Blue one? Great choice! Starting at at Example stree, you’ll explore peaceful parks, take a break at a riverside cafe, and finish your relaxing walk by the Oder River for some quiet moments alone.",
    path: [
      [17.0362, 51.1227], // Start
      [17.043, 51.12], // Stop 1: Park Słowackiego
      [17.0505, 51.118], // Stop 2: Riverside Cafe
      [17.0585, 51.117], // End: Oder River
    ],
  },
  {
    name: "Red Explorer",
    color: "#FF0000", // Red
    description:
      "Red Explorer invites you to discover vibrant parts of Wrocław. Starting at at Example stree, you’ll visit key cultural landmarks and end your journey at the majestic Wrocław Cathedral.",
    path: [
      [17.0362, 51.1227], // Start
      [17.038, 51.1145], // Stop 1: Wrocław Museum
      [17.0425, 51.112], // Stop 2: Wrocław University
      [17.046, 51.11], // End: Wrocław Cathedral
    ],
  },
];

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [descriptionPopup, setDescriptionPopup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const mapboxToken =
    "pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A";

  const handleGenerateRoutes = () => setRoutes(mockRoutes);

  // Handle map clicks for routes
  const handleMapClick = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
      const clickedRoute = routes.find(
        (route) => `${route.name}-layer` === features[0].layer.id
      );
      if (clickedRoute) {
        setSelectedRoute(clickedRoute);
        setDescriptionPopup({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          name: clickedRoute.name,
          description: clickedRoute.description,
        });
      }
    }
  };
  return (
    <div className="app-container">
      <div className="top-navigation">
        <BarsIcon
          className="hamburger-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <TextField
          variant="outlined"
          placeholder="Search for places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="search-bar"
        />
      </div>
      {isMenuOpen && <TopNavigation closeMenu={() => setIsMenuOpen(false)} />}
      <div className="map-container">
        <Map
          initialViewState={{
            longitude: 17.0362,
            latitude: 51.1227,
            zoom: 16, // Closer zoom for a detailed view
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxToken}
          onClick={handleMapClick}
          interactiveLayerIds={routes.map((route) => `${route.name}-layer`)} // Ensure this is correct
        >
          {routes.map((route) => (
            <Source
              key={route.name}
              id={route.name}
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: route.path,
                },
              }}
            >
              <Layer
                id={`${route.name}-layer`}
                type="line"
                paint={{
                  "line-color": route.color,
                  "line-width": selectedRoute?.name === route.name ? 8 : 4, // Glow on selection
                  "line-opacity": selectedRoute?.name === route.name ? 1 : 0.6,
                }}
              />
            </Source>
          ))}
          {selectedRoute && (
            <Marker
              longitude={selectedRoute.path[0][0]}
              latitude={selectedRoute.path[0][1]}
              anchor="bottom"
            >
              <div className="marker-start"></div>
            </Marker>
          )}

          {/* End Marker */}
          {selectedRoute && (
            <Marker
              longitude={selectedRoute.path[selectedRoute.path.length - 1][0]}
              latitude={selectedRoute.path[selectedRoute.path.length - 1][1]}
              anchor="bottom"
            >
              <div
                className="marker-end"
                style={{ backgroundColor: selectedRoute.color }}
              ></div>
            </Marker>
          )}
          {descriptionPopup && (
            <Popup
              longitude={descriptionPopup.longitude}
              latitude={descriptionPopup.latitude}
              closeOnClick={true}
              onClose={() => setDescriptionPopup(null)}
              className="custom-popup"
            >
              <div className="popup-content">
                <div
                  className="popup-header"
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: selectedRoute.color,
                  }}
                >
                  <span className="route-name">{descriptionPopup.name}</span>
                </div>
                <div className="popup-body">
                  <p>{descriptionPopup.description}</p>
                </div>
                <button className="popup-button">
                  Let's go! <ArrowForwardIcon fontSize="small" />{" "}
                </button>
              </div>
            </Popup>
          )}
        </Map>
      </div>
      <div className="search-bar-container">
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          InputProps={{
            style: { backgroundColor: "white" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="bookmark-icon">
        <FavouritesIcon />
      </div>
      =
      <AddIcon className="fab" onClick={openModal} />
      <WalkRequestModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onRouteGenerated={handleGenerateRoutes}
      />
    </div>
  );
};

export default Main;
