"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Flame,
  Users,
  Crown,
  TrendingUp,
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  classroom?: string;
  totalStars?: number;
  completedChapters?: number;
  avgAccuracy?: number;
  score?: number;
  currentStreak?: number;
  lastActive?: string;
  rank: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<{
    global: LeaderboardEntry[];
    classroom: LeaderboardEntry[];
    streak: LeaderboardEntry[];
  }>({
    global: [],
    classroom: [],
    streak: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("global");

  useEffect(() => {
    fetchAllLeaderboards();
  }, []);

  const fetchAllLeaderboards = async () => {
    setLoading(true);
    try {
      const [globalResponse, classroomResponse, streakResponse] =
        await Promise.all([
          fetch("/api/leaderboard?type=global&limit=20"),
          fetch("/api/leaderboard?type=classroom&limit=20"),
          fetch("/api/leaderboard?type=streak&limit=20"),
        ]);

      const [globalData, classroomData, streakData] = await Promise.all([
        globalResponse.ok ? globalResponse.json() : { leaderboard: [] },
        classroomResponse.ok ? classroomResponse.json() : { leaderboard: [] },
        streakResponse.ok ? streakResponse.json() : { leaderboard: [] },
      ]);

      setLeaderboardData({
        global: globalData.leaderboard,
        classroom: classroomData.leaderboard,
        streak: streakData.leaderboard,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des leaderboards:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return (
          <span className="text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (rank === 2) return "bg-gray-100 text-gray-800 border-gray-300";
    if (rank === 3) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  const getInitials = (
    firstName: string | null,
    lastName: string | null,
    email: string
  ) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const formatName = (
    firstName: string | null,
    lastName: string | null,
    email: string
  ) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return email.split("@")[0];
  };

  const LeaderboardCard = ({
    entries,
    type,
  }: {
    entries: LeaderboardEntry[];
    type: "global" | "classroom" | "streak";
  }) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      );
    }

    if (entries.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune donnée disponible</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className={`transition-all duration-200 hover:shadow-md ${
              entry.isCurrentUser
                ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50"
                : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Rang */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {entry.rank <= 3 ? (
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getRankBadge(entry.rank)}`}
                      >
                        {getRankIcon(entry.rank)}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center">
                        <span className="text-sm font-bold text-muted-foreground">
                          #{entry.rank}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Avatar et info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {getInitials(
                          entry.firstName,
                          entry.lastName,
                          entry.email
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {formatName(
                          entry.firstName,
                          entry.lastName,
                          entry.email
                        )}
                        {entry.isCurrentUser && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Vous
                          </Badge>
                        )}
                      </h4>
                      {entry.classroom && (
                        <p className="text-sm text-muted-foreground">
                          {entry.classroom}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="flex items-center gap-6">
                  {type === "global" && (
                    <>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{entry.totalStars}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Étoiles</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{entry.completedChapters}</p>
                        <p className="text-xs text-muted-foreground">
                          Chapitres
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{entry.avgAccuracy}%</p>
                        <p className="text-xs text-muted-foreground">
                          Précision
                        </p>
                      </div>
                    </>
                  )}

                  {type === "classroom" && (
                    <>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{entry.totalStars}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Étoiles</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{entry.avgAccuracy}%</p>
                        <p className="text-xs text-muted-foreground">
                          Précision
                        </p>
                      </div>
                    </>
                  )}

                  {type === "streak" && (
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="font-bold text-xl">
                          {entry.currentStreak}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Jours</p>
                    </div>
                  )}

                  {/* Score total pour le tri */}
                  {(type === "global" || type === "classroom") &&
                    entry.score && (
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-bold">{entry.score}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Classement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="classroom" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Ma classe
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Séries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Classement mondial</h3>
              <p className="text-sm text-muted-foreground">
                Basé sur les étoiles totales et la précision
              </p>
            </div>
            <LeaderboardCard entries={leaderboardData.global} type="global" />
          </TabsContent>

          <TabsContent value="classroom" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Classement de classe</h3>
              <p className="text-sm text-muted-foreground">
                Comparez-vous avec vos camarades de classe
              </p>
            </div>
            <LeaderboardCard
              entries={leaderboardData.classroom}
              type="classroom"
            />
          </TabsContent>

          <TabsContent value="streak" className="mt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Séries de victoires</h3>
              <p className="text-sm text-muted-foreground">
                Qui a la plus longue série de jours consécutifs ?
              </p>
            </div>
            <LeaderboardCard entries={leaderboardData.streak} type="streak" />
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={fetchAllLeaderboards}
            className="w-full"
          >
            Actualiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
