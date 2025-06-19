import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer l'étudiant
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Profil étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer les données de progression
    const [progress, performance] = await Promise.all([
      prisma.studentChapterProgress.findMany({
        where: { studentId: student.id },
        include: {
          chapter: {
            include: {
              module: {
                include: {
                  section: true,
                },
              },
            },
          },
        },
        orderBy: {
          chapter: {
            order: "asc",
          },
        },
      }),
      prisma.studentPerformance.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      progress,
      performance,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { chapterId, isCurrent } = await request.json();

    // Récupérer l'étudiant
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Profil étudiant non trouvé" },
        { status: 404 }
      );
    }

    if (isCurrent) {
      // Désactiver isCurrent pour tous les autres chapitres
      await prisma.studentChapterProgress.updateMany({
        where: {
          studentId: student.id,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });

      // Mettre à jour ou créer la progression pour ce chapitre
      await prisma.studentChapterProgress.upsert({
        where: {
          studentId_chapterId: {
            studentId: student.id,
            chapterId: chapterId,
          },
        },
        update: {
          isCurrent: true,
        },
        create: {
          studentId: student.id,
          chapterId: chapterId,
          isCurrent: true,
          isRead: false,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
