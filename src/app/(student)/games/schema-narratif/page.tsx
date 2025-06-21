"use client";

import { useState } from "react";
import { StoryReconstructionGame } from "@/components/student/StoryReconstructionGame";
import { storyGames } from "@/lib/game-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StoryGamesPage() {
  // Pour l'instant, on prend le premier jeu d'histoire
  const [selectedGame] = useState(storyGames[0]);
  const [score, setScore] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          🧩 Jeu : Reconstituer une histoire
        </h1>
        <p className="text-muted-foreground">
          Glisse et dépose les parties de l'histoire dans le bon ordre pour la
          reconstituer !
        </p>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{selectedGame.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <StoryReconstructionGame
            game={selectedGame}
            onGameComplete={setScore}
          />
        </CardContent>
      </Card>
      {score !== null && (
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>Rejouer</Button>
        </div>
      )}
    </div>
  );
}
