"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { StoryGame } from "@/lib/game-data";

interface StoryGameComponentProps {
  game: StoryGame;
  onGameComplete?: (score: number) => void;
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function StoryGameComponent({
  game,
  onGameComplete,
}: StoryGameComponentProps) {
  // On mélange les segments corrects pour la partie "Mon histoire"
  const [availableSegments, setAvailableSegments] = useState(() =>
    shuffle(game.story.map((s) => s.id))
  );
  const [storyOrder, setStoryOrder] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const checkAnswer = () => {
    const correctOrder = game.correctOrder;
    let correctPositions = 0;
    storyOrder.forEach((segmentId, index) => {
      if (correctOrder[index] === segmentId) correctPositions++;
    });
    const scorePercentage = (correctPositions / correctOrder.length) * 100;
    setScore(Math.round(scorePercentage));
    setIsCompleted(true);
    setShowResults(true);
    if (onGameComplete) onGameComplete(Math.round(scorePercentage));
  };

  const resetGame = () => {
    setAvailableSegments(shuffle(game.story.map((s) => s.id)));
    setStoryOrder([]);
    setIsCompleted(false);
    setScore(0);
    setShowResults(false);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90)
      return {
        message: "Excellent ! Tu as très bien reconstitué l'histoire !",
        color: "text-yellow-500",
      };
    if (score >= 70)
      return {
        message: "Bien joué ! Tu as bien compris l'histoire.",
        color: "text-blue-500",
      };
    if (score >= 50)
      return {
        message: "Pas mal ! Continue à t'entraîner.",
        color: "text-green-500",
      };
    return {
      message: "N'abandonne pas ! Essaie encore.",
      color: "text-gray-500",
    };
  };
  const scoreInfo = getScoreMessage(score);

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
          <div className="mb-4">
            <Progress
              value={(storyOrder.length / game.correctOrder.length) * 100}
              className="mb-2"
            />
            <p className="text-sm text-muted-foreground">
              Schéma narratif: {storyOrder.length} / {game.correctOrder.length}{" "}
              éléments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Segments disponibles */}
            <div>
              <h3 className="font-semibold mb-2 text-center">
                Éléments disponibles
              </h3>
              <Droppable droppableId="available" direction="vertical">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] p-2 rounded-lg border-2 ${
                      snapshot.isDraggingOver
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {availableSegments.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        Aucun élément disponible
                      </div>
                    )}
                    {availableSegments.map((segmentId, index) => {
                      const segment = game.story.find(
                        (s) => s.id === segmentId
                      );
                      return (
                        <Draggable
                          key={segmentId}
                          draggableId={segmentId.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 ${
                                snapshot.isDragging ? "scale-105 z-10" : ""
                              }`}
                            >
                              <Card className="w-full">
                                <CardContent className="p-3 flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">🖼️</span>
                                  </div>
                                  <span className="text-sm">
                                    {segment?.text}
                                  </span>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {/* Mon histoire (drop target) */}
            <div>
              <h3 className="font-semibold mb-2 text-center">
                Mon schéma narratif (glisse ici et réordonne)
              </h3>
              <Droppable droppableId="story" direction="vertical">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] p-2 rounded-lg border-2 ${
                      snapshot.isDraggingOver
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {storyOrder.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        Glisse ici les éléments pour construire ton schéma
                        narratif
                      </div>
                    )}
                    {storyOrder.map((segmentId, index) => {
                      const segment = game.story.find(
                        (s) => s.id === segmentId
                      );
                      return (
                        <Draggable
                          key={segmentId}
                          draggableId={segmentId.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 ${
                                snapshot.isDragging ? "scale-105 z-10" : ""
                              }`}
                            >
                              <Card className="w-full border-2 border-primary/60">
                                <CardContent className="p-3 flex items-center gap-3">
                                  <Badge variant="outline" className="mr-2">
                                    {index + 1}
                                  </Badge>
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">🖼️</span>
                                  </div>
                                  <span className="text-sm">
                                    {segment?.text}
                                  </span>
                                  {!isCompleted && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        // Retirer ce segment de l'histoire et le remettre dans les disponibles
                                        setStoryOrder(
                                          storyOrder.filter(
                                            (_, i) => i !== index
                                          )
                                        );
                                        setAvailableSegments([
                                          ...availableSegments,
                                          segmentId,
                                        ]);
                                      }}
                                      className="ml-auto"
                                    >
                                      Retirer
                                    </Button>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            {!isCompleted ? (
              <Button
                onClick={checkAnswer}
                disabled={storyOrder.length !== game.correctOrder.length}
                className="flex-1"
              >
                Vérifier mon schéma narratif
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
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold">Résultat</h3>
            </div>
            <p className={`${scoreInfo.color} font-medium`}>
              {scoreInfo.message}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
