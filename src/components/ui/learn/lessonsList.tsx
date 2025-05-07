import { Progress } from "../progress";
import LessonItem from "./LessonItem";

export default function LessonsList({
  title,
  subtitle,
  progress,
}: {
  title: string;
  subtitle: string;
  progress: number;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <Progress value={progress} className="w-full h-2 bg-gray-200 rounded my-2" />
      {/* Liste des leçons */}
      <div className="flex flex-col gap-2">
        {/* Répéter ce bloc pour chaque leçon */}
        <LessonItem
          title="L'ANTILOPE TETSI"
          subtitle="Philantomba"
          stars={20}
        />
      </div>
    </div>
  );
}
