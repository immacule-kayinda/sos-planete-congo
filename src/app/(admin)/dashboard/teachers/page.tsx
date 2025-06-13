import { Suspense } from "react";
import { TeacherApprovalTable } from "@/components/teacher-approval-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des Enseignants
        </h1>
        <p className="text-muted-foreground">
          Approuver les demandes d'inscription des enseignants et gérer leurs
          comptes.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <TeacherApprovalTable />
      </Suspense>
    </div>
  );
}
