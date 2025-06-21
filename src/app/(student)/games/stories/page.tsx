"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { storyGames, type StoryGame } from "@/lib/game-data";
import { ArrowLeft } from "lucide-react";
import { StoryGameComponent } from "@/components/student/StoryGameComponent";

export default function StoriesGames() {
  const [selectedGame, setSelectedGame] = useState<StoryGame | null>(null);
  const [gameScores, setGameScores] = useState<Record<number, number>>({});

  const handleGameComplete = (gameId: number, score: number) => {
    setGameScores((prev) => ({
      ...prev,
      [gameId]: Math.max(prev[gameId] || 0, score),
    }));
  };

  if (selectedGame) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedGame(null)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux schémas narratifs
          </Button>
          <StoryGameComponent
            game={selectedGame}
            onGameComplete={(score) =>
              handleGameComplete(selectedGame.id, score)
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/games">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux jeux
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">📖 Schémas Narratifs</h1>
        <p className="text-muted-foreground">
          Reconstituer des histoires en organisant les éléments du schéma
          narratif dans le bon ordre
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storyGames.map((game) => (
          <Card
            key={game.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => setSelectedGame(game)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  className={
                    game.difficulty === "facile"
                      ? "bg-green-100 text-green-800"
                      : game.difficulty === "moyen"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {game.difficulty}
                </Badge>
                {gameScores[game.id] && (
                  <Badge variant="outline">
                    Meilleur: {gameScores[game.id]}%
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {game.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {game.story.filter((s) => s.isCorrect).length} éléments à
                  ordonner
                </span>
                <span>{game.story.length} cartes totales</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
