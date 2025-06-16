import Link from "next/link";
import { LessonItemProps } from "./LessonItem";

export default function AvailableLesson({
  title,
  subtitle,
  stars,
  moduleId,
  chapterId,
}: LessonItemProps) {
  return (
    <Link href={`/learn/${moduleId}/chapter/${chapterId}`}>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex justify-between items-center hover:bg-blue-100 transition-colors cursor-pointer">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-full ring-blue-300 ring-4 p-1 relative">
            <div className="w-full h-full bg-blue-200 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <p className="font-black uppercase text-blue-800">{title}</p>
            <span className="text-blue-600 font-bold">
              {subtitle.substring(0, 10)}...
            </span>
          </div>
        </div>
        <span className="text-yellow-500 font-bold">★{stars}</span>
      </div>
    </Link>
  );
}
