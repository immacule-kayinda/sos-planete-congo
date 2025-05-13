import React from "react";

interface FinishedProps {
  onContinue: () => void;
  // stats?: { label: string; value: React.ReactNode; border: string; text: string }[];
}

const stats = [
  {
    label: "TEMPS",
    value: "2:50",
    bg: "bg-red-600",
    text: "text-red-600",
  },
  {
    label: "ETOILES GAGNEES",
    value: (
      <>
        <span className="text-yellow-400">⭐</span> 200
      </>
    ),
    bg: "bg-yellow-400",
    text: "text-yellow-400",
  },
  {
    label: "PRECISION",
    value: (
      <>
        <span className="text-purple-500">🎯</span> 98%
      </>
    ),
    bg: "bg-purple-500",
    text: "text-purple-500",
  },
];

export default function Finished({ onContinue }: FinishedProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-5xl font-black text-center mt-16 mb-4">
          Félicitations
        </h1>
        <p className="text-gray-400 text-lg md:text-xl text-center mb-10 max-w-xl">
          Continuez comme ça vous allez bientôt tout connaitre
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mb-12 w-full max-w-2xl justify-center items-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl ${s.bg} w-full md:w-64 max-w-xs p-1 flex flex-col `}
            >
              <span
                className={`uppercase font-black text-sm pl-2 py-2 tracking-wide text-white`}
              >
                {s.label}
              </span>
              <div className="bg-white w-full rounded-lg py-4 px-2 flex flex-col items-center">
                <span 
                  className={`text-3xl md:text-4xl font-black mt-2 flex items-center gap-2 ${s.text}`}
                >
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4 pb-8">
        <button
          className="w-full md:max-w-xl mx-auto block bg-red-600 text-white font-bold rounded-xl py-5 text-2xl hover:bg-red-700 transition shadow"
          onClick={onContinue}
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
