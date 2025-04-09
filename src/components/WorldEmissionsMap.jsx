import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { countriesData } from "@/data/data";

// Helper function to determine color intensity based on emissions level
const getColor = (value) => {
  if (value > 1000000000) return "#023e8a"; // Dark blue (very high emissions)
  if (value > 100000000) return "#0077b6"; // Medium dark blue
  if (value > 10000000) return "#00b4d8"; // Lighter blue
  return "#90e0ef"; // Lightest blue (low emissions)
};

const MapWithLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      const thresholds = [0, 10000000, 100000000, 1000000000]; // Emissions thresholds
      const labels = [
        "Low emissions",
        "Medium emissions",
        "High emissions",
        "Very high emissions",
      ];

      // Create legend title
      div.innerHTML = "<h4 className='text-black'>Emissions Levels</h4>";

      // Create gradient color legend
      const gradient = [
        { color: "#90e0ef", label: "Low emissions" },
        { color: "#00b4d8", label: "Medium emissions" },
        { color: "#0077b6", label: "High emissions" },
        { color: "#023e8a", label: "Very high emissions" },
      ];

      gradient.forEach((entry) => {
        div.innerHTML += `
          <i style="background: ${entry.color}; width: 20px; height: 20px; display: inline-block;"></i>
          <span style="color: #333; font-size: 14px;">${entry.label}</span><br>`;
      });

      return div;
    };

    legend.addTo(map);
  }, [map]);

  return null;
};

const WorldEmissionsMap = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Fetch the geoJSON for the world countries from the public folder
    fetch("/world-geojson.json") // Path from the public directory
      .then((response) => response.json())
      .then((data) => setGeoData(data));
  }, []);

  const getEmissions = (countryCode) => {
    const country = countriesData.find((c) => c.code === countryCode);
    return country ? country.emissions : 0; // Return emissions for the country or 0 if not found
  };

  const style = (feature) => {
    const emissions = getEmissions(feature.properties.iso_a3);
    const color = getColor(emissions); // Get the color based on emissions level

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  return (
    <div style={{ height: "100vh" }}>
      {geoData && (
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={geoData} style={style} />
          <MapWithLegend />
        </MapContainer>
      )}
    </div>
  );
};

export default WorldEmissionsMap;
