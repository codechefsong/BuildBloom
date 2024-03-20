import L from "leaflet";
import { Circle, Marker, Popup } from "react-leaflet";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

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
  const { address } = useAccount();
  const { data: materials = [] } = useScaffoldContractRead({
    contractName: "BuildBloom",
    functionName: "getMaterials",
    args: [address],
  });

  return (
    <Marker position={[lat, lng]} icon={userIcon}>
      <Circle center={[lat, lng]} radius={160} color="blue" fillColor="blue" fillOpacity={0.1} />
      <Popup>
        <p>W: {Number(materials[0] || "0")}</p>
        <p>C: {Number(materials[1] || "0")}</p>
        <p>G: {Number(materials[2] || "0")}</p>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
