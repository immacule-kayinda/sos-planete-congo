import ConteCard from "@/components/ui/conte-card";
import ErrorDisplay from "@/components/ui/error-display";
import StudentAccessGuard from "@/components/access-control/StudentAccessGuard";
import { getStudentData } from "@/lib/db";
import { getStudentAccess } from "@/lib/access-control";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";

interface ConteWithProgress {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt: Date | null;
  accessible: boolean;
}

async function getStoriesWithProgress(
  studentId: string
): Promise<ConteWithProgress[]> {
  const student = await prisma.student.findUnique({
    where: { userId: studentId },
    include: {
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

  // Récupérer les informations d'accès de l'étudiant
  const accessInfo = await getStudentAccess(studentId);

  // Récupérer tous les contes
  const allContes = await prisma.conte.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  // Créer un map des progressions pour un accès rapide
  const progressMap = new Map(
    student.StudentConteProgress.map((progress) => [
      progress.conteId,
      {
        isCompleted: progress.isCompleted,
        completedAt: progress.completedAt,
      },
    ])
  );

  // Combiner les contes avec leurs progressions et restrictions d'accès
  return allContes.map((conte, index) => {
    const progress = progressMap.get(conte.id);

    // Déterminer si ce conte est accessible selon les restrictions
    let accessible = true;
    if (accessInfo && accessInfo.maxStoriesAccess !== -1) {
      // Accès limité : seuls les premiers contes selon maxStoriesAccess sont accessibles
      accessible = index < accessInfo.maxStoriesAccess;
    }

    return {
      id: conte.id,
      title: conte.title,
      isCompleted: progress?.isCompleted || false,
      completedAt: progress?.completedAt || null,
      accessible,
    };
  });
}

export default async function StoriesPage() {
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
    const stories = await getStoriesWithProgress(session.user.id);
    const accessibleStories = stories.filter((story) => story.accessible);
    const completedStories = accessibleStories.filter(
      (story) => story.isCompleted
    );
    const lockedStories = stories.filter((story) => !story.accessible);

    return (
      <StudentAccessGuard requiredAccess="stories">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Bibliothèque d'Histoires
            </h1>
            <p className="text-blue-100">
              Découvrez et lisez nos histoires éducatives
            </p>

            {/* Statistiques */}
            <div className="mt-4 flex gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">
                  {completedStories.length}
                </div>
                <div className="text-sm text-blue-100">Histoires lues</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">
                  {accessibleStories.length}
                </div>
                <div className="text-sm text-blue-100">
                  Histoires disponibles
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">
                  {accessibleStories.length > 0
                    ? Math.round(
                        (completedStories.length / accessibleStories.length) *
                          100
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-blue-100">Progression</div>
              </div>
            </div>
          </div>

          {/* Histoires accessibles */}
          <div className="grid gap-4">
            {accessibleStories.map((story) => (
              <ConteCard
                key={story.id}
                conteId={story.id}
                title={story.title}
                isCompleted={story.isCompleted}
                completedAt={story.completedAt}
              />
            ))}
          </div>

          {/* Histoires verrouillées (pour les utilisateurs avec accès limité) */}
          {lockedStories.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Histoires verrouillées
              </h2>
              <div className="grid gap-4">
                {lockedStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-gray-100 rounded-xl p-4 opacity-60 relative"
                  >
                    <div className="absolute top-2 right-2">
                      <div className="bg-yellow-500 text-white p-2 rounded-full">
                        <svg
                          className="w-4 h-4"
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
                    </div>
                    <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Cette histoire sera disponible avec un accès complet
                    </p>
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Contactez-nous pour débloquer
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {accessibleStories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune histoire disponible pour le moment.</p>
            </div>
          )}
        </div>
      </StudentAccessGuard>
    );
  } catch (error) {
    console.error("Error loading stories:", error);
    return (
      <ErrorDisplay
        title="Erreur de chargement"
        message="Impossible de charger les histoires. Vérifiez votre connexion et réessayez."
      />
    );
  }
}
