import { ConteForm } from "@/components/conte-form";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function EditContePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const conte = await prisma.conte.findUnique({
    where: { id: params.id },
    include: {
      pages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!conte) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modifier le conte</h1>
        <p className="text-muted-foreground">
          Mettre à jour les détails et le contenu du conte.
        </p>
      </div>

      <Card className="p-6">
        <ConteForm conte={conte} />
      </Card>
    </div>
  );
}
