import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const userIcon = new L.Icon({
  iconUrl: "/user.png",
  iconSize: [30, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Coordinates = {
  lat: number;
  lng: number;
};

const Map = () => {
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
          <Marker position={[position.lat, position.lng]} icon={userIcon} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
