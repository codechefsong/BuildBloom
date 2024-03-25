"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Build Bloom</span>
          </h1>
          <Image className="ml-8" alt="Game" width={450} height={350} src="/game.png" />
          <p className="text-center text-lg mb-0">
            Explore the world to gather resources and build your own virtual town
          </p>
          <div className="flex justify-center mb-2">
            <Link
              href="/map"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Explore
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-yellow-100 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl mb-5">Gameplay</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <ul className="list-disc text-xl" style={{ width: "600px" }}>
                <li>It utilizes real-world location tracking similar to Pokémon GO</li>
                <li>Make sure your GPS is enabled to accurately track your movements</li>
                <li>Walk or travel to the designated locations on the map to gather resources</li>
                <li>
                  Once you&apos;re within range of a resource hotspot, tap on it to collect wood, cement, or glass
                </li>
                <li>Locate empty plots of land on the map where you wish to construct houses</li>
                <li>Successfully constructing a house earns you points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
