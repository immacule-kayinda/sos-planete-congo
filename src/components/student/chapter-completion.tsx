"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ChapterCompletionProps {
  chapterId: string;
  chapterTitle: string;
  onComplete?: () => void;
}

export default function ChapterCompletion({
  chapterId,
  chapterTitle,
  onComplete,
}: ChapterCompletionProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async (
    stars: number,
    timeSpent: number,
    accuracy: number
  ) => {
    setIsCompleting(true);

    try {
      const response = await fetch("/api/student/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterId,
          stars,
          timeSpent,
          accuracy,
        }),
      });

      if (response.ok) {
        await response.json();
        toast.success(
          `Chapitre terminé avec ${stars} étoile${stars > 1 ? "s" : ""} !`,
          {
            description: `Précision: ${Math.round(accuracy * 100)}%`,
          }
        );
        onComplete?.();
      } else {
        throw new Error("Erreur lors de l'enregistrement");
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de votre progression");
      console.error("Erreur:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  // Simuler différents niveaux de performance
  const simulateCompletion = (level: "excellent" | "bon" | "moyen") => {
    let stars, accuracy;
    const timeSpent = Math.floor(Math.random() * 600) + 300; // 5-15 minutes

    switch (level) {
      case "excellent":
        stars = 5;
        accuracy = 0.9 + Math.random() * 0.1; // 90-100%
        break;
      case "bon":
        stars = Math.floor(Math.random() * 2) + 3; // 3-4 étoiles
        accuracy = 0.7 + Math.random() * 0.2; // 70-90%
        break;
      case "moyen":
        stars = Math.floor(Math.random() * 2) + 1; // 1-2 étoiles
        accuracy = 0.5 + Math.random() * 0.2; // 50-70%
        break;
    }

    handleComplete(stars, timeSpent, accuracy);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Terminer le chapitre
        </CardTitle>
        <p className="text-sm text-muted-foreground">{chapterTitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          Sélectionnez votre niveau de performance pour ce chapitre :
        </p>

        <div className="grid gap-3">
          <Button
            onClick={() => simulateCompletion("excellent")}
            disabled={isCompleting}
            className="flex items-center justify-between bg-green-600 hover:bg-green-700"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>Excellent (5 étoiles)</span>
            </div>
            <span className="text-sm opacity-75">90-100%</span>
          </Button>

          <Button
            onClick={() => simulateCompletion("bon")}
            disabled={isCompleting}
            variant="outline"
            className="flex items-center justify-between border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="h-4 w-4 text-gray-300" />
              </div>
              <span>Bon (3-4 étoiles)</span>
            </div>
            <span className="text-sm opacity-75">70-90%</span>
          </Button>

          <Button
            onClick={() => simulateCompletion("moyen")}
            disabled={isCompleting}
            variant="outline"
            className="flex items-center justify-between border-orange-300 hover:bg-orange-50"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i + 2} className="h-4 w-4 text-gray-300" />
                ))}
              </div>
              <span>Moyen (1-2 étoiles)</span>
            </div>
            <span className="text-sm opacity-75">50-70%</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Clock className="h-4 w-4" />
          <span>Le temps passé sera automatiquement calculé</span>
        </div>
      </CardContent>
    </Card>
  );
}
