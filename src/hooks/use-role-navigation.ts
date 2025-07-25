"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useRoleNavigation() {
  const { data: session } = useSession();
  const router = useRouter();

  // Obtenir la page d'accueil selon le rôle
  const getHomePageForRole = useCallback((role?: string) => {
    switch (role) {
      case "STUDENT":
        return "/learn";
      case "TEACHER":
        return "/teacher/dashboard";
      case "ADMIN":
        return "/dashboard";
      default:
        return "/signin";
    }
  }, []);

  // Obtenir la page d'accueil de l'utilisateur actuel
  const getUserHomePage = useCallback(() => {
    return getHomePageForRole(session?.user?.role);
  }, [session?.user?.role, getHomePageForRole]);

  // Naviguer vers la page d'accueil de l'utilisateur
  const navigateToUserHome = useCallback(() => {
    const homePage = getUserHomePage();
    router.push(homePage);
  }, [getUserHomePage, router]);

  // Vérifier si l'utilisateur peut accéder à une route
  const canAccessRoute = useCallback(
    (path: string, userRole?: string) => {
      const role = userRole || session?.user?.role;

      if (!role) return false;

      // Définir les routes autorisées par rôle
      const roleRoutes = {
        STUDENT: [
          "/learn",
          "/exercices",
          "/games",
          "/shop",
          "/stories",
          "/leaderboard",
          "/profile",
          "/guidebook",
        ],
        TEACHER: ["/teacher"],
        ADMIN: ["/dashboard"],
      };

      const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes] || [];
      return allowedRoutes.some((route) => path.startsWith(route));
    },
    [session?.user?.role]
  );

  // Rediriger si l'utilisateur n'a pas accès à la route actuelle
  const redirectIfUnauthorized = useCallback(
    (currentPath: string) => {
      if (!canAccessRoute(currentPath)) {
        navigateToUserHome();
      }
    },
    [canAccessRoute, navigateToUserHome]
  );

  // Obtenir le label d'affichage pour le rôle
  const getRoleDisplayName = useCallback((role?: string) => {
    switch (role) {
      case "STUDENT":
        return "Étudiant";
      case "TEACHER":
        return "Professeur";
      case "ADMIN":
        return "Administrateur";
      default:
        return "Utilisateur";
    }
  }, []);

  return {
    session,
    userRole: session?.user?.role,
    getUserHomePage,
    getHomePageForRole,
    navigateToUserHome,
    canAccessRoute,
    redirectIfUnauthorized,
    getRoleDisplayName,
    isAuthenticated: !!session?.user,
  };
}
