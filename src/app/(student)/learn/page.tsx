import ConteCard from "@/components/ui/conte-card";
import ErrorDisplay from "@/components/ui/error-display";
import LessonsList from "@/components/ui/learn/lessonsList";
import { getStudentData } from "@/lib/db";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "../../../../auth";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  chapters: Array<{
    id: string;
    title: string;
    subtitle: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    moduleId: string;
    order: number;
  }>;
}

interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  quizId: string;
  conte?: {
    id: string;
    title: string;
  } | null;
  quizz?: {
    id: string;
  } | null;
  modules: Module[];
}

async function getCurrentSection(studentId: string) {
  const student = await prisma.student.findUnique({
    where: { userId: studentId },
    include: {
      StudentChapterProgress: {
        include: {
          chapter: {
            include: {
              module: {
                include: {
                  section: {
                    include: {
                      conte: true,
                      quizz: true,
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
          },
        },
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Trouver le chapitre actuel (isCurrent = true)
  const currentChapterProgress = student.StudentChapterProgress.find(
    (progress) => progress.isCurrent
  );

  if (currentChapterProgress) {
    // Retourner la section du chapitre actuel
    return {
      sectionId: currentChapterProgress.chapter.module.section.id,
      section: currentChapterProgress.chapter.module.section as Section,
      currentModule: currentChapterProgress.chapter.module,
      currentChapter: currentChapterProgress.chapter,
      progressData: student.StudentChapterProgress,
    };
  }

  // Si aucun chapitre n'est marqué comme actuel, trouver la première section
  const firstSection = await prisma.section.findFirst({
    orderBy: { order: "asc" },
    include: {
      conte: true,
      quizz: true,
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

  if (!firstSection || !firstSection.modules.length) {
    throw new Error("No section available");
  }

  // Marquer le premier chapitre de la première section comme actuel
  const firstModule = firstSection.modules[0];
  const firstChapter = firstModule.chapters[0];

  if (firstChapter) {
    // Vérifier si une progression existe déjà pour ce chapitre
    const existingProgress = await prisma.studentChapterProgress.findUnique({
      where: {
        studentId_chapterId: {
          studentId: student.id,
          chapterId: firstChapter.id,
        },
      },
    });

    if (existingProgress) {
      // Mettre à jour la progression existante
      await prisma.studentChapterProgress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          isCurrent: true,
        },
      });
    } else {
      // Créer une nouvelle progression
      await prisma.studentChapterProgress.create({
        data: {
          studentId: student.id,
          chapterId: firstChapter.id,
          isCurrent: true,
          isRead: false,
        },
      });
    }

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
    const updatedStudent = await prisma.student.findUnique({
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
        },
      },
    });

    return {
      sectionId: firstSection.id,
      section: firstSection as Section,
      currentModule: firstModule,
      currentChapter: firstChapter,
      progressData: updatedStudent?.StudentChapterProgress || [],
    };
  }

  return {
    sectionId: firstSection.id,
    section: firstSection as Section,
    currentModule: firstModule,
    currentChapter: firstChapter,
    progressData: student.StudentChapterProgress,
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
    // Récupérer la section actuelle de l'étudiant
    const currentSectionData = await getCurrentSection(session.user.id);
    const section = currentSectionData.section;

    console.log("Current section:", section);
    console.log("Current module:", currentSectionData.currentModule);
    console.log("Current chapter:", currentSectionData.currentChapter);

    if (!section) {
      return (
        <ErrorDisplay
          title="Aucune section disponible"
          message="Aucun contenu d'apprentissage n'est actuellement disponible. Les cours seront bientôt ajoutés."
          showRetryButton={false}
        />
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {/* Header Chapitre */}
        <div className="bg-[#5B4FFF] rounded-xl p-6 flex justify-between items-center text-white sticky -top-3 z-10">
          <div>
            <h2 className="font-bold text-lg">{section.title.toUpperCase()}</h2>
            <p>{section.description}</p>
            {currentSectionData.currentChapter && (
              <p className="text-sm mt-1 opacity-90">
                Chapitre actuel: {currentSectionData.currentChapter.title}
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
            isCompleted={
              currentSectionData.progressData.some(
                (progress) =>
                  progress.chapter.module.section.id === section.id &&
                  progress.isRead
              ) &&
              currentSectionData.progressData
                .filter(
                  (progress) =>
                    progress.chapter.module.section.id === section.id
                )
                .every((progress) => progress.isRead)
            }
          />
        )}

        {/* Chapitres du module */}
        {section.modules.map((module: Module) => (
          <LessonsList
            moduleId={module.id}
            title={module.title.toUpperCase()}
            subtitle={module.subtitle}
            chapters={module.chapters}
            currentChapterId={currentSectionData.currentChapter?.id || ""}
            key={module.id}
            progressData={currentSectionData.progressData}
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
