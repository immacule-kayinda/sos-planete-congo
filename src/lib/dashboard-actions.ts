import prisma from "@/lib/prisma";

export interface DashboardStats {
  totalUsers: number;
  totalModules: number;
  totalChapters: number;
  totalContes: number;
  usersThisMonth: number;
  modulesThisMonth: number;
  chaptersThisMonth: number;
  contesThisMonth: number;
}

export interface UserDistribution {
  students: number;
  teachers: number;
  admins: number;
  studentsPercentage: number;
  teachersPercentage: number;
  adminsPercentage: number;
}

export interface RecentActivity {
  id: string;
  type:
    | "user_registered"
    | "module_created"
    | "chapter_created"
    | "conte_created";
  title: string;
  description: string;
  timestamp: Date;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Date d'il y a un mois
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Compter les totaux
    const [totalUsers, totalModules, totalChapters, totalContes] =
      await Promise.all([
        prisma.user.count(),
        prisma.module.count(),
        prisma.chapter.count(),
        prisma.conte.count(),
      ]);

    // Compter les nouveaux éléments ce mois-ci
    const [
      usersThisMonth,
      modulesThisMonth,
      chaptersThisMonth,
      contesThisMonth,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      }),
      prisma.module.count({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      }),
      prisma.chapter.count({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      }),
      prisma.conte.count({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalModules,
      totalChapters,
      totalContes,
      usersThisMonth,
      modulesThisMonth,
      chaptersThisMonth,
      contesThisMonth,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Retourner des valeurs par défaut en cas d'erreur
    return {
      totalUsers: 0,
      totalModules: 0,
      totalChapters: 0,
      totalContes: 0,
      usersThisMonth: 0,
      modulesThisMonth: 0,
      chaptersThisMonth: 0,
      contesThisMonth: 0,
    };
  }
}

export async function getUserDistribution(): Promise<UserDistribution> {
  try {
    const [students, teachers, admins] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "TEACHER" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);

    const total = students + teachers + admins;

    return {
      students,
      teachers,
      admins,
      studentsPercentage: total > 0 ? Math.round((students / total) * 100) : 0,
      teachersPercentage: total > 0 ? Math.round((teachers / total) * 100) : 0,
      adminsPercentage: total > 0 ? Math.round((admins / total) * 100) : 0,
    };
  } catch (error) {
    console.error("Error fetching user distribution:", error);
    return {
      students: 0,
      teachers: 0,
      admins: 0,
      studentsPercentage: 0,
      teachersPercentage: 0,
      adminsPercentage: 0,
    };
  }
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  try {
    const activities: RecentActivity[] = [];

    // Récupérer les nouveaux utilisateurs (derniers 7 jours)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      include: {
        student: true,
        teacher: true,
      },
    });

    // Ajouter les nouveaux utilisateurs aux activités
    recentUsers.forEach((user) => {
      const roleText =
        user.role === "STUDENT"
          ? "étudiant"
          : user.role === "TEACHER"
            ? "enseignant"
            : "administrateur";
      const name = user.student
        ? `${user.student.firstName || ""} ${user.student.lastName || ""}`.trim()
        : user.teacher
          ? `${user.teacher.firstName} ${user.teacher.lastName}`
          : user.email;

      activities.push({
        id: user.id,
        type: "user_registered",
        title: "Nouvel utilisateur inscrit",
        description: `${name || user.email} s'est inscrit en tant que ${roleText}`,
        timestamp: user.createdAt,
      });
    });

    // Récupérer les nouveaux modules
    const recentModules = await prisma.module.findMany({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
    });

    recentModules.forEach((module) => {
      activities.push({
        id: module.id,
        type: "module_created",
        title: "Nouveau module ajouté",
        description: `"${module.title}" a été créé`,
        timestamp: module.createdAt,
      });
    });

    // Récupérer les nouveaux chapitres
    const recentChapters = await prisma.chapter.findMany({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      include: {
        module: true,
      },
    });

    recentChapters.forEach((chapter) => {
      activities.push({
        id: chapter.id,
        type: "chapter_created",
        title: "Nouveau chapitre ajouté",
        description: `"${chapter.title}" a été ajouté au module "${chapter.module.title}"`,
        timestamp: chapter.createdAt,
      });
    });

    // Trier par timestamp décroissant et limiter à 5 activités
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return "Juste maintenant";
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  } else {
    return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  }
}

export { formatTimeAgo };
