"use client";

import { useEffect, useState } from "react";

interface StreakData {
  currentStreak: number;
  bonusStars: number;
  isNewMilestone: boolean;
}

export function useStreak() {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateStreak = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/student/streak/update", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setStreakData(data);

        // Afficher la notification seulement si il y a des récompenses
        if (data.bonusStars > 0) {
          setShowNotification(true);
        }

        return data;
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du streak:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  // Mettre à jour automatiquement le streak à la première connexion
  useEffect(() => {
    updateStreak();
  }, []);

  return {
    streakData,
    showNotification,
    isLoading,
    updateStreak,
    closeNotification,
  };
}
