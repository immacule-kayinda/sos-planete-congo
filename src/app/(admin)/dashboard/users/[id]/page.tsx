import { UserForm, UserType } from "@/components/user-form";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface User extends UserType {
  id: string;
}

// Mock function to get user by ID - in a real app, this would fetch from your database
function getUserById(id: string): UserType {
  // Mock data
  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      role: "admin",
      isActive: true,
      isEmailVerified: true,
    },
    {
      id: "2",
      email: "teacher@example.com",
      role: "teacher",
      isActive: true,
      isEmailVerified: true,
    },
  ];
  return users.find((user) => user.id === id) as UserType;
}

export default async function EditUserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Modifier l'utilisateur
        </h1>
        <p className="text-muted-foreground">
          Mettre à jour les informations, le rôle et le statut de l'utilisateur.
        </p>
      </div>

      <Card className="p-6">
        <UserForm user={user} />
      </Card>
    </div>
  );
}
