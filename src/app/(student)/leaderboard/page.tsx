import { Metadata } from "next";
import Leaderboard from "@/components/student/leaderboard";
import StudentAccessGuard from "@/components/access-control/StudentAccessGuard";

export const metadata: Metadata = {
  title: "Classement - SOS Planète Congo",
  description: "Classement des étudiants par performances et séries",
};

export default function LeaderboardPage() {
  return (
    <StudentAccessGuard requiredAccess="leaderboard">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Classement</h1>
          <p className="text-muted-foreground">
            Découvrez le classement des meilleurs étudiants
          </p>
        </div>

        <Leaderboard />
      </div>
    </StudentAccessGuard>
  );
}
