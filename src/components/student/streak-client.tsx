"use client";

import { StreakNotification } from "./streak-notification";
import { useStreak } from "@/hooks/use-streak";

export function StreakClient() {
  const { streakData, showNotification, closeNotification } = useStreak();

  return (
    <>
      {showNotification && streakData && (
        <StreakNotification
          isVisible={showNotification}
          streakData={streakData}
          onClose={closeNotification}
        />
      )}
    </>
  );
}
