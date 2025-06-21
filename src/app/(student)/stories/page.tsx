import ConteCard from "@/components/ui/conte-card";
import ErrorDisplay from "@/components/ui/error-display";
import { getStudentData } from "@/lib/db";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";

interface ConteWithProgress {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt: Date | null;
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

  // Combiner les contes avec leurs progressions
  return allContes.map((conte) => {
    const progress = progressMap.get(conte.id);
    return {
      id: conte.id,
      title: conte.title,
      isCompleted: progress?.isCompleted || false,
      completedAt: progress?.completedAt || null,
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
    const completedStories = stories.filter((story) => story.isCompleted);
    const totalStories = stories.length;

    return (
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Bibliothèque d'Histoires</h1>
          <p className="text-blue-100">
            Découvrez et lisez toutes nos histoires éducatives
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
              <div className="text-2xl font-bold">{totalStories}</div>
              <div className="text-sm text-blue-100">Total d'histoires</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">
                {totalStories > 0
                  ? Math.round((completedStories.length / totalStories) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-blue-100">Progression</div>
            </div>
          </div>
        </div>

        {/* Liste des histoires */}
        <div className="grid gap-4">
          {stories.map((story) => (
            <ConteCard
              key={story.id}
              conteId={story.id}
              title={story.title}
              isCompleted={story.isCompleted}
              completedAt={story.completedAt}
            />
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune histoire disponible pour le moment.</p>
          </div>
        )}
      </div>
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
