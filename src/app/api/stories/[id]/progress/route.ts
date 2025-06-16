import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

// Marquer un conte comme lu
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Vérifier si le conte existe
    const conte = await prisma.conte.findUnique({
      where: { id: params.id },
    });

    if (!conte) {
      return new NextResponse("Story not found", { status: 404 });
    }

    // Créer ou mettre à jour le progrès
    const progress = await prisma.studentConteProgress.upsert({
      where: {
        studentId_conteId: {
          studentId: student.id,
          conteId: params.id,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        studentId: student.id,
        conteId: params.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("[STORY_PROGRESS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Obtenir le statut de lecture d'un conte
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Obtenir le progrès
    const progress = await prisma.studentConteProgress.findUnique({
      where: {
        studentId_conteId: {
          studentId: student.id,
          conteId: params.id,
        },
      },
    });

    return NextResponse.json({
      isCompleted: progress?.isCompleted || false,
      completedAt: progress?.completedAt || null,
    });
  } catch (error) {
    console.error("[STORY_PROGRESS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
