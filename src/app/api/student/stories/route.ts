import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "STUDENT") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Trouver l'étudiant
    const student = await prisma.student.findFirst({
      where: { userId: session.user.id },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Obtenir tous les contes avec leur statut de lecture
    const contes = await prisma.conte.findMany({
      include: {
        pages: true,
        section: true,
        StudentConteProgress: {
          where: {
            studentId: student.id,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Formater les données avec le statut de lecture
    const contesWithProgress = contes.map((conte) => ({
      id: conte.id,
      title: conte.title,
      audioUrl: conte.audioUrl,
      pagesCount: conte.pages.length,
      sectionId: conte.sectionId,
      sectionTitle: conte.section.title,
      createdAt: conte.createdAt,
      isCompleted:
        conte.StudentConteProgress.length > 0 &&
        conte.StudentConteProgress[0].isCompleted,
      completedAt:
        conte.StudentConteProgress.length > 0
          ? conte.StudentConteProgress[0].completedAt
          : null,
    }));

    return NextResponse.json(contesWithProgress);
  } catch (error) {
    console.error("[STUDENT_STORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
