import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Map",
  description: "Map created with 🏗 Scaffold-ETH 2",
});

const MapLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MapLayout;
