import prisma from "./prisma";
import { auth } from "../../auth";

export type AccessLevel =
  | "FIRST_STORY_ONLY"
  | "FULL_ACCESS"
  | "CLASSROOM_ACCESS";

export interface StudentAccessInfo {
  canAccessStories: boolean;
  canAccessQuizzes: boolean;
  canAccessLeaderboard: boolean;
  canAccessAllContent: boolean;
  maxStoriesAccess: number; // -1 pour illimité
  accountStatus: string;
  hasClassroomAccess: boolean;
}

/**
 * Vérifie et retourne les permissions d'accès d'un étudiant
 */
export async function getStudentAccess(
  userId: string
): Promise<StudentAccessInfo | null> {
  try {
    const student = await prisma.student.findFirst({
      where: { userId },
      include: {
        user: true,
        Classroom: true,
      },
    });

    if (!student) {
      return null;
    }

    const accessInfo: StudentAccessInfo = {
      canAccessStories: false,
      canAccessQuizzes: false,
      canAccessLeaderboard: false,
      canAccessAllContent: false,
      maxStoriesAccess: 0,
      accountStatus: student.accountStatus,
      hasClassroomAccess: student.hasClassroomAccess,
    };

    switch (student.accountStatus) {
      case "ACTIVE":
        // Accès complet à tout le contenu
        accessInfo.canAccessStories = true;
        accessInfo.canAccessQuizzes = true;
        accessInfo.canAccessAllContent = true;
        accessInfo.maxStoriesAccess = -1; // Illimité
        // Accès au leaderboard seulement si inscrit avec une classe
        accessInfo.canAccessLeaderboard = student.hasClassroomAccess;
        break;

      case "LIMITED_ACCESS":
        // Accès limité au premier conte uniquement
        accessInfo.canAccessStories = true;
        accessInfo.canAccessQuizzes = false;
        accessInfo.canAccessAllContent = false;
        accessInfo.maxStoriesAccess = 1; // Premier conte seulement
        accessInfo.canAccessLeaderboard = false;
        break;

      case "PENDING_ACTIVATION":
        // Aucun accès en attendant l'activation
        accessInfo.canAccessStories = false;
        accessInfo.canAccessQuizzes = false;
        accessInfo.canAccessAllContent = false;
        accessInfo.maxStoriesAccess = 0;
        accessInfo.canAccessLeaderboard = false;
        break;

      default:
        // Par défaut, aucun accès
        break;
    }

    return accessInfo;
  } catch (error) {
    console.error("Erreur lors de la vérification d'accès:", error);
    return null;
  }
}

/**
 * Vérifie si un étudiant peut accéder à une histoire spécifique
 */
export async function canAccessStory(
  userId: string,
  storyIndex: number = 0
): Promise<boolean> {
  const accessInfo = await getStudentAccess(userId);

  if (!accessInfo || !accessInfo.canAccessStories) {
    return false;
  }

  // Si accès illimité (-1) ou si l'index de l'histoire est dans la limite
  return (
    accessInfo.maxStoriesAccess === -1 ||
    storyIndex < accessInfo.maxStoriesAccess
  );
}

/**
 * Vérifie si un étudiant peut accéder aux quizzes
 */
export async function canAccessQuizzes(userId: string): Promise<boolean> {
  const accessInfo = await getStudentAccess(userId);
  return accessInfo?.canAccessQuizzes || false;
}

/**
 * Vérifie si un étudiant peut accéder au leaderboard
 */
export async function canAccessLeaderboard(userId: string): Promise<boolean> {
  const accessInfo = await getStudentAccess(userId);
  return accessInfo?.canAccessLeaderboard || false;
}

/**
 * Middleware pour vérifier l'accès dans les routes API
 */
export async function requireStudentAccess(
  requiredAccess: keyof StudentAccessInfo
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Non authentifié");
  }

  if (session.user.role !== "STUDENT") {
    throw new Error("Accès réservé aux étudiants");
  }

  const accessInfo = await getStudentAccess(session.user.id);

  if (!accessInfo) {
    throw new Error("Impossible de vérifier les permissions");
  }

  if (!accessInfo[requiredAccess]) {
    throw new Error("Accès non autorisé");
  }

  return accessInfo;
}
