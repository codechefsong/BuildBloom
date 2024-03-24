import Image from "next/image";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type MarkerComponentProps = {
  id: number;
  lat: number;
  lng: number;
  isBuild: boolean;
};

const emptyIcon = new L.Icon({
  iconUrl: "/empty.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const houseIcon = new L.Icon({
  iconUrl: "/house.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const NFTMarker: React.FC<MarkerComponentProps> = ({ id, lat, lng, isBuild }) => {
  const { writeAsync: build } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "build",
    args: [BigInt(id.toString())],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: collectPoints } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "collectPoints",
    args: [BigInt(id.toString())],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <Marker position={[lat, lng]} icon={isBuild ? houseIcon : emptyIcon}>
      <Popup>
        <Image src={isBuild ? "/house.png" : "/empty.png"} width="50" height="50" alt="House" />
        {!isBuild && (
          <button
            className="py-2 px-4 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => build()}
          >
            Build
          </button>
        )}
        {isBuild && (
          <button
            className="py-2 px-4 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => collectPoints()}
          >
            Collect Point
          </button>
        )}
      </Popup>
    </Marker>
  );
};

export default NFTMarker;
