import prisma from "./prisma";

/**
 * Blacklist pour les tokens JWT invalidés
 * En production, utilisez Redis ou une base de données séparée
 */
const tokenBlacklist = new Set<string>();

/**
 * Ajouter un token à la blacklist
 */
export function blacklistToken(tokenId: string) {
  tokenBlacklist.add(tokenId);
}

/**
 * Vérifier si un token est blacklisté
 */
export function isTokenBlacklisted(tokenId: string): boolean {
  return tokenBlacklist.has(tokenId);
}

/**
 * Invalider tous les tokens d'un utilisateur
 * (en pratique, on désactive l'utilisateur temporairement)
 */
export async function invalidateUserTokens(userId: string) {
  // Désactiver temporairement l'utilisateur
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });

  // Réactiver après un court délai (optionnel)
  setTimeout(async () => {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
  }, 1000); // 1 seconde
}

/**
 * Forcer la déconnexion d'un utilisateur
 */
export async function forceLogoutUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isActive: false,
      lastLogin: new Date(), // Marquer comme déconnecté
    },
  });
}

/**
 * Réactiver un utilisateur
 */
export async function reactivateUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: true },
  });
}

/**
 * Vérifier si un utilisateur est actif
 */
export async function isUserActive(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isActive: true },
  });

  return user?.isActive ?? false;
}

/**
 * Obtenir les informations de session d'un utilisateur
 */
export async function getUserSessionInfo(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      lastLogin: true,
    },
  });
}
