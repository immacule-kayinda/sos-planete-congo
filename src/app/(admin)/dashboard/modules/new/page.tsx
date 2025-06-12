import { ModuleForm } from "@/components/module-form";
import { Card } from "@/components/ui/card";

export default function NewModulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Ajouter un Nouveau Module
        </h1>
        <p className="text-muted-foreground">
          Créer un nouveau module éducatif pour la plateforme.
        </p>
      </div>

      <Card className="p-6">
        <ModuleForm />
      </Card>
    </div>
  );
}
