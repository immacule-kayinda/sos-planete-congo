"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy, Star } from "lucide-react";
import Image from "next/image";

interface StorySegment {
  id: number;
  text: string;
  image: string;
  isCorrect: boolean;
}

interface StoryGame {
  id: number;
  title: string;
  description: string;
  story: StorySegment[];
  correctOrder: number[];
  difficulty: "facile" | "moyen" | "difficile";
}

interface StoryReconstructionGameProps {
  game: StoryGame;
  onGameComplete?: (score: number) => void;
}

export function StoryReconstructionGame({
  game,
  onGameComplete,
}: StoryReconstructionGameProps) {
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSegmentClick = (segmentId: number) => {
    if (isCompleted) return;

    setSelectedSegments((prev) => {
      if (prev.includes(segmentId)) {
        return prev.filter((id) => id !== segmentId);
      } else {
        return [...prev, segmentId];
      }
    });
  };

  const checkAnswer = () => {
    const correctSegments = game.story.filter((segment) => segment.isCorrect);
    const correctSelected = selectedSegments.filter((id) =>
      correctSegments.some((segment) => segment.id === id)
    );

    const incorrectSelected = selectedSegments.filter(
      (id) => !correctSegments.some((segment) => segment.id === id)
    );

    // Calcul du score avec pénalité pour les mauvaises réponses
    const baseScore = (correctSelected.length / correctSegments.length) * 100;
    const penalty = incorrectSelected.length * 10;
    const finalScore = Math.max(0, Math.round(baseScore - penalty));

    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
    setShowFeedback(true);

    if (onGameComplete) {
      onGameComplete(finalScore);
    }
  };

  const resetGame = () => {
    setSelectedSegments([]);
    setIsCompleted(false);
    setScore(0);
    setShowResults(false);
    setShowFeedback(false);
  };

  const selectedStory = selectedSegments
    .map((id) => game.story.find((segment) => segment.id === id))
    .filter(Boolean);

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

  const getScoreMessage = (score: number) => {
    if (score >= 90)
      return {
        message: "Excellent ! Tu as très bien reconstitué l'histoire !",
        icon: Trophy,
        color: "text-yellow-500",
      };
    if (score >= 70)
      return {
        message: "Bien joué ! Tu as bien compris l'histoire.",
        icon: Star,
        color: "text-blue-500",
      };
    if (score >= 50)
      return {
        message: "Pas mal ! Continue à t'entraîner.",
        icon: Star,
        color: "text-green-500",
      };
    return {
      message: "N'abandonne pas ! Essaie encore.",
      icon: Star,
      color: "text-gray-500",
    };
  };

  const scoreInfo = getScoreMessage(score);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span>📖 {game.title}</span>
              {isCompleted && (
                <Badge variant={score >= 80 ? "default" : "secondary"}>
                  Score: {score}%
                </Badge>
              )}
            </CardTitle>
            <Badge className={getDifficultyColor(game.difficulty)}>
              {game.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{game.description}</p>

          {!isCompleted && (
            <div className="mb-4">
              <Progress
                value={
                  (selectedSegments.length / game.correctOrder.length) * 100
                }
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Sélectionné: {selectedSegments.length} /{" "}
                {game.correctOrder.length} segments
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {game.story.map((segment) => (
              <Card
                key={segment.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSegments.includes(segment.id)
                    ? "ring-2 ring-primary"
                    : ""
                } ${isCompleted && !segment.isCorrect ? "opacity-50" : ""}`}
                onClick={() => handleSegmentClick(segment.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square mb-3 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={segment.image}
                      alt={segment.text}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                  </div>
                  <p className="text-sm line-clamp-3">{segment.text}</p>
                  {isCompleted && (
                    <div className="mt-2 flex justify-center">
                      {segment.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            {!isCompleted ? (
              <Button
                onClick={checkAnswer}
                disabled={selectedSegments.length === 0}
                className="flex-1"
              >
                Vérifier ma réponse
              </Button>
            ) : (
              <Button onClick={resetGame} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Recommencer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showFeedback && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <scoreInfo.icon className={`h-6 w-6 ${scoreInfo.color}`} />
              <h3 className="font-semibold">Résultat</h3>
            </div>
            <p className="text-muted-foreground">{scoreInfo.message}</p>
          </CardContent>
        </Card>
      )}

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Ton histoire reconstituée</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStory.length > 0 ? (
              <div className="space-y-4">
                {selectedStory.map((segment, index) => (
                  <div key={segment?.id} className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src={segment?.image || "/placeholder.jpg"}
                        alt={segment?.text || "Image"}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{index + 1}.</span>{" "}
                        {segment?.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun segment sélectionné</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
