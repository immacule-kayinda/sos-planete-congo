"use client";

import { Check, Play, BookOpen, Star } from "lucide-react";
import Link from "next/link";

interface ConteCardProps {
  conteId: string;
  title: string;
  isCompleted?: boolean;
  className?: string;
  completedAt?: Date | null;
}

export default function ConteCard({
  conteId,
  title,
  isCompleted = false,
  className = "",
  completedAt,
}: ConteCardProps) {
  const formatCompletionDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <Link href={`/stories/${conteId}`}>
      <div
        className={`
        bg-white rounded-xl p-4 flex justify-between items-center border-2 
        transition-all cursor-pointer group hover:shadow-lg
        ${
          isCompleted
            ? "border-green-300 hover:bg-green-50 hover:border-green-400"
            : "border-blue-300 hover:bg-blue-50 hover:border-blue-400"
        }
        ${className}
      `}
      >
        <div className="flex items-center gap-5">
          {/* Icône de statut */}
          <div
            className={`
            h-14 w-14 rounded-full p-1 relative
            ${isCompleted ? "ring-green-500 ring-4" : "ring-blue-500 ring-4"}
          `}
          >
            {/* Badge de statut */}
            <div
              className={`
              p-1 rounded-full flex items-center justify-center absolute -bottom-3 left-4
              ${isCompleted ? "bg-green-500" : "bg-blue-500"}
            `}
            >
              {isCompleted ? (
                <Check className="text-white w-4 h-4" />
              ) : (
                <BookOpen className="text-white w-4 h-4" />
              )}
            </div>

            {/* Icône principale */}
            <div className="w-full h-full bg-neutral-200 rounded-full flex items-center justify-center">
              <Play
                className={`
                w-6 h-6 transition-colors
                ${
                  isCompleted
                    ? "text-green-600 group-hover:text-green-700"
                    : "text-blue-600 group-hover:text-blue-700"
                }
              `}
              />
            </div>
          </div>

          {/* Contenu */}
          <div>
            <p
              className={`
              font-black text-lg uppercase transition-colors
              ${
                isCompleted
                  ? "text-green-800 group-hover:text-green-700"
                  : "text-blue-800 group-hover:text-blue-700"
              }
            `}
            >
              {title.length > 30 ? title.substring(0, 30) + "..." : title}
            </p>
            <span
              className={`
              text-lg font-bold
              ${isCompleted ? "text-green-600" : "text-blue-600"}
            `}
            >
              {isCompleted ? "Conte terminé" : "Conte à découvrir"} - Cliquez
              pour {isCompleted ? "relire" : "lire"}
            </span>
            {isCompleted && completedAt && (
              <p className="text-sm text-gray-500 mt-1">
                Terminé le {formatCompletionDate(completedAt)}
              </p>
            )}
          </div>
        </div>

        {/* Étoiles */}
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 w-5 h-5" />
          <span className="text-yellow-500 font-bold">
            {isCompleted ? "20" : "0"}
          </span>
        </div>
      </div>
    </Link>
  );
}
