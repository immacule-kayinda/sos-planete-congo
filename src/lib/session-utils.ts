import prisma from "./prisma";

/**
 * Invalide toutes les sessions d'un utilisateur spécifique
 */
export async function invalidateUserSessions(userId: string) {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

/**
 * Invalide toutes les sessions expirées
 */
export async function cleanupExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
}

/**
 * Invalide une session spécifique par son token
 */
export async function invalidateSession(sessionToken: string) {
  await prisma.session.delete({
    where: { sessionToken },
  });
}

/**
 * Compte le nombre de sessions actives pour un utilisateur
 */
export async function getUserActiveSessionsCount(
  userId: string
): Promise<number> {
  return prisma.session.count({
    where: {
      userId,
      expires: {
        gt: new Date(),
      },
    },
  });
}

/**
 * Obtient toutes les sessions actives d'un utilisateur
 */
export async function getUserActiveSessions(userId: string) {
  return prisma.session.findMany({
    where: {
      userId,
      expires: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
