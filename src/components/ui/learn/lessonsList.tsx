"use client";

import { Chapter } from "../../../../generated/prisma";
import { Progress } from "../progress";
import LessonItem from "./LessonItem";

interface ChapterProgress {
  id: string;
  isRead: boolean;
  isCurrent: boolean;
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    order: number;
    module: {
      id: string;
      section: {
        id: string;
      };
    };
  };
}

export default function LessonsList({
  title,
  subtitle,
  chapters,
  moduleId,
  currentChapterId,
  progressData = [],
}: {
  moduleId: string;
  title: string;
  subtitle: string;
  progress?: number;
  chapters: Chapter[];
  currentChapterId: string;
  progressData?: ChapterProgress[];
}) {
  // Filtrer les données de progression pour ce module uniquement
  const moduleProgressData = progressData.filter(
    (progress) => progress.chapter.module.id === moduleId
  );

  // Calculer la progression pour ce module
  const completedChapters = moduleProgressData.filter((p) => p.isRead).length;
  const progressPercentage =
    chapters.length > 0 ? (completedChapters / chapters.length) * 100 : 0;

  // Trier les chapitres par ordre pour la logique de déblocage
  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);

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
        {sortedChapters.map((chapter, index) => {
          // Trouver la progression pour ce chapitre
          const chapterProgress = moduleProgressData.find(
            (p) => p.chapter.id === chapter.id
          );

          // Déterminer l'état du chapitre
          let state: "BLOKED" | "CURRENT" | "FINISHED" = "BLOKED";

          if (chapterProgress?.isRead) {
            // Chapitre terminé
            state = "FINISHED";
          } else if (chapter.id === currentChapterId) {
            // Chapitre actuel
            state = "CURRENT";
          } else {
            // Vérifier si le chapitre peut être débloqué
            // Un chapitre est débloqué si :
            // 1. C'est le premier chapitre du module
            // 2. Tous les chapitres précédents sont terminés
            if (index === 0) {
              // Premier chapitre, toujours débloqué (mais pas forcément current)
              state = "CURRENT";
            } else {
              // Vérifier si tous les chapitres précédents sont terminés
              const allPreviousCompleted = sortedChapters
                .slice(0, index)
                .every((prevChapter) => {
                  const prevProgress = moduleProgressData.find(
                    (p) => p.chapter.id === prevChapter.id
                  );
                  return prevProgress?.isRead;
                });

              if (allPreviousCompleted) {
                // Tous les chapitres précédents sont terminés, celui-ci peut être débloqué
                // Mais il n'est "CURRENT" que s'il correspond au currentChapterId
                state = chapter.id === currentChapterId ? "CURRENT" : "BLOKED";
              } else {
                // Des chapitres précédents ne sont pas terminés
                state = "BLOKED";
              }
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
