import React, { useState } from "react";
import Map from "react-map-gl";
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

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const mapboxToken =
    "pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A";

  return (
    <div className="app-container">
      <div className="top-navigation">
        <BarsIcon
          className="hamburger-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        />
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
        onSubmit={() => {
          closeModal();
        }}
      />
    </div>
  );
};

export default Main;
