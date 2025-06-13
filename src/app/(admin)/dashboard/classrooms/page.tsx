import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ClassroomTable } from "@/components/classroom-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClassroomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Gérer les classes et leurs codes d'accès.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/classrooms/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une Classe
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ClassroomTable />
      </Suspense>
    </div>
  );
}
