"use client";

import { useEffect, useState } from "react";
import { StreakNotification } from "./streak-notification";

interface StreakManagerProps {
  initialStreakData?: {
    currentStreak: number;
    bonusStars: number;
    isNewMilestone: boolean;
  } | null;
}

export function StreakManager({ initialStreakData }: StreakManagerProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [streakData, setStreakData] = useState(initialStreakData);

  useEffect(() => {
    if (initialStreakData && initialStreakData.bonusStars > 0) {
      setShowNotification(true);
      setStreakData(initialStreakData);
    }
  }, [initialStreakData]);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && streakData && (
        <StreakNotification
          isVisible={showNotification}
          streakData={streakData}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
}
