"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const options = [
  { value: "0", label: "Wood" },
  { value: "1", label: "Cement" },
  { value: "2", label: "Glass" },
];

const AddLocation: NextPage = () => {
  const [lat, setlat] = useState<string | bigint>("");
  const [lng, setlng] = useState<string | bigint>("");
  const [selectedOption, setSelectedOption] = useState<string | bigint>("");

  const { writeAsync: addBuilding } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "addBuilding",
    args: [lat.toString(), lng.toString()],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: addShop } = useScaffoldContractWrite({
    contractName: "BuildBloom",
    functionName: "addShop",
    args: [lat.toString(), lng.toString(), BigInt(selectedOption)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-8 w-full max-w-lg">
          <div className="text-xl">Add Empty building</div>

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

        <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-8 w-full max-w-lg">
          <div className="text-xl">Add Material Shop</div>

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
            <div>
              <h2 className="text-md font-bold mt-2 mb-4">Select a Material</h2>
              <select
                onChange={event => setSelectedOption(event.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-500"
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-secondary mt-2" onClick={() => addShop()}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default AddLocation;
