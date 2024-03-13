"use client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const MapWithNoSSR = dynamic(() => import("./_components/Map"), {
  ssr: false,
});

const Game: NextPage = () => {
  return (
    <>
      <div>
        <MapWithNoSSR />
      </div>
    </>
  );
};

export default Game;
