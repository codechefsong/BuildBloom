import Image from "next/image";
import L from "leaflet";
import { Circle, Marker, Popup } from "react-leaflet";

type MarkerComponentProps = {
  lat: number;
  lng: number;
};

const userIcon = new L.Icon({
  iconUrl: "/user.png",
  iconSize: [30, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const UserMarker: React.FC<MarkerComponentProps> = ({ lat, lng }) => {
  return (
    <Marker position={[lat, lng]} icon={userIcon}>
      <Circle center={[lat, lng]} radius={160} color="blue" fillColor="blue" fillOpacity={0.1} />
      <Popup>
        <Image src="/house.png" width="50" height="50" alt="House" />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
