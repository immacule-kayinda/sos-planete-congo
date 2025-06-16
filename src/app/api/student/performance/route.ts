import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

// POST - Enregistrer une performance pour un chapitre
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { chapterId, stars, timeSpent, accuracy } = body;

    // Validation des données
    if (
      !chapterId ||
      stars < 0 ||
      stars > 5 ||
      timeSpent < 0 ||
      accuracy < 0 ||
      accuracy > 1
    ) {
      return NextResponse.json(
        { message: "Données invalides" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Mettre à jour ou créer la performance
    const performance = await prisma.studentPerformance.upsert({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId,
        },
      },
      update: {
        stars: Math.max(stars, 0), // Garder le meilleur score
        timeSpent: timeSpent,
        accuracy: accuracy,
        updatedAt: new Date(),
      },
      create: {
        studentId: student.id,
        chapterId,
        stars,
        timeSpent,
        accuracy,
      },
      include: {
        chapter: {
          include: {
            module: {
              include: {
                section: true,
              },
            },
          },
        },
      },
    });

    // Marquer le chapitre comme lu dans la progression
    await prisma.studentChapterProgress.upsert({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId,
        },
      },
      update: {
        isRead: true,
        updatedAt: new Date(),
      },
      create: {
        studentId: student.id,
        chapterId,
        isRead: true,
        isCurrent: false,
      },
    });

    // Mettre à jour le streak si c'est une bonne performance
    if (stars >= 3) {
      await updateStudentStreak(student.id);
    }

    return NextResponse.json({ performance });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la performance:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// Fonction helper pour mettre à jour le streak
async function updateStudentStreak(studentId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const streak = await prisma.studentStreak.findUnique({
    where: { studentId },
  });

  if (!streak) {
    // Créer un nouveau streak
    await prisma.studentStreak.create({
      data: {
        studentId,
        currentStreak: 1,
        lastActive: new Date(),
      },
    });
  } else {
    const lastActiveDate = new Date(streak.lastActive);
    lastActiveDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (today.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      // Même jour, pas de changement de streak
      return;
    } else if (daysDiff === 1) {
      // Jour consécutif, incrémenter le streak
      await prisma.studentStreak.update({
        where: { studentId },
        data: {
          currentStreak: streak.currentStreak + 1,
          lastActive: new Date(),
        },
      });
    } else {
      // Trop de jours manqués, recommencer le streak
      await prisma.studentStreak.update({
        where: { studentId },
        data: {
          currentStreak: 1,
          lastActive: new Date(),
        },
      });
    }
  }
}
