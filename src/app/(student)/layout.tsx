import { MobileStats } from "@/components/student/mobile-stats";
import NavLinks from "@/components/ui/userDashboard/navLinks";
import LogoutButton from "@/components/logout-bouton";
import { getStudentStats } from "@/lib/student-progress";
import { Flame } from "lucide-react";
import { Nunito } from "next/font/google";
import Image from "next/image";
import { auth } from "../../../auth";
import { RoleGuard } from "@/components/access-control/RoleGuard";

const nunito = Nunito({ subsets: ["latin"] });

// async function getStudentAccountStatus(userId: string) {
//   try {
//     const student = await prisma.student.findUnique({
//       where: { userId },
//       select: { accountStatus: true },
//     });
//     return student?.accountStatus || "ACTIVE";
//   } catch (error) {
//     console.error("Erreur lors de la récupération du statut:", error);
//     return "ACTIVE";
//   }
// }

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let stats = null;
  // let accountStatus = "ACTIVE";

  if (session?.user?.id) {
    try {
      stats = await getStudentStats(session.user.id);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  return (
    <RoleGuard allowedRoles={["STUDENT"]}>
      <div
        className={`${nunito.className} h-screen md:flex flex-col overflow-hidden`}
      >
        <main className="md:flex h-full">
          <div className="z-40 md:h-full px-5 md:py-4 py-2 border-r md:w-2/12 w-screen gap-3 bg-white absolute md:z-50 md:static h-fit bottom-0 border-t md:border-t-0">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="mb-5 hidden md:block"
            />
            <NavLinks />

            <LogoutButton />
          </div>
          <div className="md:w-8/12 w-screen px-5 md:px-10 md:py-4 pt-16 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-20">
            <div className="lg:w-5/6 m-auto self-end items-end">{children}</div>
          </div>
          <div className="md:w-2/12 px-3 py-2 md:px-5 md:py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] absolute right-0 top-0 w-full bg-white border-b md:border-b-0 md:border-l">
            {/* Header mobile avec streak */}
            <div className="flex justify-between md:hidden mb-4">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <p className="text-sm font-medium">0</p>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <p className="text-sm font-medium">0</p>
              </div>
            </div>
          </div>
        </main>

        {stats && (
          <MobileStats
            progressPercentage={stats.progressPercentage}
            totalStars={stats.totalStars}
            avgAccuracy={stats.avgAccuracy}
            currentStreak={stats.currentStreak}
          />
        )}
      </div>
    </RoleGuard>
  );
}
