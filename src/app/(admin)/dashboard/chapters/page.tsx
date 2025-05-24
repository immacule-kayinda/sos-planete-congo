import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ChapterTable } from "@/components/chapter-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChaptersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chapitres</h1>
          <p className="text-muted-foreground">Gérez les chapitres éducatifs et leur contenu.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/chapters/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un chapitre
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ChapterTable />
      </Suspense>
    </div>
  )
}
