"use client";

import { Chapter } from "../../../../generated/prisma";
import { Progress } from "../progress";
import LessonItem from "./LessonItem";
import { useEffect, useState } from "react";

interface ChapterProgress {
  id: string;
  isRead: boolean;
  isCurrent: boolean;
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    order: number;
  };
}

export default function LessonsList({
  title,
  subtitle,
  chapters,
  moduleId,
}: {
  moduleId: string;
  title: string;
  subtitle: string;
  progress?: number;
  chapters: Chapter[];
}) {
  const [progressData, setProgressData] = useState<ChapterProgress[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `/api/student/progress/module/${moduleId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProgressData(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la progression:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [moduleId]);

  // Calculer la progression pour ce module
  const completedChapters = progressData.filter((p) => p.isRead).length;
  const progressPercentage =
    chapters.length > 0 ? (completedChapters / chapters.length) * 100 : 0;

  return (
    <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <Progress
        value={progressPercentage}
        className="w-full h-3 rounded-full bg-gray-200 my-2"
      />
      {/* Liste des leçons */}
      <div className="flex flex-col gap-2">
        {chapters.map((chapter) => {
          // Trouver la progression pour ce chapitre
          const chapterProgress = progressData.find(
            (p) => p.chapter.id === chapter.id
          );

          // Déterminer l'état du chapitre
          let state: "BLOKED" | "CURRENT" | "FINISHED" = "BLOKED";

          if (chapterProgress) {
            if (chapterProgress.isRead) {
              state = "FINISHED";
            } else if (chapterProgress.isCurrent) {
              state = "CURRENT";
            }
          }

          return (
            <LessonItem
              key={chapter.id}
              title={chapter.title}
              subtitle={chapter.subtitle || subtitle}
              stars={chapterProgress?.isRead ? 20 : 0}
              state={state}
              moduleId={moduleId}
              chapterId={chapter.id}
            />
          );
        })}
      </div>
    </div>
  );
}
