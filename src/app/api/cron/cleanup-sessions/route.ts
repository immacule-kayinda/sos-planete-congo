import { NextResponse } from "next/server";
import { cleanupExpiredSessions } from "@/lib/session-utils";

export async function GET(request: Request) {
  // Vérifier si c'est un appel cron (optionnel: vous pouvez ajouter une clé secrète)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await cleanupExpiredSessions();
    return NextResponse.json({
      message: "Sessions expirées nettoyées avec succès",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur lors du nettoyage des sessions:", error);
    return NextResponse.json(
      { message: "Erreur lors du nettoyage" },
      { status: 500 }
    );
  }
}

// Permettre l'exécution sans authentification pour les crons
export const dynamic = "force-dynamic";
