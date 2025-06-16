import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";
import prisma from "@/lib/prisma";

export async function GET({ params }: { params: { moduleId: string } }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        StudentChapterProgress: {
          where: {
            chapter: {
              moduleId: params.moduleId,
            },
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
          orderBy: {
            chapter: {
              order: "asc",
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

    // Récupérer le module actuel et sa section
    const currentModule = await prisma.module.findUnique({
      where: { id: params.moduleId },
      include: {
        section: true,
        chapters: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!currentModule) {
      return NextResponse.json(
        { message: "Module non trouvé" },
        { status: 404 }
      );
    }

    // Si aucun chapitre n'a été commencé dans ce module
    if (student.StudentChapterProgress.length === 0) {
      // Vérifier si le module précédent est terminé
      const previousModule = await prisma.module.findFirst({
        where: {
          sectionId: currentModule.sectionId,
          order: { lt: currentModule.order },
        },
        orderBy: { order: "desc" },
        include: {
          chapters: true,
        },
      });

      if (previousModule) {
        // Vérifier si tous les chapitres du module précédent sont terminés
        const previousModuleProgress =
          await prisma.studentChapterProgress.findMany({
            where: {
              studentId: student.id,
              chapter: {
                moduleId: previousModule.id,
              },
            },
          });

        const allChaptersCompleted = previousModule.chapters.every((chapter) =>
          previousModuleProgress.some(
            (progress) => progress.chapterId === chapter.id && progress.isRead
          )
        );

        if (!allChaptersCompleted) {
          return NextResponse.json(
            { message: "Module précédent non terminé" },
            { status: 403 }
          );
        }
      }

      // Marquer le premier chapitre comme actuel
      const firstChapter = currentModule.chapters[0];
      if (firstChapter) {
        const progress = await prisma.studentChapterProgress.create({
          data: {
            studentId: student.id,
            chapterId: firstChapter.id,
            isCurrent: true,
            isRead: false,
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
        return NextResponse.json([progress]);
      }
    }

    // Vérifier si le module est terminé
    const allChaptersCompleted = currentModule.chapters.every((chapter) =>
      student.StudentChapterProgress.some(
        (progress) => progress.chapterId === chapter.id && progress.isRead
      )
    );

    if (allChaptersCompleted) {
      // Trouver le prochain module
      const nextModule = await prisma.module.findFirst({
        where: {
          sectionId: currentModule.sectionId,
          order: { gt: currentModule.order },
        },
        orderBy: { order: "asc" },
        include: {
          chapters: {
            orderBy: { order: "asc" },
          },
        },
      });

      if (nextModule) {
        // Marquer le premier chapitre du prochain module comme actuel
        const firstChapter = nextModule.chapters[0];
        if (firstChapter) {
          const progress = await prisma.studentChapterProgress.create({
            data: {
              studentId: student.id,
              chapterId: firstChapter.id,
              isCurrent: true,
              isRead: false,
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
          return NextResponse.json([progress]);
        }
      } else {
        // C'est le dernier module de la section
        // Vérifier si le quiz de la section est terminé
        const sectionQuiz = await prisma.quizz.findFirst({
          where: { sectionId: currentModule.sectionId },
        });

        if (sectionQuiz) {
          // For now, consider section complete if all modules are done
          // (Quiz attempt tracking can be added later when needed)
          const sectionComplete = true;

          if (sectionComplete) {
            // Trouver la prochaine section
            const nextSection = await prisma.section.findFirst({
              where: {
                order: { gt: currentModule.section.order },
              },
              orderBy: { order: "asc" },
              include: {
                modules: {
                  include: {
                    chapters: {
                      orderBy: { order: "asc" },
                    },
                  },
                  orderBy: { order: "asc" },
                },
              },
            });

            if (nextSection && nextSection.modules.length > 0) {
              const firstModule = nextSection.modules[0];
              const firstChapter = firstModule.chapters[0];

              if (firstChapter) {
                const progress = await prisma.studentChapterProgress.create({
                  data: {
                    studentId: student.id,
                    chapterId: firstChapter.id,
                    isCurrent: true,
                    isRead: false,
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
                return NextResponse.json([progress]);
              }
            }
          }
        }
      }
    }

    return NextResponse.json(student.StudentChapterProgress);
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
