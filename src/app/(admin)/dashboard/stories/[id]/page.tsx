import { ConteForm } from "@/components/admin/ConteForm";
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
    return <div>Conte non trouvé</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Modifier le Conte</h1>
      <ConteForm initialData={story} />
    </div>
  );
}
