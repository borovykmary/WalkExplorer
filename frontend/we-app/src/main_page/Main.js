import React, { useState, useEffect } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Main.css";
import TopNavigation from "./components/TopNavigation";
import WalkRequestModal from "./components/WalkRequestModal";
import { ReactComponent as BarsIcon } from "./assets/bars-2.svg";
import { ReactComponent as FavouritesIcon } from "./assets/favourites.svg";
import { ReactComponent as FavouritesGuestIcon } from "./assets/favourites_guest.svg";
import { ReactComponent as AddIcon } from "./assets/button-add.svg";
import DescriptionPopup from "./components/DescriptionPopup";
import FavouritesModal from "./components/FavouritesModal";
import PlaceIcon from "@mui/icons-material/Place";
import ExportModal from "./components/ExportModal";

const mapboxToken =
  "pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A";

const fetchRouteFromMapbox = async (route) => {
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${route.path.join(
      ";"
    )}?geometries=geojson&access_token=${mapboxToken}`
  );
  const data = await response.json();
  return data.routes[0].geometry.coordinates;
};

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFavouritesModalVisible, setFavouritesModalVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [descriptionPopup, setDescriptionPopup] = useState(null);
  const [viewMode, setViewMode] = useState("default");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavouritesClicked, setIsFavouritesClicked] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking for an authentication token
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    console.log("User is logged in:", !!token);
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openFavouritesModal = () => setFavouritesModalVisible(true);
  const closeFavouritesModal = () => setFavouritesModalVisible(false);

  const handleRouteGenerated = async (routes) => {
    const alignedRoutes = await Promise.all(
      routes.map(async (route) => {
        const alignedPath = await fetchRouteFromMapbox(route);
        return {
          ...route,
          path: alignedPath,
          mainWaypoints: route.mainWaypoints,
        };
      })
    );
    setRoutes((prevRoutes) => [...prevRoutes, ...alignedRoutes]);
    console.log("Generated routes:", alignedRoutes);
  };

  const handleMapClick = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
      const clickedRoute = routes.find(
        (route) => `${route.name}-layer` === features[0].layer.id
      );
      if (clickedRoute) {
        setRoutes((prevRoutes) => {
          const otherRoutes = prevRoutes.filter(
            (route) => route.name !== clickedRoute.name
          );
          return [...otherRoutes, clickedRoute];
        });

        console.log("Clicked route:", clickedRoute);
        setSelectedRoute(clickedRoute);
        setDescriptionPopup({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          name: clickedRoute.name,
          description: clickedRoute.description,
          waypoints: clickedRoute.path,
          mainWaypoints: clickedRoute.mainWaypoints,
        });
      }
    }
  };
  const handleRouteClick = (clickedRoute) => {
    setRoutes((prevRoutes) => {
      const otherRoutes = prevRoutes.filter(
        (route) => route.name !== clickedRoute.name
      );
      return [...otherRoutes, clickedRoute];
    });
    setSelectedRoute(clickedRoute);
  };

  const handleSelectRoute = async (savedroute) => {
    if (
      !savedroute.path ||
      !Array.isArray(savedroute.path) ||
      savedroute.path.length === 0
    ) {
      console.error("Invalid route path:", savedroute.path);
      return;
    }

    setRoutes((prevRoutes) => [...prevRoutes, savedroute]);
    setSelectedRoute(savedroute);
    setDescriptionPopup({
      longitude: savedroute.path[0][0],
      latitude: savedroute.path[0][1],
      name: savedroute.name,
      description: savedroute.description,
      waypoints: savedroute.path,
      mainWaypoints: savedroute.mainWaypoints,
    });

    setFavouritesModalVisible(false);
  };
  useEffect(() => {
    if (selectedRoute) {
      console.log("Selected route updated:", selectedRoute);
    }
  }, [selectedRoute]);
  const handleProceed = () => {
    setViewMode("confirm");
  };

  const handleGoBack = () => {
    setViewMode("default");
  };

  const handleConfirmSelection = () => {
    setRoutes((prevRoutes) =>
      prevRoutes.filter((route) => route.name !== selectedRoute.name)
    );
    setExportModalOpen(true);
  };

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
            longitude: 17.0323,
            latitude: 51.1106,
            zoom: 12, // Closer zoom for a detailed view
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxToken}
          onClick={handleMapClick}
          interactiveLayerIds={routes.map((route) => `${route.name}-layer`)}
        >
          {routes &&
            routes.map((route) => (
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
                    "line-width": selectedRoute?.name === route.name ? 5 : 3, // Glow on selection
                    "line-opacity":
                      selectedRoute?.name === route.name ? 1 : 0.4,
                  }}
                />
              </Source>
            ))}
          {routes.map((route) =>
            route.mainWaypoints.map((waypoint, index) => {
              const isStart = index === 0;
              const isEnd = index === route.mainWaypoints.length - 1;
              const markerClass = isStart
                ? "marker-start"
                : isEnd
                ? "marker-end"
                : "marker-waypoint";

              return (
                <Marker
                  key={`${route.name}-marker-${index}`}
                  longitude={waypoint[0]}
                  latitude={waypoint[1]}
                  anchor="bottom"
                  onClick={() => handleRouteClick(route)}
                >
                  {isStart || isEnd ? (
                    <div
                      className={markerClass}
                      style={{
                        backgroundColor: route.color,
                      }}
                    />
                  ) : (
                    <PlaceIcon
                      style={{
                        color: route.color,
                      }}
                    />
                  )}
                </Marker>
              );
            })
          )}
          {descriptionPopup && (
            <DescriptionPopup
              descriptionPopup={descriptionPopup}
              selectedRoute={selectedRoute}
              onClose={() => setDescriptionPopup(null)}
              setRoutes={setRoutes}
              setDescriptionPopup={setDescriptionPopup}
              handleProceed={handleProceed}
              viewMode={viewMode}
              handleGoBack={handleGoBack}
              handleConfirmSelection={handleConfirmSelection}
            />
          )}
          {exportModalOpen && (
            <ExportModal
              open={exportModalOpen}
              onClose={() => setExportModalOpen(false)}
              route={selectedRoute}
              hideCheckbox={isFavouritesClicked}
              isLoggedIn={isLoggedIn}
            />
          )}
        </Map>
      </div>
      <div
        className="bookmark-icon"
        onClick={() => {
          if (isLoggedIn) {
            setIsFavouritesClicked(true);
            openFavouritesModal();
          }
        }}
      >
        {isLoggedIn ? <FavouritesIcon /> : <FavouritesGuestIcon />}
      </div>
      =
      <AddIcon className="fab" onClick={openModal} />
      <WalkRequestModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onRouteGenerated={handleRouteGenerated}
      />
      <FavouritesModal
        isVisible={isFavouritesModalVisible}
        onClose={closeFavouritesModal}
        onSelectRoute={handleSelectRoute}
      />
    </div>
  );
};

export default Main;
