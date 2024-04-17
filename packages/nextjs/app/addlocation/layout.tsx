import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Add Location",
  description: "Add Location created with 🏗 Scaffold-ETH 2",
});

const AddLocationLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AddLocationLayout;
