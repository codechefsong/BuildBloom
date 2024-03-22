import Image from "next/image";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type MarkerComponentProps = {
  lat: number;
  lng: number;
  materialType: string;
};

const materialImages = ["/wood.png", "/cement.png", "/glass.png"];

const MaterialMarker: React.FC<MarkerComponentProps> = ({ lat, lng, materialType }) => {
  const materialIcon = new L.Icon({
    iconUrl: materialImages[materialType as any],
    iconSize: [30, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const { writeAsync: mintMaterial } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "mintMaterial",
    args: [BigInt(materialType)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <Marker position={[lat, lng]} icon={materialIcon}>
      <Popup>
        <Image src={materialImages[materialType as any]} width="50" height="50" alt="Material" />
        <button
          className="py-2 px-4 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={() => mintMaterial()}
        >
          Mint {materialType === "0" ? "Wood" : materialType === "1" ? "Cement" : "Glass"}
        </button>
      </Popup>
    </Marker>
  );
};

export default MaterialMarker;
