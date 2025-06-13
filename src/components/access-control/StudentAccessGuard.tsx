"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Mail, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";

interface StudentAccessInfo {
  canAccessStories: boolean;
  canAccessQuizzes: boolean;
  canAccessLeaderboard: boolean;
  canAccessAllContent: boolean;
  maxStoriesAccess: number;
  accountStatus: string;
  hasClassroomAccess: boolean;
}

interface StudentAccessGuardProps {
  children: React.ReactNode;
  requiredAccess: "stories" | "quizzes" | "leaderboard" | "allContent";
  storyIndex?: number;
  fallbackContent?: React.ReactNode;
}

export default function StudentAccessGuard({
  children,
  requiredAccess,
  storyIndex = 0,
  fallbackContent,
}: StudentAccessGuardProps) {
  const { data: session, status } = useSession();
  const [accessInfo, setAccessInfo] = useState<StudentAccessInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user && session.user.role === "STUDENT") {
      fetchAccessInfo();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchAccessInfo = async () => {
    try {
      const response = await fetch("/api/student/access-info");
      if (response.ok) {
        const data = await response.json();
        setAccessInfo(data);
      }
    } catch (error) {
      console.error("Error fetching access info:", error);
    } finally {
      setLoading(false);
    }
  };

  // Si pas étudiant, laisser passer (pour admin/teacher)
  if (session?.user?.role !== "STUDENT") {
    return <>{children}</>;
  }

  if (loading || status === "loading") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!accessInfo) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Erreur d'accès
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Impossible de vérifier vos permissions d'accès.</p>
          <Button onClick={fetchAccessInfo} className="mt-4">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Vérification des permissions selon le type d'accès requis
  let hasAccess = false;
  let accessMessage = "";

  switch (requiredAccess) {
    case "stories":
      hasAccess =
        accessInfo.canAccessStories &&
        (accessInfo.maxStoriesAccess === -1 ||
          storyIndex < accessInfo.maxStoriesAccess);
      if (
        !hasAccess &&
        accessInfo.accountStatus === "LIMITED_ACCESS" &&
        storyIndex > 0
      ) {
        accessMessage =
          "Vous n'avez accès qu'au premier conte. Contactez-nous pour activer votre compte complet.";
      } else if (
        !hasAccess &&
        accessInfo.accountStatus === "PENDING_ACTIVATION"
      ) {
        accessMessage = "Votre compte est en attente d'activation.";
      }
      break;

    case "quizzes":
      hasAccess = accessInfo.canAccessQuizzes;
      accessMessage =
        accessInfo.accountStatus === "LIMITED_ACCESS"
          ? "Les quiz ne sont pas disponibles avec un accès limité."
          : "Votre compte doit être activé pour accéder aux quiz.";
      break;

    case "leaderboard":
      hasAccess = accessInfo.canAccessLeaderboard;
      accessMessage = !accessInfo.hasClassroomAccess
        ? "Le classement n'est disponible que pour les étudiants inscrits avec un code de classe."
        : "Votre compte doit être activé pour accéder au classement.";
      break;

    case "allContent":
      hasAccess = accessInfo.canAccessAllContent;
      accessMessage = "Accès complet requis pour cette fonctionnalité.";
      break;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // Affichage du contenu de fallback si fourni
  if (fallbackContent) {
    return <>{fallbackContent}</>;
  }

  // Affichage par défaut du message d'accès refusé
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-orange-500" />
          Accès restreint
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(accessInfo.accountStatus)}>
            {getStatusLabel(accessInfo.accountStatus)}
          </Badge>
          {!accessInfo.hasClassroomAccess && (
            <Badge variant="outline">Sans classe</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{accessMessage}</p>

        {accessInfo.accountStatus === "LIMITED_ACCESS" && (
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Accès actuel :</strong>
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Premier conte uniquement
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Quiz bloqués
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Classement non disponible
              </li>
            </ul>
          </div>
        )}

        {(accessInfo.accountStatus === "LIMITED_ACCESS" ||
          accessInfo.accountStatus === "PENDING_ACTIVATION") && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">
              Pour obtenir un accès complet :
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mt-0.5" />
              <div>
                <p>Contactez-nous avec votre adresse email :</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded mt-1">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {accessInfo.accountStatus === "LIMITED_ACCESS" && (
          <div className="pt-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/stories?index=0">Accéder au premier conte</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "LIMITED_ACCESS":
      return "secondary";
    case "PENDING_ACTIVATION":
      return "outline";
    default:
      return "outline";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "ACTIVE":
      return "Compte actif";
    case "LIMITED_ACCESS":
      return "Accès limité";
    case "PENDING_ACTIVATION":
      return "En attente";
    default:
      return status;
  }
}
