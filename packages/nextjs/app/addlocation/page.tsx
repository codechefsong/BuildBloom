"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const AddLocation: NextPage = () => {
  const [lat, setlat] = useState<string | bigint>("");
  const [lng, setlng] = useState<string | bigint>("");

  const { writeAsync: addBuilding } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "addBuilding",
    args: [lat.toString(), lng.toString()],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-8 w-full max-w-lg">
          <div className="text-xl">Add building</div>

          <div className="w-full flex flex-col space-y-2">
            <IntegerInput
              placeholder="Enter Latitude"
              value={lat.toString()}
              onChange={value => setlat(value)}
              disableMultiplyBy1e18
            />
            <IntegerInput
              placeholder="Enter Longitude"
              value={lng.toString()}
              onChange={value => setlng(value)}
              disableMultiplyBy1e18
            />
          </div>

          <button className="btn btn-secondary mt-2" onClick={() => addBuilding()}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddLocation;
