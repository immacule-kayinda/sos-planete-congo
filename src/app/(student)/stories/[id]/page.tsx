import InteractiveStory from "@/components/ui/InteractiveStory";
import prisma from "@/lib/prisma";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

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
    return <div>Story not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <InteractiveStory
        storyId={story.id}
        audioUrl={story.audioUrl}
        pages={story.pages}
        title={story.title}
      />
    </div>
  );
}
