import { getRandomFunFact } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Loader({ funFact }: { funFact: string }) {
  return (
    <div className="w-screen h-screen gap-10 flex justify-center items-center flex-col text-center">
      <div className="loader">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="text-center flex flex-col items-center gap-3 justify-center">
        <h1>Savais-tu que...</h1>
        <p className="text-xl w-1/2">{funFact}</p>
      </div>
    </div>
  );
}
