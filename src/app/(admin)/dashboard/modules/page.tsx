import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ModuleTable } from "@/components/module-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
          <p className="text-muted-foreground">Manage educational modules and their content.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/modules/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Module
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ModuleTable />
      </Suspense>
    </div>
  )
}
