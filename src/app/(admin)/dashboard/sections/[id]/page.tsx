import { SectionForm } from "@/components/section-form";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface SectionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSectionPage({ params }: SectionPageProps) {
  const { id } = await params;

  const section = await prisma.section.findUnique({
    where: { id },
    include: {
      modules: true,
      conte: true,
      quizz: true,
    },
  });

  if (!section) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Modifier la Section
        </h1>
        <p className="text-muted-foreground">
          Mettre à jour les détails de la section.
        </p>
      </div>

      <Card className="p-6">
        <SectionForm section={section} />
      </Card>
    </div>
  );
}
