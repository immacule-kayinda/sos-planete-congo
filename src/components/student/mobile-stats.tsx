import { Target, Star, CheckCircle, Flame } from "lucide-react";

interface MobileStatsProps {
  progressPercentage: number;
  totalStars: number;
  avgAccuracy: number;
  currentStreak: number;
}

export function MobileStats({
  progressPercentage,
  totalStars,
  avgAccuracy,
  currentStreak,
}: MobileStatsProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="grid grid-cols-4 gap-2">
        {/* Progression */}
        <div className="flex flex-col items-center">
          <Target className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-xs font-medium">
            {Math.round(progressPercentage)}%
          </span>
          <span className="text-[10px] text-muted-foreground">Progression</span>
        </div>

        {/* Étoiles */}
        <div className="flex flex-col items-center">
          <Star className="h-5 w-5 text-yellow-500 mb-1" />
          <span className="text-xs font-medium">{totalStars}</span>
          <span className="text-[10px] text-muted-foreground">Étoiles</span>
        </div>

        {/* Précision */}
        <div className="flex flex-col items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
          <span className="text-xs font-medium">{avgAccuracy}%</span>
          <span className="text-[10px] text-muted-foreground">Précision</span>
        </div>

        {/* Série */}
        <div className="flex flex-col items-center">
          <Flame className="h-5 w-5 text-orange-500 mb-1" />
          <span className="text-xs font-medium">{currentStreak}</span>
          <span className="text-[10px] text-muted-foreground">Série</span>
        </div>
      </div>
    </div>
  );
}
