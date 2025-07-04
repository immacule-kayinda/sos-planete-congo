import ConteCard from "@/components/ui/conte-card";
import ErrorDisplay from "@/components/ui/error-display";
import LessonsList from "@/components/ui/learn/lessonsList";
import StudentAccessGuard from "@/components/access-control/StudentAccessGuard";
import { getStudentData } from "@/lib/db";
import { getStudentAccess } from "@/lib/access-control";
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
  hasLimitedAccess: boolean;
}

async function getCurrentSection(
  studentId: string
): Promise<CurrentSectionResult> {
  // Récupérer les informations d'accès de l'étudiant
  const accessInfo = await getStudentAccess(studentId);
  const hasLimitedAccess = accessInfo?.accountStatus === "LIMITED_ACCESS";

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
      hasLimitedAccess,
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
    hasLimitedAccess,
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
    const {
      section,
      currentChapterId,
      progressData,
      conteProgress,
      hasLimitedAccess,
    } = await getCurrentSection(session.user.id);
    console.log(conteProgress, "IS completed");

    return (
      <StudentAccessGuard requiredAccess="allContent">
        <div className="flex flex-col gap-6">
          {/* Header Chapitre */}
          <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white sticky -top-3 z-10">
            <div>
              <h2 className="font-bold text-lg">
                {section.title.toUpperCase()}
              </h2>
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
              {hasLimitedAccess && (
                <div className="mt-3 bg-orange-500/20 border border-orange-300 rounded-lg p-2">
                  <p className="text-sm text-orange-100">
                    ⚠️ Accès limité - Seul le premier conte est disponible
                  </p>
                </div>
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

          {/* Chapitres du module - Restreints pour accès limité */}
          {!hasLimitedAccess ? (
            section.modules.map((module) => (
              <LessonsList
                key={module.id}
                moduleId={module.id}
                title={module.title.toUpperCase()}
                subtitle={module.subtitle}
                chapters={module.chapters}
                currentChapterId={currentChapterId || ""}
                progressData={progressData}
              />
            ))
          ) : (
            <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Modules et Chapitres
                </h3>
                <p className="text-gray-600 mb-4">
                  L'accès aux modules d'apprentissage nécessite un compte
                  complet. Vous pouvez actuellement lire le premier conte.
                </p>
                <Link
                  href="/help"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Contactez-nous pour débloquer
                </Link>
              </div>
            </div>
          )}

          {/* Quizz - Bloqué pour accès limité */}
          {section.quizz && (
            <div
              className={`rounded-xl p-4 flex justify-between items-center text-white mt-4 ${hasLimitedAccess ? "bg-gray-400" : "bg-red-500"}`}
            >
              <div>
                <h4 className="font-bold text-lg flex items-center gap-2">
                  QUIZZ
                  {hasLimitedAccess && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </h4>
                <p className="text-xs">
                  {hasLimitedAccess
                    ? "Quiz disponible avec un accès complet seulement"
                    : "Prêt à tester ce que tu as appris et passer à l'étape suivante ?"}
                </p>
              </div>
              {hasLimitedAccess ? (
                <span className="bg-white/20 text-white/70 font-bold px-6 py-2 rounded-full cursor-not-allowed">
                  VERROUILLÉ
                </span>
              ) : (
                <Link
                  href={`/quizz/${section.quizz.id}`}
                  className="bg-white text-red-500 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ALLER
                </Link>
              )}
            </div>
          )}
        </div>
      </StudentAccessGuard>
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
