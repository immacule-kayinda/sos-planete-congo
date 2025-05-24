import { UserForm } from "@/components/user-form"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"

// Mock function to get user by ID - in a real app, this would fetch from your database
async function getUserById(id: string) {
  // Mock data
  const users = {
    "1": {
      id: "1",
      email: "admin@example.com",
      role: "ADMIN",
      isActive: true,
      isEmailVerified: true,
    },
    "2": {
      id: "2",
      email: "teacher1@example.com",
      role: "TEACHER",
      isActive: true,
      isEmailVerified: true,
    },
  }

  return users[id] || null
}

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <p className="text-muted-foreground">Update user details, role, and status.</p>
      </div>

      <Card className="p-6">
        <UserForm user={user} />
      </Card>
    </div>
  )
}
