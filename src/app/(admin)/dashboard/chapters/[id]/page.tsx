import { ChapterForm } from "@/components/chapter-form"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"

// Mock function to get chapter by ID - in a real app, this would fetch from your database
async function getChapterById(id: string) {
  // Mock data
  const chapters = {
    "1": {
      id: "1",
      title: "Numbers and Counting",
      moduleId: "1",
      content:
        "Numbers are the foundation of mathematics. In this chapter, we will learn how to count from 1 to 100...",
    },
    "2": {
      id: "2",
      title: "Addition and Subtraction",
      moduleId: "1",
      content: "Now that we know how to count, let's learn how to add and subtract numbers...",
    },
    "3": {
      id: "3",
      title: "Basic Verbs",
      moduleId: "2",
      content: "Verbs are action words. In French, verbs are conjugated differently depending on the subject...",
    },
  }

  return chapters[id] || null
}

export default async function EditChapterPage({ params }: { params: { id: string } }) {
  const chapter = await getChapterById(params.id)

  if (!chapter) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Chapter</h1>
        <p className="text-muted-foreground">Update chapter details and content.</p>
      </div>

      <Card className="p-6">
        <ChapterForm chapter={chapter} />
      </Card>
    </div>
  )
}
