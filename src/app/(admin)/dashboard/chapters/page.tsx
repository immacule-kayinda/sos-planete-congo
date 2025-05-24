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
          <h1 className="text-3xl font-bold tracking-tight">Chapters</h1>
          <p className="text-muted-foreground">Manage educational chapters and their content.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/chapters/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Chapter
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ChapterTable />
      </Suspense>
    </div>
  )
}
