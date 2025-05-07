import LessonsList from "@/components/ui/learn/lessonsList";
import { Progress } from "@/components/ui/progress";
import { Check, Flame, Notebook } from "lucide-react";
import Link from "next/link";
export default function LearnPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Chapitre */}
      <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white">
        <div>
          <h2 className="font-bold text-lg">CHAPITRE 1, UNITE 1</h2>
          <p>Biodiversité</p>
        </div>
        <div>{/* Icone ou bouton */}</div>
      </div>

      {/* Leçon en cours */}
      <div className="bg-white rounded-xl p-4 flex justify-between items-center border-2 border-gray-200">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-full ring-green-500 ring-4 p-1 relative">
            <div className="p-1 bg-green-500 rounded-full flex items-center justify-center absolute -bottom-3 left-4">
              <Check className="text-white w-4 h-4" />
            </div>
            <div className="w-full h-full bg-neutral-200 rounded-full"></div>
          </div>
          <div>
            <p className="font-black text-lg uppercase">
              Panique dans la foret
            </p>
            <span className="text-lg text-gray-500 font-bold">Conte</span>
          </div>
        </div>
        <span className="text-yellow-500 font-bold">★20</span>
      </div>

      {/* Biodiversité */}
      <LessonsList title="BIODIVERSITÉ" subtitle="LES HEROS" progress={40} />

      {/* Culture */}
      <LessonsList title="CULTURE" subtitle="LES HEROS" progress={40} />

      {/* Culture */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-bold">CULTURE</h3>
        <p className="text-xs text-gray-500">LES HEROS</p>
        <Progress value={40} className="w-full h-2 bg-gray-200 rounded my-2" />
        {/* Liste des leçons */}
        <div className="flex flex-col gap-2">
          {/* Répéter ce bloc pour chaque leçon */}
          <div className="flex items-center justify-between bg-gray-100 rounded p-2 opacity-50">
            <div>
              <p className="font-semibold">L'ANTILOPE TETSI</p>
              <span className="text-xs text-gray-500">Philantomba</span>
            </div>
            <span className="text-yellow-500 font-bold">★20</span>
          </div>
        </div>
      </div>

      {/* Quizz */}
      <div className="bg-red-500 rounded-xl p-4 flex justify-between items-center text-white mt-4">
        <div>
          <h4 className="font-bold text-lg">QUIZZ</h4>
          <p className="text-xs">
            Près à tester ce que tu as appris et passer à l'étape suivante ?
          </p>
        </div>
        <button className="bg-white text-red-500 font-bold px-6 py-2 rounded-full">
          ALLER
        </button>
      </div>
    </div>
  );
}
