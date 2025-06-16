import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

// GET - Récupérer la progression d'un étudiant
export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        StudentChapterProgress: {
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
        },
        performance: {
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
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      progress: student.StudentChapterProgress,
      performance: student.performance,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// POST - Marquer un chapitre comme lu ou mettre à jour la progression
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { chapterId, isRead, isCurrent } = body;

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Mettre à jour ou créer la progression
    const progress = await prisma.studentChapterProgress.upsert({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId,
        },
      },
      update: {
        isRead: isRead !== undefined ? isRead : undefined,
        isCurrent: isCurrent !== undefined ? isCurrent : undefined,
        updatedAt: new Date(),
      },
      create: {
        studentId: student.id,
        chapterId,
        isRead: isRead || false,
        isCurrent: isCurrent || false,
      },
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
    });

    // Si on marque un chapitre comme actuel, désactiver les autres
    if (isCurrent) {
      await prisma.studentChapterProgress.updateMany({
        where: {
          studentId: student.id,
          id: { not: progress.id },
        },
        data: {
          isCurrent: false,
        },
      });
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
