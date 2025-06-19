import ConteCard from "@/components/ui/conte-card";
import ErrorDisplay from "@/components/ui/error-display";
import LessonsList from "@/components/ui/learn/lessonsList";
import { getStudentData } from "@/lib/db";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "../../../../auth";

// Types optimisés basés sur le schéma Prisma
interface ChapterProgress {
  id: string;
  isRead: boolean;
  isCurrent: boolean;
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    order: number;
    module: {
      id: string;
      title: string;
      subtitle: string;
      section: {
        id: string;
      };
    };
  };
}

interface ConteProgress {
  id: string;
  isCompleted: boolean;
  completedAt: Date | null;
  conte: {
    id: string;
    title: string;
  };
}

interface SectionData {
  id: string;
  title: string;
  description: string;
  order: number;
  conte?: {
    id: string;
    title: string;
  } | null;
  quizz: {
    id: string;
  };
  modules: Array<{
    id: string;
    title: string;
    subtitle: string;
    order: number;
    chapters: Array<{
      id: string;
      title: string;
      subtitle: string;
      order: number;
      content: string;
      moduleId: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }>;
}

interface CurrentSectionResult {
  section: SectionData;
  currentChapterId: string | null;
  progressData: ChapterProgress[];
  conteProgress: ConteProgress | null;
}

async function getCurrentSection(
  studentId: string
): Promise<CurrentSectionResult> {
  // Requête optimisée : récupérer tout en une seule fois
  const student = await prisma.student.findUnique({
    where: { userId: studentId },
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
      StudentConteProgress: {
        include: {
          conte: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Trouver le chapitre actuel
  const currentProgress = student.StudentChapterProgress.find(
    (p) => p.isCurrent
  );

  if (currentProgress) {
    // Récupérer la section complète avec tous les modules et chapitres
    const section = await prisma.section.findUnique({
      where: { id: currentProgress.chapter.module.section.id },
      include: {
        conte: {
          select: {
            id: true,
            title: true,
          },
        },
        quizz: {
          select: {
            id: true,
          },
        },
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

    if (!section) {
      throw new Error("Section not found");
    }

    // Trouver la progression du conte pour cette section
    const conteProgress =
      student.StudentConteProgress.find(
        (p) => p.conte.id === section.conte?.id
      ) || null;

    return {
      section: section as SectionData,
      currentChapterId: currentProgress.chapter.id,
      progressData: student.StudentChapterProgress,
      conteProgress,
    };
  }

  // Si aucun chapitre actuel, prendre la première section
  const firstSection = await prisma.section.findFirst({
    orderBy: { order: "asc" },
    include: {
      conte: {
        select: {
          id: true,
          title: true,
        },
      },
      quizz: {
        select: {
          id: true,
        },
      },
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

  if (
    !firstSection ||
    !firstSection.modules.length ||
    !firstSection.modules[0].chapters.length
  ) {
    throw new Error("No content available");
  }

  const firstChapter = firstSection.modules[0].chapters[0];

  // Créer ou mettre à jour la progression pour le premier chapitre
  await prisma.studentChapterProgress.upsert({
    where: {
      studentId_chapterId: {
        studentId: student.id,
        chapterId: firstChapter.id,
      },
    },
    update: {
      isCurrent: true,
    },
    create: {
      studentId: student.id,
      chapterId: firstChapter.id,
      isCurrent: true,
      isRead: false,
    },
  });

  // Désactiver isCurrent pour tous les autres chapitres
  await prisma.studentChapterProgress.updateMany({
    where: {
      studentId: student.id,
      chapterId: {
        not: firstChapter.id,
      },
    },
    data: {
      isCurrent: false,
    },
  });

  // Récupérer les données de progression mises à jour
  const updatedProgress = await prisma.studentChapterProgress.findMany({
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
  });

  // Trouver la progression du conte pour cette section
  const conteProgress =
    student.StudentConteProgress.find(
      (p) => p.conte.id === firstSection.conte?.id
    ) || null;

  return {
    section: firstSection as SectionData,
    currentChapterId: firstChapter.id,
    progressData: updatedProgress,
    conteProgress,
  };
}

export default async function LearnPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <ErrorDisplay
        title="Authentification requise"
        message="Vous devez être connecté pour accéder à cette page."
        showRetryButton={false}
      />
    );
  }

  const student = await getStudentData(session.user.id);

  if (!student) {
    return (
      <ErrorDisplay
        title="Étudiant non trouvé"
        message="Aucun profil étudiant n'a été trouvé pour votre compte. Contactez l'administrateur."
        showRetryButton={false}
      />
    );
  }
  try {
    const { section, currentChapterId, progressData, conteProgress } =
      await getCurrentSection(session.user.id);
    console.log(conteProgress, "IS completed");

    return (
      <div className="flex flex-col gap-6">
        {/* Header Chapitre */}
        <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white sticky -top-3 z-10">
          <div>
            <h2 className="font-bold text-lg">{section.title.toUpperCase()}</h2>
            <p>{section.description}</p>
            {currentChapterId && (
              <p className="text-sm mt-1 opacity-90">
                Chapitre actuel:{" "}
                {
                  section.modules
                    .flatMap((m) => m.chapters)
                    .find((c) => c.id === currentChapterId)?.title
                }
              </p>
            )}
          </div>
          <Link
            href={"/guidebook"}
            className="px-5 py-2 border font-bold rounded-2xl border-[#130f52]/40 border-b-4"
          >
            GUIDE
          </Link>
        </div>

        {/* Conte de la section */}
        {section.conte && (
          <ConteCard
            conteId={section.conte.id}
            title={section.conte.title}
            isCompleted={conteProgress?.isCompleted || false}
            completedAt={conteProgress?.completedAt || null}
          />
        )}

        {/* Chapitres du module */}
        {section.modules.map((module) => (
          <LessonsList
            key={module.id}
            moduleId={module.id}
            title={module.title.toUpperCase()}
            subtitle={module.subtitle}
            chapters={module.chapters}
            currentChapterId={currentChapterId || ""}
            progressData={progressData}
          />
        ))}

        {/* Quizz */}
        {section.quizz && (
          <div className="bg-red-500 rounded-xl p-4 flex justify-between items-center text-white mt-4">
            <div>
              <h4 className="font-bold text-lg">QUIZZ</h4>
              <p className="text-xs">
                Près à tester ce que tu as appris et passer à l&apos;étape
                suivante ?
              </p>
            </div>
            <Link
              href={`/quizz/${section.quizz.id}`}
              className="bg-white text-red-500 font-bold px-6 py-2 rounded-full"
            >
              ALLER
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading current section:", error);
    return (
      <ErrorDisplay
        title="Erreur de chargement"
        message="Impossible de charger votre section actuelle. Vérifiez votre connexion et réessayez."
      />
    );
  }
}
