import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import {
  invalidateUserSessions,
  cleanupExpiredSessions,
  getUserActiveSessions,
} from "@/lib/session-utils";

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const action = searchParams.get("action");

    if (action === "cleanup") {
      // Nettoyer toutes les sessions expirées
      await cleanupExpiredSessions();
      return NextResponse.json({ message: "Sessions expirées nettoyées" });
    }

    if (userId) {
      // Invalider toutes les sessions d'un utilisateur spécifique
      await invalidateUserSessions(userId);
      return NextResponse.json({
        message: `Sessions de l'utilisateur ${userId} invalidées`,
      });
    }

    return NextResponse.json(
      { message: "Paramètre manquant" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erreur lors de la gestion des sessions:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      // Obtenir les sessions actives d'un utilisateur
      const sessions = await getUserActiveSessions(userId);
      return NextResponse.json({ sessions });
    }

    return NextResponse.json(
      { message: "Paramètre userId requis" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
