import { UserForm } from "@/components/user-form"
import { Card } from "@/components/ui/card"

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New User</h1>
        <p className="text-muted-foreground">Create a new user account with the appropriate role and permissions.</p>
      </div>

      <Card className="p-6">
        <UserForm />
      </Card>
    </div>
  )
}
