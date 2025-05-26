import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";
import { getModules, getStudentData } from "@/lib/db";
import LessonsList from "@/components/ui/learn/lessonsList";

export default async function LearnPage() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const student = await getStudentData(session.user.id);
  const modules = await getModules();

  // if (!student) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Chapitre */}
      <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white sticky -top-3 z-10">
        <div>
          <h2 className="font-bold text-lg">CHAPITRE 1, UNITE 1</h2>
          <p>Biodiversité</p>
        </div>
        <Link
          href={"/guidebook"}
          className="px-5 py-2 border font-bold rounded-2xl border-[#130f52]/40 border-b-4"
        >
          GUIDE
        </Link>
      </div>

      {/* Leçon en cours */}
      {modules[0]?.conte && (
        <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-full ring-green-500 ring-4 p-1 relative">
              <div className="p-1 bg-green-500 rounded-full flex items-center justify-center absolute -bottom-3 left-4">
                <Check className="text-white w-4 h-4" />
              </div>
              <div className="w-full h-full bg-neutral-200 rounded-full"></div>
            </div>
            <div>
              <p className="font-black text-lg uppercase">
                {modules[0].conte.text.substring(0, 30)}...
              </p>
              <span className="text-lg text-gray-500 font-bold">Conte</span>
            </div>
          </div>
          <span className="text-yellow-500 font-bold">★20</span>
        </div>
      )}

      {/* Modules et leurs chapitres */}
      {modules.map((module) => (
        <LessonsList
          key={module.id}
          title={module.title.toUpperCase()}
          subtitle={module.description}
          progress={40}
          chapters={module.chapters}
        />
      ))}

      {/* Quizz */}
      <Link href="/quizz">
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
      </Link>
    </div>
  );
}
