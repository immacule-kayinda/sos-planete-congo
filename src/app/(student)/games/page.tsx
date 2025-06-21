"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleStoryGame } from "@/components/student/SimpleStoryGame";
import { storyGames, type StoryGame } from "@/lib/game-data";
import { BookOpen, Trophy, Star, Target } from "lucide-react";
import Link from "next/link";

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<StoryGame | null>(null);
  const [gameScores, setGameScores] = useState<Record<number, number>>({});

  const handleGameComplete = (gameId: number, score: number) => {
    setGameScores((prev) => ({
      ...prev,
      [gameId]: Math.max(prev[gameId] || 0, score),
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800";
      case "moyen":
        return "bg-yellow-100 text-yellow-800";
      case "difficile":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "histoire":
        return <BookOpen className="h-4 w-4" />;
      case "science":
        return <Target className="h-4 w-4" />;
      case "nature":
        return <Star className="h-4 w-4" />;
      case "culture":
        return <Trophy className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
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
            ← Retour aux jeux
          </Button>
          <SimpleStoryGame
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
        <h1 className="text-3xl font-bold mb-2">🎮 Jeux Éducatifs</h1>
        <p className="text-muted-foreground">
          Amuse-toi en apprenant avec nos jeux interactifs. Choisis un jeu pour
          commencer !
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Types de jeux disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/games/stories">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Schémas Narratifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Reconstituer des histoires en organisant les éléments du
                  schéma narratif dans le bon ordre
                </p>
                <Badge variant="outline">Drag & Drop</Badge>
              </CardContent>
            </Card>
          </Link>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                Quiz Interactifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Répondre à des questions interactives sur différents sujets
              </p>
              <Badge variant="outline">Bientôt disponible</Badge>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-purple-600" />
                Puzzles Éducatifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Résoudre des puzzles et des énigmes éducatives
              </p>
              <Badge variant="outline">Bientôt disponible</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="tous" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tous">Tous les jeux</TabsTrigger>
          <TabsTrigger value="facile">Facile</TabsTrigger>
          <TabsTrigger value="moyen">Moyen</TabsTrigger>
          <TabsTrigger value="difficile">Difficile</TabsTrigger>
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
        </TabsList>

        <TabsContent value="tous" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyGames.map((game) => (
              <Card
                key={game.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedGame(game)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(game.category)}
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
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
        </TabsContent>

        <TabsContent value="facile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyGames
              .filter((game) => game.difficulty === "facile")
              .map((game) => (
                <Card
                  key={game.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedGame(game)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(game.category)}
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
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
                        {game.story.filter((s) => s.isCorrect).length} éléments
                        à ordonner
                      </span>
                      <span>{game.story.length} cartes totales</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="moyen" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyGames
              .filter((game) => game.difficulty === "moyen")
              .map((game) => (
                <Card
                  key={game.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedGame(game)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(game.category)}
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
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
                        {game.story.filter((s) => s.isCorrect).length} éléments
                        à ordonner
                      </span>
                      <span>{game.story.length} cartes totales</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="difficile" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun jeu difficile disponible pour le moment. Reviens bientôt !
            </p>
          </div>
        </TabsContent>

        <TabsContent value="histoire" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyGames
              .filter((game) => game.category === "histoire")
              .map((game) => (
                <Card
                  key={game.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedGame(game)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(game.category)}
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
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
                        {game.story.filter((s) => s.isCorrect).length} éléments
                        à ordonner
                      </span>
                      <span>{game.story.length} cartes totales</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {Object.keys(gameScores).length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Tes meilleurs scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(gameScores).map(([gameId, score]) => {
                const game = storyGames.find((g) => g.id === parseInt(gameId));
                return (
                  <div
                    key={gameId}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <span className="font-medium">{game?.title}</span>
                    <Badge variant={score >= 80 ? "default" : "secondary"}>
                      {score}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
