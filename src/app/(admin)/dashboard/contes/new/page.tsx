import { ConteForm } from "@/components/conte-form"
import { Card } from "@/components/ui/card"

export default function NewContePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Conte</h1>
        <p className="text-muted-foreground">Create a new educational story with audio and images.</p>
      </div>

      <Card className="p-6">
        <ConteForm />
      </Card>
    </div>
  )
}
