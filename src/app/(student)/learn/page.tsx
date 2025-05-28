import LessonsList from "@/components/ui/learn/lessonsList";
import { getSectionWithModules, getStudentData } from "@/lib/db";
import { Check } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";

export default async function LearnPage() {
  const session = await auth();

  if (!session?.user?.id) return <div>You are not authenticated</div>;

  const student = await getStudentData(session.user.id);
  console.log("Student:", student);

  const section = await getSectionWithModules();
  console.log("Section:", section);

  const firstModule = section?.modules[0];
  console.log("First module:", firstModule);

  if (!student || !section) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Chapitre */}
      <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white sticky -top-3 z-10">
        <div>
          <h2 className="font-bold text-lg">{section.title.toUpperCase()}</h2>
          <p>{section.description}</p>
        </div>
        <Link
          href={"/guidebook"}
          className="px-5 py-2 border font-bold rounded-2xl border-[#130f52]/40 border-b-4"
        >
          GUIDE
        </Link>
      </div>

      {/* Conte de la section */}
      {section.conte && (
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
                {section.conte.title.substring(0, 30)}...
              </p>
              <span className="text-lg text-gray-500 font-bold">Conte</span>
            </div>
          </div>
          <span className="text-yellow-500 font-bold">★20</span>
        </div>
      )}

      {/* Chapitres du module */}
      {section.modules.map((module) => (
        <LessonsList
          moduleId={module.id}
          title={module.title.toUpperCase()}
          subtitle={module.subtitle}
          chapters={module.chapters}
          key={module.id}
          progress={40}
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
          <Link
            href={`/quizz/${section.quizz.id}`}
            className="bg-white text-red-500 font-bold px-6 py-2 rounded-full"
          >
            ALLER
          </Link>
        </div>
      </Link>
    </div>
  );
}
