import { UserForm } from "@/components/user-form"
import { Card } from "@/components/ui/card"

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ajouter un utilisateur</h1>
        <p className="text-muted-foreground">Créez un nouveau compte utilisateur avec le rôle et les permissions appropriés.</p>
      </div>

      <Card className="p-6">
        <UserForm />
      </Card>
    </div>
  )
}
