import Link from "next/link";
import { LessonItemProps } from "./LessonItem";

export default function CurrentLesson({
  title,
  subtitle,
  stars,
  moduleId,
  chapterId,
}: LessonItemProps) {
  return (
    <Link href={`/learn/${moduleId}/chapter/${chapterId}`}>
      <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-full ring-gray-200 ring-4 p-1 relative">
            <div className="w-full h-full bg-neutral-200 rounded-full"></div>
          </div>
          <div>
            <p className="font-black uppercase">{title}</p>
            <span className="text-gray-500 font-bold">
              {" "}
              {subtitle.substring(0, 10)}...
            </span>
          </div>
        </div>
        <span className="text-yellow-500 font-bold">★{stars}</span>
      </div>
    </Link>
  );
}
