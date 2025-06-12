import { ModuleForm } from "@/components/module-form";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type ModuleData = {
  id: string;
  title: string;
  subtitle: string;
  sectionId: string;
  order: number;
  section?: {
    id: string;
    title: string;
  };
  chapters?: {
    id: string;
    title: string;
  }[];
};

async function getModuleById(id: string): Promise<ModuleData | null> {
  try {
    const moduleData = await prisma.module.findUnique({
      where: {
        id,
      },
      include: {
        section: {
          select: {
            id: true,
            title: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return moduleData;
  } catch (error) {
    console.error("Error fetching module:", error);
    return null;
  }
}

export default async function EditModulePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const moduleData = await getModuleById(params.id);

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Modifier le Module
        </h1>
        <p className="text-muted-foreground">
          Mettre à jour les détails et le contenu du module.
        </p>
      </div>

      <Card className="p-6">
        <ModuleForm module={moduleData} />
      </Card>
    </div>
  );
}
