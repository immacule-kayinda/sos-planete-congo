import { Suspense } from "react"
import { UserTable } from "@/components/user-table"
import { UserTableSkeleton } from "@/components/user-table-skeleton"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les comptes utilisateurs, les rôles et les permissions.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Link>
        </Button>
      </div>

      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable />
      </Suspense>
    </div>
  )
}
