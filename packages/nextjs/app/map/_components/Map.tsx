"use client";

import { useState } from "react";
import "leaflet/dist/leaflet.css";
import type { NextPage } from "next";
import { MapContainer, TileLayer } from "react-leaflet";

type Coordinates = {
  lat: number;
  lng: number;
};

const Map: NextPage = () => {
  const [position, setPosition] = useState<Coordinates>({ lat: 51.505, lng: -0.09 });
  console.log(setPosition);

  return (
    <>
      <div>
        <MapContainer center={[position.lat, position.lng]} zoom={16} style={{ height: "90vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
