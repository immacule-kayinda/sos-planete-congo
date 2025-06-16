"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, Star, Target } from "lucide-react";

interface ChapterProgress {
  id: string;
  isRead: boolean;
  isCurrent: boolean;
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    order: number;
    module: {
      id: string;
      title: string;
      order: number;
      section: {
        id: string;
        title: string;
        order: number;
      };
    };
  };
}

interface Performance {
  id: string;
  stars: number;
  timeSpent: number;
  accuracy: number;
  chapter: {
    id: string;
    title: string;
  };
}

interface ProgressData {
  progress: ChapterProgress[];
  performance: Performance[];
}

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch("/api/student/progress");
      if (response.ok) {
        const data = await response.json();
        setProgressData(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la progression:", error);
    } finally {
      setLoading(false);
    }
  };

  const markChapterAsCurrent = async (chapterId: string) => {
    try {
      const response = await fetch("/api/student/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterId,
          isCurrent: true,
        }),
      });

      if (response.ok) {
        fetchProgress();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progressData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aucune donnée de progression disponible.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { progress, performance } = progressData;

  // Organiser par sections et modules
  const sections = progress.reduce((acc, prog) => {
    const sectionId = prog.chapter.module.section.id;
    if (!acc[sectionId]) {
      acc[sectionId] = {
        section: prog.chapter.module.section,
        modules: {},
      };
    }

    const moduleId = prog.chapter.module.id;
    if (!acc[sectionId].modules[moduleId]) {
      acc[sectionId].modules[moduleId] = {
        module: prog.chapter.module,
        chapters: [],
      };
    }

    acc[sectionId].modules[moduleId].chapters.push(prog);
    return acc;
  }, {} as any);

  // Calculer les statistiques globales
  const totalChapters = progress.length;
  const completedChapters = progress.filter((p) => p.isRead).length;
  const progressPercentage =
    totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  const totalStars = performance.reduce((sum, perf) => sum + perf.stars, 0);
  const avgAccuracy =
    performance.length > 0
      ? performance.reduce((sum, perf) => sum + perf.accuracy, 0) /
        performance.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Progression</p>
                <p className="text-2xl font-bold">
                  {Math.round(progressPercentage)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Chapitres</p>
                <p className="text-2xl font-bold">
                  {completedChapters}/{totalChapters}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Étoiles totales</p>
                <p className="text-2xl font-bold">{totalStars}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Précision</p>
                <p className="text-2xl font-bold">
                  {Math.round(avgAccuracy * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de progression globale */}
      <Card>
        <CardHeader>
          <CardTitle>Progression générale</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            {completedChapters} sur {totalChapters} chapitres terminés
          </p>
        </CardContent>
      </Card>

      {/* Détail par sections */}
      <div className="space-y-4">
        {Object.values(sections)
          .sort((a: any, b: any) => a.section.order - b.section.order)
          .map((sectionData: any) => (
            <Card key={sectionData.section.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Section {sectionData.section.order}:{" "}
                  {sectionData.section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.values(sectionData.modules)
                    .sort((a: any, b: any) => a.module.order - b.module.order)
                    .map((moduleData: any) => (
                      <div
                        key={moduleData.module.id}
                        className="border rounded-lg p-4"
                      >
                        <h4 className="font-semibold mb-3">
                          Module {moduleData.module.order}:{" "}
                          {moduleData.module.title}
                        </h4>
                        <div className="grid gap-2">
                          {moduleData.chapters
                            .sort(
                              (a: any, b: any) =>
                                a.chapter.order - b.chapter.order
                            )
                            .map((chapterProg: ChapterProgress) => {
                              const perf = performance.find(
                                (p) => p.chapter.id === chapterProg.chapter.id
                              );

                              return (
                                <div
                                  key={chapterProg.chapter.id}
                                  className={`flex items-center justify-between p-3 rounded border ${
                                    chapterProg.isCurrent
                                      ? "border-blue-500 bg-blue-50"
                                      : chapterProg.isRead
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div>
                                      {chapterProg.isRead ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                      ) : chapterProg.isCurrent ? (
                                        <Clock className="h-5 w-5 text-blue-500" />
                                      ) : (
                                        <BookOpen className="h-5 w-5 text-gray-400" />
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-medium">
                                        {chapterProg.chapter.title}
                                      </h5>
                                      <p className="text-sm text-muted-foreground">
                                        {chapterProg.chapter.subtitle}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {perf && (
                                      <div className="flex items-center gap-2">
                                        <Badge variant="secondary">
                                          {Array.from({
                                            length: perf.stars,
                                          }).map((_, i) => (
                                            <Star
                                              key={i}
                                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                            />
                                          ))}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                          {Math.round(perf.accuracy * 100)}%
                                        </span>
                                      </div>
                                    )}

                                    {!chapterProg.isCurrent &&
                                      !chapterProg.isRead && (
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            markChapterAsCurrent(
                                              chapterProg.chapter.id
                                            )
                                          }
                                        >
                                          Commencer
                                        </Button>
                                      )}

                                    {chapterProg.isCurrent && (
                                      <Badge variant="default">En cours</Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
