import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProfileStatsCardProps {
  stats: {
    totalStars: number;
    completedChapters: number;
    totalChapters: number;
    avgAccuracy: number;
    currentStreak: number;
    progressPercentage: number;
    totalTimeSpent: string;
    division: string;
    completedContes: number;
    balance: number;
  };
}

export function ProfileStatsCard({ stats }: ProfileStatsCardProps) {
  const getDivisionColor = (division: string) => {
    switch (division) {
      case "Diamant":
        return "bg-gradient-to-r from-blue-400 to-purple-500 text-white";
      case "Platine":
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-white";
      case "Or":
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
      case "Argent":
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
      default:
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Statistiques</span>
          <Badge className={getDivisionColor(stats.division)}>
            {stats.division}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progression générale */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression générale</span>
            <span>{stats.progressPercentage}%</span>
          </div>
          <Progress value={stats.progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {stats.completedChapters} / {stats.totalChapters} chapitres
            complétés
          </p>
        </div>

        {/* Grille des statistiques */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-lg font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-gray-500">Jours d'affilé</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl text-yellow-400">⭐</span>
            <div>
              <div className="text-lg font-bold">{stats.totalStars}</div>
              <div className="text-xs text-gray-500">Étoiles gagnées</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl text-green-500">📚</span>
            <div>
              <div className="text-lg font-bold">{stats.completedContes}</div>
              <div className="text-xs text-gray-500">Contes lus</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl text-blue-500">⏱️</span>
            <div>
              <div className="text-sm font-bold">{stats.totalTimeSpent}</div>
              <div className="text-xs text-gray-500">Temps d'apprentissage</div>
            </div>
          </div>
        </div>

        {/* Précision moyenne */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Précision moyenne</span>
            <span className="text-lg font-bold text-blue-600">
              {stats.avgAccuracy}%
            </span>
          </div>
        </div>

        {/* Solde */}
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Solde disponible</span>
            <span className="text-lg font-bold text-green-600">
              {stats.balance} étoiles
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
