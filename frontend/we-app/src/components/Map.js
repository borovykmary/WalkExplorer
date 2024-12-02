import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import "./Map.css";

// Set your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return (
    <div className="map-app-container">
      <nav className="map-nav">
        <Link to="/" className="back-button">
          Back
        </Link>
        {/* Profile button */}
        <Link to="/profile">
          <img src={require("./R.png")} alt="Profile" className="profile-btn" />
        </Link>
      </nav>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default Map;
