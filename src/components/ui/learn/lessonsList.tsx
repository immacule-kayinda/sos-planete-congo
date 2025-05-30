"use client";

import { Chapter } from "../../../../generated/prisma";
import { Progress } from "../progress";
import LessonItem from "./LessonItem";

export default function LessonsList({
  title,
  subtitle,
  progress,
  chapters,
  moduleId,
}: {
  moduleId: string;
  title: string;
  subtitle: string;
  progress: number;
  chapters: Chapter[];
}) {
  // console.log(chapters[0]);
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <Progress
        value={progress}
        className="w-full h-3 rounded-full bg-gray-200 my-2"
      />
      {/* Liste des leçons */}
      <div className="flex flex-col gap-2">
        {chapters.map((chapter, index) => (
          <LessonItem
            key={chapter.id}
            title={chapter.title}
            subtitle={subtitle}
            stars={20}
            state={index === 0 ? "CURRENT" : index < 2 ? "FINISHED" : "BLOKED"}
            moduleId={moduleId}
            chapterId={chapter.id}
          />
        ))}
      </div>
    </div>
  );
}
