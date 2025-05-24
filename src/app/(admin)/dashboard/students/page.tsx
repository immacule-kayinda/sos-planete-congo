import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Étudiants</h1>
          <p className="text-muted-foreground">Gérez les profils des étudiants et leur progression.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/students/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un étudiant
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>La gestion des étudiants arrive bientôt...</p>
        </div>
      </Card>
    </div>
  )
}
