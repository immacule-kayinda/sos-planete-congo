import { Check } from "lucide-react";
import { LessonItemProps } from "./LessonItem";
import Link from "next/link";

export default function FinishedLesson({
  title,
  subtitle,
  chapterId,
  moduleId,
  stars,
  state,
}: LessonItemProps) {
  return (
    <Link href={`/learn/${moduleId}/chapter/${chapterId}`}>
      <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-5 w-fit">
          <div className="h-14 w-14 rounded-full ring-green-500 ring-4 p-1 relative">
            <div className="p-1 bg-green-500 rounded-full flex items-center justify-center absolute -bottom-3 left-4">
              <Check className="text-white w-4 h-4" />
            </div>
            <div className="w-full h-full bg-neutral-200 rounded-full"></div>
          </div>
          <div>
            <p className="font-black uppercase">{title.substring(0, 30)}...</p>
            <span className="text-gray-500 font-bold">
              {subtitle.substring(0, 10)}...
            </span>
          </div>
        </div>
        <span className="text-yellow-500 font-bold">★20</span>
      </div>
    </Link>
  );
}
