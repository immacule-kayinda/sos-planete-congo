import { ConteForm } from "@/components/admin/ConteForm";

export default function NewStoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Nouveau Conte</h1>
      <ConteForm />
    </div>
  );
}
