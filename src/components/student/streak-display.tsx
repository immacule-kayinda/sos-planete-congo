"use client";

import React from "react";
import { Flame, Calendar, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StreakDisplayProps {
  currentStreak: number;
  lastActive?: Date | null;
  className?: string;
}

export function StreakDisplay({
  currentStreak,
  lastActive,
  className,
}: StreakDisplayProps) {
  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Commence ta série aujourd'hui !";
    if (streak === 1) return "Excellent début ! Continue !";
    if (streak < 7) return "Tu es sur la bonne voie !";
    if (streak < 30) return "Incroyable série ! Continue !";
    if (streak < 100) return "Tu es un champion !";
    return "Légendaire ! Tu es un maître !";
  };

  const getStreakColor = (streak: number) => {
    if (streak === 0) return "text-gray-500";
    if (streak < 7) return "text-orange-500";
    if (streak < 30) return "text-red-500";
    if (streak < 100) return "text-purple-500";
    return "text-yellow-500";
  };

  const getStreakBadge = (streak: number) => {
    if (streak === 0) return null;
    if (streak < 7) return { text: "Débutant", color: "bg-orange-500" };
    if (streak < 30) return { text: "Régulier", color: "bg-red-500" };
    if (streak < 100) return { text: "Expert", color: "bg-purple-500" };
    return { text: "Légendaire", color: "bg-yellow-500" };
  };

  const getNextMilestone = (streak: number) => {
    if (streak < 7) return { target: 7, label: "Débutant" };
    if (streak < 30) return { target: 30, label: "Régulier" };
    if (streak < 100) return { target: 100, label: "Expert" };
    return { target: 365, label: "Maître Suprême" };
  };

  const badge = getStreakBadge(currentStreak);
  const milestone = getNextMilestone(currentStreak);
  const progressToNext =
    currentStreak < milestone.target
      ? (currentStreak / milestone.target) * 100
      : 100;

  const isActiveToday =
    lastActive &&
    new Date(lastActive).toDateString() === new Date().toDateString();

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className={`h-6 w-6 ${getStreakColor(currentStreak)}`} />
          Série Quotidienne
          {badge && (
            <Badge className={`${badge.color} text-white ml-auto`}>
              {badge.text}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Compteur principal */}
        <div className="text-center">
          <div
            className={`text-4xl font-bold ${getStreakColor(currentStreak)}`}
          >
            {currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentStreak === 0
              ? "Aucune série"
              : currentStreak === 1
                ? "jour consécutif"
                : "jours consécutifs"}
          </div>
        </div>

        {/* Message d'encouragement */}
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {getStreakMessage(currentStreak)}
          </p>
        </div>

        {/* Statut d'aujourd'hui */}
        <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-muted/50">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {isActiveToday ? (
              <span className="text-green-600 font-medium">
                ✓ Actif aujourd'hui
              </span>
            ) : (
              <span className="text-orange-600 font-medium">
                Connecte-toi aujourd'hui !
              </span>
            )}
          </span>
        </div>

        {/* Progression vers le prochain palier */}
        {currentStreak < milestone.target && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Prochain palier : {milestone.label}
              </span>
              <span className="font-medium">
                {currentStreak}/{milestone.target}
              </span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Plus que {milestone.target - currentStreak} jours !
            </div>
          </div>
        )}

        {/* Récompenses pour les longs streaks */}
        {currentStreak >= 7 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Récompense de série !
              </span>
            </div>
            <div className="text-xs text-yellow-700">
              {currentStreak >= 100 ? (
                <>Tu as gagné 10 étoiles bonus ! 🌟</>
              ) : currentStreak >= 30 ? (
                <>Tu as gagné 5 étoiles bonus ! ⭐</>
              ) : (
                <>Tu as gagné 2 étoiles bonus ! ⭐</>
              )}
            </div>
          </div>
        )}

        {/* Conseils pour maintenir la série */}
        {currentStreak > 0 && (
          <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-200">
            💡 <strong>Astuce :</strong> Connecte-toi chaque jour pour maintenir
            ta série ! Même 5 minutes d'apprentissage comptent.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
