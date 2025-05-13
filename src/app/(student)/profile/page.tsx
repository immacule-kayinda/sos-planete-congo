import React from "react";

export default function Profile() {
  return (
    <div className="bg-white md:p-8 pb-10">
      {/* Avatar et en-tête */}
      <div className="flex flex-col mb-8">
        <div className="bg-gray-300 relative h-64 w-full mb-20 rounded-b-2xl">
          <div className="w-32 h-32 rounded-full bg-gray-500 absolute -bottom-12 left-10" />
        </div>
        <div className="">
          <span className="text-3xl font-black">Carolle Kasongo</span>
          <span className="text-lg text-gray-500 ml-2">@Carokas19</span>
        </div>
        <div className="text-lg text-gray-800 mt-2">
          Membre depuis Mars 2025
        </div>
      </div>
      <hr className="my-8" />
      {/* Statistiques */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Statistiques</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex items-center gap-4 flex-1 min-w-[200px] bg-gray-50 border-2 border-gray-200 rounded-xl p-5">
            <span className="text-3xl">🔥</span>
            <div>
              <div className="text-xl font-bold">5</div>
              <div className="text-gray-500 text-sm">Jours d'affilé</div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-[200px] bg-gray-50 border-2 border-gray-200 rounded-xl p-5">
            <span className="text-3xl text-yellow-400">⭐</span>
            <div>
              <div className="text-xl font-bold">16998</div>
              <div className="text-gray-500 text-sm">Étoiles gagnées</div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-[200px] bg-gray-50 border-2 border-gray-200 rounded-xl p-5">
            <span className="text-3xl text-yellow-800">🥉</span>
            <div>
              <div className="text-base font-bold">Bronze</div>
              <div className="text-gray-500 text-sm">Division Actuelle</div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-[200px] bg-gray-50 border-2 border-gray-200 rounded-xl p-5">
            <span className="text-3xl text-yellow-400">⭐</span>
            <div>
              <div className="text-base font-bold">4j 4h 50min</div>
              <div className="text-gray-500 text-sm">Temps d'apprentissage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
