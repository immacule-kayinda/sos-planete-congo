"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Star, Flame, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StreakNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  streakData: {
    currentStreak: number;
    bonusStars: number;
    isNewMilestone: boolean;
  };
}

export function StreakNotification({
  isVisible,
  onClose,
  streakData,
}: StreakNotificationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible && streakData.isNewMilestone) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, streakData.isNewMilestone]);

  const getMilestoneMessage = (streak: number) => {
    if (streak === 7) return "Première semaine complète !";
    if (streak === 30) return "Un mois entier ! Incroyable !";
    if (streak === 100) return "100 jours ! Tu es une légende !";
    if (streak % 50 === 0) return `${streak} jours ! Maître absolu !`;
    if (streak % 10 === 0) return `${streak} jours de suite !`;
    return "Nouveau record personnel !";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Confettis pour les gros paliers */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: [
                    "#fbbf24",
                    "#f59e0b",
                    "#d97706",
                    "#ef4444",
                    "#dc2626",
                    "#b91c1c",
                  ][Math.floor(Math.random() * 6)],
                }}
              />
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4 animate-pulse">
              <Flame className="h-10 w-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {streakData.isNewMilestone
              ? "🎉 Nouveau Palier !"
              : "🔥 Série Maintenue !"}
          </h2>

          <div className="mb-4">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {streakData.currentStreak}
            </div>
            <div className="text-lg text-gray-600">
              {streakData.currentStreak === 1
                ? "jour consécutif"
                : "jours consécutifs"}
            </div>
          </div>

          {streakData.isNewMilestone && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium">
                {getMilestoneMessage(streakData.currentStreak)}
              </p>
            </div>
          )}

          {streakData.bonusStars > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-300 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  Récompense gagnée !
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-700">
                <Star className="h-6 w-6 fill-current" />
                <span>+{streakData.bonusStars}</span>
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <p>Continue à te connecter chaque jour pour maintenir ta série !</p>
            {streakData.currentStreak >= 7 && (
              <p className="text-orange-600 font-medium">
                Tu es sur une excellente lancée ! 🚀
              </p>
            )}
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            Continuer l'aventure !
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
