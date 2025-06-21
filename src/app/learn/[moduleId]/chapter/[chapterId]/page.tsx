import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Action server pour marquer le chapitre comme lu
async function markChapterAsRead(chapterId: string, userId: string) {
  "use server";

  try {
    const student = await prisma.student.findUnique({
      where: { userId: userId },
    });

    if (!student) throw new Error("Étudiant non trouvé");

    // Marquer le chapitre actuel comme lu
    await prisma.studentChapterProgress.upsert({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId: chapterId,
        },
      },
      update: {
        isRead: true,
        isCurrent: false,
      },
      create: {
        studentId: student.id,
        chapterId: chapterId,
        isRead: true,
        isCurrent: false,
      },
    });

    // Trouver le chapitre suivant dans le même module ou le module suivant
    const currentChapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        module: {
          include: {
            chapters: {
              orderBy: { order: "asc" },
            },
            section: {
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
            },
          },
        },
      },
    });

    if (currentChapter) {
      // Trouver le chapitre suivant
      let nextChapter = null;

      // D'abord, chercher dans le même module
      const currentModuleChapters = currentChapter.module.chapters;
      const currentChapterIndex = currentModuleChapters.findIndex(
        (ch: { id: string }) => ch.id === chapterId
      );

      if (
        currentChapterIndex !== -1 &&
        currentChapterIndex < currentModuleChapters.length - 1
      ) {
        // Il y a un chapitre suivant dans le même module
        nextChapter = currentModuleChapters[currentChapterIndex + 1];
      } else {
        // Chercher dans le module suivant
        const currentModuleIndex =
          currentChapter.module.section.modules.findIndex(
            (mod: { id: string }) => mod.id === currentChapter.moduleId
          );

        if (
          currentModuleIndex !== -1 &&
          currentModuleIndex < currentChapter.module.section.modules.length - 1
        ) {
          const nextModule =
            currentChapter.module.section.modules[currentModuleIndex + 1];
          if (nextModule.chapters.length > 0) {
            nextChapter = nextModule.chapters[0];
          }
        }
      }

      // Si on a trouvé un chapitre suivant, le marquer comme current
      if (nextChapter) {
        // D'abord, enlever isCurrent de tous les autres chapitres
        await prisma.studentChapterProgress.updateMany({
          where: {
            studentId: student.id,
            isCurrent: true,
          },
          data: {
            isCurrent: false,
          },
        });

        // Marquer le chapitre suivant comme current
        await prisma.studentChapterProgress.upsert({
          where: {
            studentId_chapterId: {
              studentId: student.id,
              chapterId: nextChapter.id,
            },
          },
          update: {
            isCurrent: true,
          },
          create: {
            studentId: student.id,
            chapterId: nextChapter.id,
            isRead: false,
            isCurrent: true,
          },
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du progrès:", error);
    throw new Error("Impossible de marquer le chapitre comme lu");
  }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ moduleId: string; chapterId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { moduleId, chapterId } = await params;

  // Récupérer l'étudiant
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
  });

  if (!student) {
    return <div>Profil étudiant non trouvé</div>;
  }

  // Récupérer le chapitre avec les informations de progression
  const [chapter, studentProgress] = await Promise.all([
    prisma.chapter.findUnique({
      where: {
        id: chapterId,
        moduleId: moduleId,
      },
      include: {
        module: {
          include: {
            section: true,
          },
        },
      },
    }),
    prisma.studentChapterProgress.findUnique({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId: chapterId,
        },
      },
    }),
  ]);

  if (!chapter) return notFound();

  const isCompleted = studentProgress?.isRead || false;

  // Action pour marquer comme lu
  const handleMarkAsRead = async () => {
    "use server";
    await markChapterAsRead(chapterId, session.user.id);
    redirect(`/learn/${moduleId}/chapter/${chapterId}?completed=true`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header section with gray background */}
      <div className="bg-[#d9d9d9] px-4 py-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button and title */}
          <Link
            href={"/learn"}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#666666] cursor-pointer hover:text-[#000000] transition-colors" />
            <span className="text-[#666666] text-lg md:text-xl font-medium">
              Retour
            </span>
          </Link>

          {/* Separator line */}
          <div className="w-full h-px bg-[#666666] mb-16 md:mb-20 lg:mb-24"></div>

          {/* Centered section title */}
          <div className="text-center">
            <h1 className="text-[#000000] text-xl md:text-2xl lg:text-3xl font-medium">
              {chapter.module.section?.title || "Section"}
            </h1>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="bg-white px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Status indicator */}
          {isCompleted && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Chapitre terminé
              </span>
            </div>
          )}

          {/* Main title */}
          <h2 className="text-[#000000] text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 uppercase">
            {chapter.title}
          </h2>

          {/* Subtitle */}
          {chapter.subtitle && (
            <p className="text-[#666666] text-base md:text-lg lg:text-xl mb-8 md:mb-10 lg:mb-12 italic">
              {chapter.subtitle}
            </p>
          )}

          {/* Content wrapper for better reading experience */}
          <div className="prose prose-lg max-w-none md:prose-xl lg:prose-2xl">
            {/* Chapter content */}
            <div className="text-[#000000] text-base md:text-lg lg:text-xl leading-relaxed mb-12 md:mb-16 lg:mb-20">
              {chapter.content.split("\n").map(
                (paragraph: string, index: number) =>
                  paragraph.trim() && (
                    <p key={index} className="mb-6 md:mb-8 lg:mb-10">
                      {paragraph}
                    </p>
                  )
              )}
            </div>
          </div>

          {/* Action button - responsive width */}
          <div className="flex justify-center md:justify-start">
            {!isCompleted ? (
              <form action={handleMarkAsRead}>
                <Button
                  type="submit"
                  className="w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] bg-[#d31929] hover:bg-[#a52d2d] text-white font-medium py-4 md:py-5 lg:py-6 px-8 md:px-12 lg:px-16 rounded-lg text-base md:text-lg lg:text-xl transition-all duration-200 hover:shadow-lg"
                >
                  Marquer comme lu
                </Button>
              </form>
            ) : (
              <Button
                disabled
                className="w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] bg-green-600 text-white font-medium py-4 md:py-5 lg:py-6 px-8 md:px-12 lg:px-16 rounded-lg text-base md:text-lg lg:text-xl opacity-75 cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Chapitre terminé
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
