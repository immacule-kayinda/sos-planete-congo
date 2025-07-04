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
 * Mettre à jour le streak d'un étudiant avec système de récompenses
 */
export async function updateStudentStreak(studentId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const streak = await prisma.studentStreak.findUnique({
      where: { studentId },
    });

    let newStreak = 0;
    let bonusStars = 0;

    if (!streak) {
      // Créer un nouveau streak
      newStreak = 1;
      await prisma.studentStreak.create({
        data: {
          studentId,
          currentStreak: newStreak,
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
        newStreak = streak.currentStreak + 1;
        await prisma.studentStreak.update({
          where: { studentId },
          data: {
            currentStreak: newStreak,
            lastActive: new Date(),
          },
        });
      } else {
        // Trop de jours manqués, recommencer le streak
        newStreak = 1;
        await prisma.studentStreak.update({
          where: { studentId },
          data: {
            currentStreak: newStreak,
            lastActive: new Date(),
          },
        });
      }
    }

    // Système de récompenses basé sur les paliers de streak
    if (newStreak === 7) {
      bonusStars = 2; // Première semaine
    } else if (newStreak === 30) {
      bonusStars = 5; // Premier mois
    } else if (newStreak === 100) {
      bonusStars = 10; // 100 jours
    } else if (newStreak % 50 === 0 && newStreak > 100) {
      bonusStars = 15; // Chaque 50 jours après 100
    } else if (newStreak % 10 === 0 && newStreak >= 10) {
      bonusStars = 1; // Chaque 10 jours
    }

    // Ajouter les étoiles bonus si applicable
    if (bonusStars > 0) {
      await updateStudentBalance(studentId, bonusStars);
    }

    return {
      currentStreak: newStreak,
      bonusStars,
      isNewMilestone: bonusStars > 1,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du streak:", error);
    throw error;
  }
}

/**
 * Mettre à jour le solde d'étoiles d'un étudiant
 */
async function updateStudentBalance(studentId: string, stars: number) {
  try {
    await prisma.studentBalance.upsert({
      where: { studentId },
      update: {
        balance: {
          increment: stars,
        },
      },
      create: {
        studentId,
        balance: stars,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du solde:", error);
    throw error;
  }
}

/**
 * Obtenir les informations détaillées du streak d'un étudiant
 */
export async function getStudentStreakInfo(studentId: string) {
  try {
    const streak = await prisma.studentStreak.findUnique({
      where: { studentId },
    });

    if (!streak) {
      return {
        currentStreak: 0,
        lastActive: null,
        nextMilestone: 7,
        daysUntilNextMilestone: 7,
        totalRewardsEarned: 0,
      };
    }

    // Calculer le prochain palier
    let nextMilestone = 7;
    if (streak.currentStreak >= 100) {
      nextMilestone = Math.ceil(streak.currentStreak / 50) * 50;
    } else if (streak.currentStreak >= 30) {
      nextMilestone = 100;
    } else if (streak.currentStreak >= 7) {
      nextMilestone = 30;
    }

    // Calculer les récompenses totales gagnées
    let totalRewardsEarned = 0;
    const current = streak.currentStreak;

    if (current >= 7) totalRewardsEarned += 2;
    if (current >= 30) totalRewardsEarned += 5;
    if (current >= 100) totalRewardsEarned += 10;

    // Récompenses pour chaque tranche de 50 après 100
    if (current > 100) {
      const fiftyDayBonuses = Math.floor((current - 100) / 50);
      totalRewardsEarned += fiftyDayBonuses * 15;
    }

    // Récompenses pour chaque tranche de 10
    if (current >= 10) {
      const tenDayBonuses = Math.floor(current / 10);
      totalRewardsEarned += tenDayBonuses * 1;
    }

    return {
      currentStreak: streak.currentStreak,
      lastActive: streak.lastActive,
      nextMilestone,
      daysUntilNextMilestone: nextMilestone - streak.currentStreak,
      totalRewardsEarned,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des infos de streak:", error);
    throw error;
  }
}

/**
 * Vérifier si un étudiant doit être notifié pour maintenir son streak
 */
export async function checkStreakReminder(studentId: string) {
  try {
    const streak = await prisma.studentStreak.findUnique({
      where: { studentId },
    });

    if (!streak) return false;

    const lastActiveDate = new Date(streak.lastActive);
    const today = new Date();
    const hoursDiff =
      Math.abs(today.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60);

    // Envoyer un rappel si l'utilisateur n'a pas été actif depuis 20 heures
    // et que son streak est > 0
    return hoursDiff >= 20 && streak.currentStreak > 0;
  } catch (error) {
    console.error("Erreur lors de la vérification du rappel:", error);
    return false;
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
