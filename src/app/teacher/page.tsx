import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bell,
  BookOpen,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import type React from "react";
import prisma from "@/lib/prisma";

async function getTeacherData(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          isActive: true,
        },
      },
      Classroom: {
        include: {
          students: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              accountStatus: true,
            },
          },
        },
      },
    },
  });

  if (!teacher) {
    return null;
  }

  // Calculate statistics
  const totalClasses = teacher.Classroom.length;
  const totalStudents = teacher.Classroom.reduce(
    (sum, classroom) => sum + classroom.students.length,
    0
  );
  const activeStudents = teacher.Classroom.reduce(
    (sum, classroom) =>
      sum +
      classroom.students.filter((s) => s.accountStatus === "ACTIVE").length,
    0
  );

  return {
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    school: teacher.school,
    teachingLevel: teacher.teachingLevel,
    isApproved: teacher.isApproved,
    email: teacher.user.email,
    totalClasses,
    totalStudents,
    activeStudents,
    classrooms: teacher.Classroom,
  };
}

export default async function TeacherDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "TEACHER") {
    redirect("/dashboard");
  }

  const teacherData = await getTeacherData(session.user.id);

  if (!teacherData) {
    redirect("/signin");
  }

  if (!teacherData.isApproved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">Compte en attente</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Votre compte professeur est en attente d'approbation par
              l'administrateur.
            </p>
            <p className="text-sm text-muted-foreground">
              Vous recevrez un email une fois votre compte approuvé.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              Tableau de bord
            </h1>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative w-[200px] lg:w-[320px] hidden sm:block">
              <Input
                placeholder="Rechercher..."
                className="pl-10 pr-4 border-gray-300 text-sm"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {teacherData.classrooms.length}
              </span>
            </Button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-sm">
                  {teacherData.firstName} {teacherData.lastName}
                </p>
                <p className="text-xs text-gray-500">Professeur</p>
              </div>
              <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                  {teacherData.firstName?.[0]}
                  {teacherData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              Bienvenue {teacherData.firstName} {teacherData.lastName}
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              Vous gérez actuellement {teacherData.totalClasses} classe
              {teacherData.totalClasses > 1 ? "s" : ""} avec{" "}
              {teacherData.totalStudents} étudiant
              {teacherData.totalStudents > 1 ? "s" : ""} au total.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Classes actives"
              value={teacherData.totalClasses.toString()}
              subtitle={`${teacherData.activeStudents} étudiants actifs`}
              icon={<Users className="text-green-600" />}
            />
            <StatsCard
              title="Total étudiants"
              value={teacherData.totalStudents.toString()}
              subtitle={`${teacherData.activeStudents} actifs`}
              icon={<Users className="text-blue-600" />}
            />
            <StatsCard
              title="École"
              value={teacherData.school}
              subtitle={teacherData.teachingLevel}
              icon={<BookOpen className="text-purple-600" />}
            />
            <StatsCard
              title="Statut"
              value="Approuvé"
              subtitle="Compte vérifié"
              icon={<TrendingUp className="text-orange-600" />}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Classes Section */}
            <div className="xl:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Mes Classes
                </h3>
                <Button className="bg-[#d31929] hover:bg-[#b91525] w-full sm:w-auto">
                  <Plus size={16} className="mr-2" />
                  Nouvelle classe
                </Button>
              </div>

              <div className="space-y-4">
                {teacherData.classrooms.length > 0 ? (
                  teacherData.classrooms.map((classroom) => (
                    <ClassroomCard
                      key={classroom.id}
                      name={classroom.name}
                      classCode={classroom.classCode}
                      students={classroom.students.length}
                      activeStudents={
                        classroom.students.filter(
                          (s) => s.accountStatus === "ACTIVE"
                        ).length
                      }
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        Vous n'avez pas encore de classes. Créez votre première
                        classe pour commencer.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus size={16} className="mr-2" />
                    Créer une classe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users size={16} className="mr-2" />
                    Gérer les classes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText size={16} className="mr-2" />
                    Voir le matériel
                  </Button>
                </CardContent>
              </Card>

              {/* School Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">École</p>
                    <p className="text-sm">{teacherData.school}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Niveau d'enseignement
                    </p>
                    <p className="text-sm">{teacherData.teachingLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-sm">{teacherData.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function StatsCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
              {title}
            </p>
            <p className="text-xl lg:text-2xl font-bold text-gray-900">
              {value}
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
          </div>
          <div className="p-2 lg:p-3 bg-gray-50 rounded-lg ml-2">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClassroomCard({
  name,
  classCode,
  students,
  activeStudents,
}: {
  name: string;
  classCode: string;
  students: number;
  activeStudents: number;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h4 className="font-semibold text-gray-900">{name}</h4>
              <Badge variant="outline">Code: {classCode}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-600">
              <span>
                {students} étudiant{students > 1 ? "s" : ""}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                {activeStudents} actif{activeStudents > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
