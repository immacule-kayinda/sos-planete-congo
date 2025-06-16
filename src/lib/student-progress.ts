import prisma from "@/lib/prisma";

export interface PerformanceData {
  chapterId: string;
  stars: number;
  timeSpent: number;
  accuracy: number;
}

export interface ProgressUpdate {
  chapterId: string;
  isRead?: boolean;
  isCurrent?: boolean;
}

/**
 * Enregistrer une performance pour un étudiant
 */
export async function recordStudentPerformance(
  studentId: string,
  performanceData: PerformanceData
) {
  const { chapterId, stars, timeSpent, accuracy } = performanceData;

  // Validation des données
  if (stars < 0 || stars > 5 || timeSpent < 0 || accuracy < 0 || accuracy > 1) {
    throw new Error("Données de performance invalides");
  }

  try {
    // Enregistrer la performance
    const performance = await prisma.studentPerformance.upsert({
      where: {
        studentId_chapterId: {
          studentId,
          chapterId,
        },
      },
      update: {
        stars: Math.max(stars, 0), // Garder le meilleur score
        timeSpent,
        accuracy,
        updatedAt: new Date(),
      },
      create: {
        studentId,
        chapterId,
        stars,
        timeSpent,
        accuracy,
      },
    });

    // Marquer le chapitre comme lu
    await updateStudentProgress(studentId, {
      chapterId,
      isRead: true,
    });

    // Mettre à jour le streak si bonne performance
    if (stars >= 3) {
      await updateStudentStreak(studentId);
    }

    return performance;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la performance:", error);
    throw error;
  }
}

/**
 * Mettre à jour la progression d'un étudiant
 */
export async function updateStudentProgress(
  studentId: string,
  progressUpdate: ProgressUpdate
) {
  const { chapterId, isRead, isCurrent } = progressUpdate;

  try {
    const progress = await prisma.studentChapterProgress.upsert({
      where: {
        studentId_chapterId: {
          studentId,
          chapterId,
        },
      },
      update: {
        isRead: isRead !== undefined ? isRead : undefined,
        isCurrent: isCurrent !== undefined ? isCurrent : undefined,
        updatedAt: new Date(),
      },
      create: {
        studentId,
        chapterId,
        isRead: isRead || false,
        isCurrent: isCurrent || false,
      },
    });

    // Si on marque un chapitre comme actuel, désactiver les autres
    if (isCurrent) {
      await prisma.studentChapterProgress.updateMany({
        where: {
          studentId,
          id: { not: progress.id },
        },
        data: {
          isCurrent: false,
        },
      });
    }

    return progress;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    throw error;
  }
}

/**
 * Mettre à jour le streak d'un étudiant
 */
export async function updateStudentStreak(studentId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
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
        return streak;
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
  } catch (error) {
    console.error("Erreur lors de la mise à jour du streak:", error);
    throw error;
  }
}

/**
 * Obtenir les statistiques d'un étudiant
 */
export async function getStudentStats(studentId: string) {
  try {
    const [performance, progress, streak] = await Promise.all([
      prisma.studentPerformance.findMany({
        where: { studentId },
      }),
      prisma.studentChapterProgress.findMany({
        where: { studentId },
      }),
      prisma.studentStreak.findUnique({
        where: { studentId },
      }),
    ]);

    const totalStars = performance.reduce((sum, perf) => sum + perf.stars, 0);
    const completedChapters = progress.filter((p) => p.isRead).length;
    const avgAccuracy =
      performance.length > 0
        ? performance.reduce((sum, perf) => sum + perf.accuracy, 0) /
          performance.length
        : 0;

    return {
      totalStars,
      completedChapters,
      totalChapters: progress.length,
      avgAccuracy: Math.round(avgAccuracy * 100),
      currentStreak: streak?.currentStreak || 0,
      progressPercentage:
        progress.length > 0 ? (completedChapters / progress.length) * 100 : 0,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}

/**
 * Initialiser la progression pour un étudiant avec tous les chapitres disponibles
 */
export async function initializeStudentProgress(studentId: string) {
  try {
    // Récupérer tous les chapitres
    const chapters = await prisma.chapter.findMany({
      orderBy: [
        { module: { section: { order: "asc" } } },
        { module: { order: "asc" } },
        { order: "asc" },
      ],
    });

    // Créer la progression pour chaque chapitre
    const progressData = chapters.map((chapter, index) => ({
      studentId,
      chapterId: chapter.id,
      isRead: false,
      isCurrent: index === 0, // Premier chapitre comme actuel
    }));

    await prisma.studentChapterProgress.createMany({
      data: progressData,
      skipDuplicates: true,
    });

    return progressData.length;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la progression:", error);
    throw error;
  }
}
