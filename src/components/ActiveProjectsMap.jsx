// components/ActiveProjectsMap.jsx
"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ActiveProjectsMap = ({ data }) => {
  const center = [20, 0]; // Center of the world
  const zoom = 2;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((entry, index) => {
          const { country, company, technology } = entry;
          const position = getLatLngForCountry(country);

          return (
            <Marker key={index} position={position}>
              <Popup>
                <b>{company}</b>
                <br />
                Technology: {technology}
                <br />
                Country: {country}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

const getLatLngForCountry = (country) => {
  const countryCoordinates = {
    Australia: [-25.2744, 133.7751],
    Belgium: [50.8503, 4.3517],
    Austria: [47.5162, 14.5501],
    France: [46.6034, 1.8883],
    Germany: [51.1657, 10.4515],
    China: [35.8617, 104.1954],
    "South Korea": [36.5, 127.8],
    Sweden: [60.1282, 18.6435],
    "United States": [37.0902, -95.7129],
    Brazil: [-14.235, -51.9253],
    Spain: [40.4637, -3.7492],
    Netherlands: [52.3784, 4.9009],
    Chile: [-33.4489, -70.6693],
    Finland: [61.9241, 25.7482],
    Canada: [56.1304, -106.3468],
    Mexico: [23.6345, -102.5528],
    Thailand: [15.87, 100.9925],
    Oman: [21.5123, 55.9232],
    Namibia: [-22.5597, 17.0832],
    "United Arab Emirates": [23.4241, 53.8478],
  };

  return countryCoordinates[country] || [20, 0];
};

export default ActiveProjectsMap;
