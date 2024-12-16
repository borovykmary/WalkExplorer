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

const mockRoutes = [
  {
    name: "Name1",
    color: "#FFD700", // Yellow
    description: "This is the first route",
    path: [
      [-122.4194, 37.7749],
      [-122.4294, 37.7789],
      [-122.4394, 37.7849],
    ],
  },
  {
    name: "Name2",
    color: "#0000FF", // Blue
    description: "This is the second route",
    path: [
      [-122.4194, 37.7749],
      [-122.4174, 37.78],
      [-122.414, 37.785],
    ],
  },
  {
    name: "Name3",
    color: "#FF0000", // Red
    description: "This is the third route",
    path: [
      [-122.4194, 37.7749],
      [-122.41, 37.77],
      [-122.405, 37.765],
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
            longitude: -122.4194,
            latitude: 37.7749,
            zoom: 12,
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
          {descriptionPopup && (
            <Popup
              longitude={descriptionPopup.longitude}
              latitude={descriptionPopup.latitude}
              closeOnClick={false}
              onClose={() => setDescriptionPopup(null)}
            >
              <div>
                <h3>{descriptionPopup.name}</h3>
                <p>{descriptionPopup.description}</p>
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
