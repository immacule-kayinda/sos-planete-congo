import { ModuleForm } from "@/components/module-form"
import { Card } from "@/components/ui/card"
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
    "3": {
      id: "3",
      title: "Science Basics",
      description: "Introduction to scientific concepts for young learners",
    },
    "4": {
      id: "4",
      title: "History of Africa",
      description: "Comprehensive overview of African history",
    },
  }

  return modules[id] || null
}

export default async function EditModulePage({ params }: { params: { id: string } }) {
  const module = await getModuleById(params.id)

  if (!module) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Module</h1>
        <p className="text-muted-foreground">Update module details and content.</p>
      </div>

      <Card className="p-6">
        <ModuleForm module={module} />
      </Card>
    </div>
  )
}
