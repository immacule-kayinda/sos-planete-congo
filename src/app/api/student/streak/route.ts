import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

// GET - Récupérer le streak d'un étudiant
export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        StudentStreak: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      streak: student.StudentStreak || { currentStreak: 0, lastActive: null },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du streak:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
