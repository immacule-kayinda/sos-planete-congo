import InteractiveStory from "@/components/ui/InteractiveStory";
import ErrorDisplay from "@/components/ui/error-display";
import prisma from "@/lib/prisma";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  try {
    const story = await prisma.conte.findUnique({
      where: { id },
      include: {
        pages: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!story) {
      return (
        <ErrorDisplay
          title="Conte non trouvé"
          message="Le conte que vous recherchez n'existe pas ou a été supprimé."
          showRetryButton={false}
        />
      );
    }

    if (!story.pages || story.pages.length === 0) {
      return (
        <ErrorDisplay
          title="Conte incomplet"
          message="Ce conte n'a pas encore de pages. Il sera bientôt disponible."
          showRetryButton={false}
        />
      );
    }

    if (!story.audioUrl) {
      return (
        <ErrorDisplay
          title="Audio manquant"
          message="L'audio de ce conte n'est pas encore disponible."
          showRetryButton={false}
        />
      );
    }

    return (
      <div className="min-h-screen w-full">
        <InteractiveStory
          storyId={story.id}
          audioUrl={story.audioUrl}
          pages={story.pages}
          title={story.title}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading story:", error);
    return (
      <ErrorDisplay
        title="Erreur de chargement"
        message="Impossible de charger le conte. Veuillez réessayer plus tard."
      />
    );
  }
}
