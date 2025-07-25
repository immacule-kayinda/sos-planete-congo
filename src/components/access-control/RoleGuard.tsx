"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("STUDENT" | "TEACHER" | "ADMIN")[];
  fallbackPath?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallbackPath,
}: RoleGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Encore en cours de chargement

    if (!session) {
      router.push("/signin");
      return;
    }

    const userRole = session.user?.role;

    if (!userRole || !allowedRoles.includes(userRole as any)) {
      // Rediriger vers la page appropriée selon le rôle
      const redirectPath = fallbackPath || getHomePageForRole(userRole);
      router.push(redirectPath);
      return;
    }
  }, [session, status, router, allowedRoles, fallbackPath]);

  // Pendant le chargement de la session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            Vérification des autorisations...
          </p>
        </div>
      </div>
    );
  }

  // Si pas de session
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">
            Redirection vers la connexion...
          </p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'a pas le bon rôle
  const userRole = session.user?.role;
  if (!userRole || !allowedRoles.includes(userRole as any)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  // Si tout va bien, afficher le contenu
  return <>{children}</>;
}

// Fonction utilitaire pour obtenir la page d'accueil selon le rôle
function getHomePageForRole(role?: string): string {
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
}
