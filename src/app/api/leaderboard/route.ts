import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "global"; // global, classroom, streak
    const limit = parseInt(searchParams.get("limit") || "10");

    let leaderboard;

    switch (type) {
      case "global":
        leaderboard = await getGlobalLeaderboard(limit);
        break;
      case "classroom":
        leaderboard = await getClassroomLeaderboard(session.user.id, limit);
        break;
      case "streak":
        leaderboard = await getStreakLeaderboard(limit);
        break;
      default:
        leaderboard = await getGlobalLeaderboard(limit);
    }

    return NextResponse.json({ leaderboard, type });
  } catch (error) {
    console.error("Erreur lors de la récupération du leaderboard:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// Leaderboard global basé sur les étoiles totales
async function getGlobalLeaderboard(limit: number) {
  const students = await prisma.student.findMany({
    where: {
      accountStatus: "ACTIVE",
      user: {
        isActive: true,
      },
    },
    include: {
      performance: true,
      user: {
        select: {
          email: true,
        },
      },
      Classroom: {
        select: {
          name: true,
        },
      },
    },
  });

  const leaderboard = students
    .map((student) => {
      const totalStars = student.performance.reduce(
        (sum, perf) => sum + perf.stars,
        0
      );
      const totalChapters = student.performance.length;
      const avgAccuracy =
        totalChapters > 0
          ? student.performance.reduce((sum, perf) => sum + perf.accuracy, 0) /
            totalChapters
          : 0;

      return {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.user.email,
        classroom: student.Classroom?.name,
        totalStars,
        completedChapters: totalChapters,
        avgAccuracy: Math.round(avgAccuracy * 100),
        score: totalStars * 100 + Math.round(avgAccuracy * 10), // Score composite
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

  return leaderboard;
}

// Leaderboard de classe
async function getClassroomLeaderboard(userId: string, limit: number) {
  const currentStudent = await prisma.student.findUnique({
    where: { userId },
    include: { Classroom: true },
  });

  if (!currentStudent?.Classroom) {
    return [];
  }

  const students = await prisma.student.findMany({
    where: {
      classroomId: currentStudent.classroomId,
      accountStatus: "ACTIVE",
      user: {
        isActive: true,
      },
    },
    include: {
      performance: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const leaderboard = students
    .map((student) => {
      const totalStars = student.performance.reduce(
        (sum, perf) => sum + perf.stars,
        0
      );
      const totalChapters = student.performance.length;
      const avgAccuracy =
        totalChapters > 0
          ? student.performance.reduce((sum, perf) => sum + perf.accuracy, 0) /
            totalChapters
          : 0;

      return {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.user.email,
        totalStars,
        completedChapters: totalChapters,
        avgAccuracy: Math.round(avgAccuracy * 100),
        score: totalStars * 100 + Math.round(avgAccuracy * 10),
        isCurrentUser: student.userId === userId,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

  return leaderboard;
}

// Leaderboard des streaks
async function getStreakLeaderboard(limit: number) {
  const streaks = await prisma.studentStreak.findMany({
    include: {
      student: {
        include: {
          user: {
            select: {
              email: true,
              isActive: true,
            },
          },
          Classroom: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      currentStreak: "desc",
    },
    take: limit,
  });

  const leaderboard = streaks
    .filter(
      (streak) =>
        streak.student.user.isActive &&
        streak.student.accountStatus === "ACTIVE"
    )
    .map((streak, index) => ({
      id: streak.student.id,
      firstName: streak.student.firstName,
      lastName: streak.student.lastName,
      email: streak.student.user.email,
      classroom: streak.student.Classroom?.name,
      currentStreak: streak.currentStreak,
      lastActive: streak.lastActive,
      rank: index + 1,
    }));

  return leaderboard;
}
