import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Bell,
  FileText,
  Download,
  Share2,
  MoreHorizontal,
  Filter,
  Upload,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";

export default async function MaterielPage() {
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
            Matériel
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative w-[200px] lg:w-[320px] hidden sm:block">
            <Input
              placeholder="Rechercher du matériel..."
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
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button className="bg-[#d31929] hover:bg-[#b91525]">
              <Upload size={16} className="mr-2" />
              Ajouter du matériel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Material Cards */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={18} />
                </Button>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Guide des jeux.pdf
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Document PDF • 2.4 MB
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download size={14} className="mr-1" />
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repeat similar cards for other materials */}
        </div>
      </main>
    </>
  );
}
