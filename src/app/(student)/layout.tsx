import { Nunito } from "next/font/google";
import { MobileStats } from "@/components/student/mobile-stats";
import { StreakClient } from "@/components/student/streak-client";
import { auth } from "../../../auth";
import { getStudentStats } from "@/lib/student-progress";

const nunito = Nunito({ subsets: ["latin"] });

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let stats = null;

  if (session?.user?.id) {
    try {
      stats = await getStudentStats(session.user.id);
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
    }
  }

  return (
    <div className={`${nunito.className} min-h-screen`}>
      <StreakClient />
      <main className="pb-20 md:pb-0">{children}</main>

      {stats && (
        <MobileStats
          progressPercentage={stats.progressPercentage}
          totalStars={stats.totalStars}
          avgAccuracy={stats.avgAccuracy}
          currentStreak={stats.currentStreak}
        />
      )}
    </div>
  );
}
