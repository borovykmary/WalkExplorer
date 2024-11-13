import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'; // Optional: for adding custom styles

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxsdXNoa2EtcHdyIiwiYSI6ImNtMml0ZnhvajBmZjEyanNkNmVvcnM4ZWIifQ.vs6oHrb0Iyo-IkVP3gds7A';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to HTML container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Initial map center in [lng, lat]
      zoom: 9, // Initial zoom level
    });

    // Add navigation controls to the map (optional)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on component unmount
    return () => map.remove();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h2>My Mapbox Map</h2>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default Map;
