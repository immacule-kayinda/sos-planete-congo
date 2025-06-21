"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

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

interface SimpleStoryGameProps {
  game: StoryGame;
  onGameComplete?: (score: number) => void;
}

export function SimpleStoryGame({
  game,
  onGameComplete,
}: SimpleStoryGameProps) {
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

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

    const scorePercentage =
      (correctSelected.length / correctSegments.length) * 100;
    setScore(Math.round(scorePercentage));
    setIsCompleted(true);
    setShowResults(true);

    if (onGameComplete) {
      onGameComplete(Math.round(scorePercentage));
    }
  };

  const resetGame = () => {
    setSelectedSegments([]);
    setIsCompleted(false);
    setScore(0);
    setShowResults(false);
  };

  const selectedStory = selectedSegments
    .map((id) => game.story.find((segment) => segment.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📖 {game.title}</span>
            {isCompleted && (
              <Badge variant={score >= 80 ? "default" : "secondary"}>
                Score: {score}%
              </Badge>
            )}
          </CardTitle>
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
                  <div className="aspect-square mb-3 bg-muted rounded-lg flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🖼️</span>
                    </div>
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
                    <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-xl">🖼️</span>
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
