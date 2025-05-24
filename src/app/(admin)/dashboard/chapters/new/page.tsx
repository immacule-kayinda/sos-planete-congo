import { ChapterForm } from "@/components/chapter-form"
import { Card } from "@/components/ui/card"

export default function NewChapterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Chapter</h1>
        <p className="text-muted-foreground">Create a new chapter for an educational module.</p>
      </div>

      <Card className="p-6">
        <ChapterForm />
      </Card>
    </div>
  )
}
