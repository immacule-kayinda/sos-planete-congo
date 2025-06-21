import { ClassroomForm } from "@/components/classroom-form";
import { Card } from "@/components/ui/card";

export default function NewClassroomPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Ajouter une Nouvelle Classe
        </h1>
        <p className="text-muted-foreground">
          Créer une nouvelle classe avec un code d'accès unique.
        </p>
      </div>

      <Card className="p-6">
        <ClassroomForm />
      </Card>
    </div>
  );
}
