"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Star,
  Target,
  CheckCircle,
  Trophy,
  Flame,
  TrendingUp,
  Users,
} from "lucide-react";
import { MobileStats } from "./mobile-stats";

interface StudentStats {
  totalStars: number;
  completedChapters: number;
  totalChapters: number;
  avgAccuracy: number;
  currentStreak: number;
  progressPercentage: number;
}

interface StudentRanking {
  globalRank?: number;
  classroomRank?: number;
  streakRank?: number;
}

export default function StudentStatsSidebar() {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [ranking, setRanking] = useState<StudentRanking>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRanking();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/student/progress");
      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues:", data);

        // Calculer les statistiques à partir des données
        const { progress, performance } = data;
        const totalChapters = progress.length;
        const completedChapters = progress.filter((p: any) => p.isRead).length;

        console.log(
          "Chapitres total:",
          totalChapters,
          "Chapitres terminés:",
          completedChapters
        );
        console.log("Données de performance:", performance);

        // Calculs des statistiques avec fallbacks si pas de données de performance
        const totalStars =
          performance && performance.length > 0
            ? performance.reduce(
                (sum: number, perf: any) => sum + perf.stars,
                0
              )
            : completedChapters * 20; // 20 étoiles par chapitre par défaut

        const avgAccuracy =
          performance && performance.length > 0
            ? performance.reduce(
                (sum: number, perf: any) => sum + perf.accuracy,
                0
              ) / performance.length
            : 0.85; // 85% de précision par défaut

        const statsData = {
          totalStars,
          completedChapters,
          totalChapters,
          avgAccuracy: Math.round(avgAccuracy * 100),
          currentStreak: 0, // À récupérer depuis l'API streak plus tard
          progressPercentage:
            totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0,
        };

        console.log("Statistiques calculées:", statsData);
        setStats(statsData);
      } else {
        console.error("Erreur de réponse:", response.status);
        const errorData = await response.json();
        console.error("Détails de l'erreur:", errorData);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRanking = async () => {
    try {
      // Récupérer les classements pour obtenir le rang de l'utilisateur
      const [globalResponse, classroomResponse, streakResponse] =
        await Promise.all([
          fetch("/api/leaderboard?type=global&limit=100"),
          fetch("/api/leaderboard?type=classroom&limit=100"),
          fetch("/api/leaderboard?type=streak&limit=100"),
        ]);

      const [globalData, classroomData, streakData] = await Promise.all([
        globalResponse.ok ? globalResponse.json() : { leaderboard: [] },
        classroomResponse.ok ? classroomResponse.json() : { leaderboard: [] },
        streakResponse.ok ? streakResponse.json() : { leaderboard: [] },
      ]);

      // Trouver le rang de l'utilisateur actuel
      const globalRank = globalData.leaderboard.find(
        (entry: any) => entry.isCurrentUser
      )?.rank;
      const classroomRank = classroomData.leaderboard.find(
        (entry: any) => entry.isCurrentUser
      )?.rank;
      const streakRank = streakData.leaderboard.find(
        (entry: any) => entry.isCurrentUser
      )?.rank;

      setRanking({
        globalRank,
        classroomRank,
        streakRank,
      });
    } catch (error) {
      console.error("Erreur lors du chargement du classement:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-24 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">
          Aucune donnée disponible
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Version desktop */}
      <div className="hidden md:block space-y-4">
        {/* Progression générale */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Progression
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {Math.round(stats.progressPercentage)}%
              </span>
              <Badge variant="secondary" className="text-xs">
                {stats.completedChapters}/{stats.totalChapters}
              </Badge>
            </div>
            <Progress value={stats.progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {stats.completedChapters} chapitres terminés
            </p>
          </CardContent>
        </Card>

        {/* Performances */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Performances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Étoiles</span>
              </div>
              <span className="font-bold">{stats.totalStars}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-muted-foreground">Précision</span>
              </div>
              <span className="font-bold">{stats.avgAccuracy}%</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-muted-foreground">Série</span>
              </div>
              <span className="font-bold">{stats.currentStreak} jours</span>
            </div>
          </CardContent>
        </Card>

        {/* Classements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Classements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Global</span>
              </div>
              <Badge
                variant={
                  ranking.globalRank && ranking.globalRank <= 3
                    ? "default"
                    : "secondary"
                }
              >
                #{ranking.globalRank || "-"}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-muted-foreground">Classe</span>
              </div>
              <Badge
                variant={
                  ranking.classroomRank && ranking.classroomRank <= 3
                    ? "default"
                    : "secondary"
                }
              >
                #{ranking.classroomRank || "-"}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-muted-foreground">Série</span>
              </div>
              <Badge
                variant={
                  ranking.streakRank && ranking.streakRank <= 3
                    ? "default"
                    : "secondary"
                }
              >
                #{ranking.streakRank || "-"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Version mobile */}
      <MobileStats
        progressPercentage={stats.progressPercentage}
        totalStars={stats.totalStars}
        avgAccuracy={stats.avgAccuracy}
        currentStreak={stats.currentStreak}
      />
    </div>
  );
}
