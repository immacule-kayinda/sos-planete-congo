import { getStudentAccess } from "@/lib/access-control";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Accès réservé aux étudiants" },
        { status: 403 }
      );
    }

    const accessInfo = await getStudentAccess(session.user.id);

    if (!accessInfo) {
      return NextResponse.json(
        { error: "Impossible de récupérer les informations d'accès" },
        { status: 500 }
      );
    }

    return NextResponse.json(accessInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations d'accès:",
      error
    );
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
