import { SectionForm } from "@/components/section-form";
import { Card } from "@/components/ui/card";

export default function NewSectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nouvelle Section</h1>
        <p className="text-muted-foreground">
          Créez une nouvelle section éducative.
        </p>
      </div>

      <Card className="p-6">
        <SectionForm />
      </Card>
    </div>
  );
}
