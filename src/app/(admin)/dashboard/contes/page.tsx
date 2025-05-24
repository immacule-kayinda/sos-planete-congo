import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ConteTable } from "@/components/conte-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contes</h1>
          <p className="text-muted-foreground">Manage educational stories and their associated media.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/contes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Conte
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ConteTable />
      </Suspense>
    </div>
  )
}
