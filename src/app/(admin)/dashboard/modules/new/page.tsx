import { ModuleForm } from "@/components/module-form"
import { Card } from "@/components/ui/card"

export default function NewModulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Module</h1>
        <p className="text-muted-foreground">Create a new educational module for the platform.</p>
      </div>

      <Card className="p-6">
        <ModuleForm />
      </Card>
    </div>
  )
}
