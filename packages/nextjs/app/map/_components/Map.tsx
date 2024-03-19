import { useState } from "react";
import MaterialMarker from "./MaterialMarker";
import NFTMarker from "./NFTMarker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

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

  const { data: buildings } = useScaffoldContractRead({
    contractName: "BuildBloom",
    functionName: "getBuildings",
  });

  const { data: shops } = useScaffoldContractRead({
    contractName: "BuildBloom",
    functionName: "getShops",
  });

  return (
    <>
      <div>
        <MapContainer center={[position.lat, position.lng]} zoom={16} style={{ height: "90vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[position.lat, position.lng]} icon={userIcon}>
            <Circle center={position} radius={160} color="blue" fillColor="blue" fillOpacity={0.1} />
          </Marker>
          {buildings?.map((b, index) => (
            <NFTMarker key={index} lat={Number(b.lat)} lng={Number(b.lng)} />
          ))}

          {shops?.map((s, index) => (
            <MaterialMarker
              key={index}
              lat={Number(s.lat)}
              lng={Number(s.lng)}
              materialType={s.materialType.toString()}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
