import { ModuleForm } from "@/components/module-form";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";

type ModuleData = {
  id: string;
  title: string;
  description: string;
};

// Mock function to get module by ID - in a real app, this would fetch from your database
async function getModuleById(id: string): Promise<ModuleData | null> {
  // Mock data
  const modules = {
    "1": {
      id: "1",
      title: "Introduction to Mathematics",
      description: "Learn the basics of mathematics...",
    },
    "2": {
      id: "2",
      title: "French Grammar",
      description: "Master French grammar rules...",
    },
    "3": {
      id: "3",
      title: "Science Basics",
      description: "Explore fundamental scientific concepts...",
    },
    "4": {
      id: "4",
      title: "History of Africa",
      description: "Discover the rich history of Africa...",
    },
  } as const;

  return (modules as Record<string, ModuleData>)[id] || null;
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
          Modifier le module
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
