import Image from "next/image";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

type MarkerComponentProps = {
  lat: number;
  lng: number;
};

const houseIcon = new L.Icon({
  iconUrl: "/empty.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const NFTMarker: React.FC<MarkerComponentProps> = ({ lat, lng }) => {
  return (
    <Marker position={[lat, lng]} icon={houseIcon}>
      <Popup>
        <Image src="/empty.png" width="50" height="50" alt="House" />
      </Popup>
    </Marker>
  );
};

export default NFTMarker;
