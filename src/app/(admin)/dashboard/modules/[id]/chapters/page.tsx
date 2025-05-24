import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"

// Mock function to get module by ID - in a real app, this would fetch from your database
async function getModuleById(id: string) {
  // Mock data
  const modules = {
    "1": {
      id: "1",
      title: "Introduction to Mathematics",
      description: "Basic mathematical concepts for beginners",
    },
    "2": {
      id: "2",
      title: "French Grammar",
      description: "Essential grammar rules for French language learners",
    },
  }

  return modules[id] || null
}

// Mock function to get chapters by module ID - in a real app, this would fetch from your database
async function getChaptersByModuleId(moduleId: string) {
  // Mock data
  const allChapters = [
    {
      id: "1",
      title: "Numbers and Counting",
      moduleId: "1",
      content: "Numbers are the foundation of mathematics...",
      createdAt: "2023-01-15T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Addition and Subtraction",
      moduleId: "1",
      content: "Now that we know how to count...",
      createdAt: "2023-01-20T00:00:00.000Z",
    },
    {
      id: "3",
      title: "Basic Verbs",
      moduleId: "2",
      content: "Verbs are action words...",
      createdAt: "2023-02-15T00:00:00.000Z",
    },
    {
      id: "4",
      title: "Adjectives",
      moduleId: "2",
      content: "Adjectives describe nouns...",
      createdAt: "2023-02-20T00:00:00.000Z",
    },
  ]

  return allChapters.filter((chapter) => chapter.moduleId === moduleId)
}

export default async function ModuleChaptersPage({ params }: { params: { id: string } }) {
  const module = await getModuleById(params.id)

  if (!module) {
    notFound()
  }

  const chapters = await getChaptersByModuleId(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chapitres pour {module.title}</h1>
          <p className="text-muted-foreground">Gérez les chapitres pour ce module.</p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/chapters/new?moduleId=${module.id}`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un chapitre
          </Link>
        </Button>
      </div>

      <Card>
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Longueur du contenu</TableHead>
                <TableHead>Créé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Aucuns chapitres trouvés pour ce module.
                  </TableCell>
                </TableRow>
              ) : (
                chapters.map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell className="font-medium">{chapter.title}</TableCell>
                    <TableCell>{chapter.content.length} caractères</TableCell>
                    <TableCell>{new Date(chapter.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/chapters/${chapter.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Suspense>
      </Card>
    </div>
  )
}
