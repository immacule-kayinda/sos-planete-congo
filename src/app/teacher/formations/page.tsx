import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import {
  Bell,
  Clock,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function FormationsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }
  if (session.user.role !== "TEACHER") {
    redirect("/dashboard");
  }
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
  });
  if (!teacher) {
    redirect("/signin");
  }
  return (
    <>
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
            Formations
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative w-[200px] lg:w-[320px] hidden sm:block">
            <Input
              placeholder="Rechercher une formation..."
              className="pl-10 pr-4 border-gray-300 text-sm"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <Link href="/teacher/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm">
                {teacher.firstName} {teacher.lastName}
              </p>
              <p className="text-xs text-gray-500">Professeur</p>
            </div>
            <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="Professeur"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                {teacher.firstName?.[0]}
                {teacher.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <form action="/api/auth/signout" method="post">
              <Button type="submit" variant="outline" size="sm">
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="active">En cours</TabsTrigger>
              <TabsTrigger value="draft">Brouillons</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button className="bg-[#d31929] hover:bg-[#b91525]">
              <Plus size={16} className="mr-2" />
              Nouvelle formation
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Formation Cards */}
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Les jeux</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Apprenez le fonctionnement de chaque jeux et les règles de
                    chaque jeux
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={18} />
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">24 étudiants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">12 heures</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className="bg-[#059d00] hover:bg-[#059d00]/90 text-white">
                  En cours
                </Badge>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repeat similar cards for other formations */}
        </div>
      </main>
    </>
  );
}
