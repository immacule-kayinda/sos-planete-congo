import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { updateStudentStreak } from "@/lib/student-progress";
import { getStudentData } from "@/lib/db";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // Get the student record first
    const student = await getStudentData(session.user.id);

    if (!student) {
      return NextResponse.json(
        { error: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    const streakData = await updateStudentStreak(student.id);

    return NextResponse.json(streakData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du streak:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
