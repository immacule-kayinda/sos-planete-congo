import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Bell,
  Plus,
  Users,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Eye,
  Settings,
} from "lucide-react";
import prisma from "@/lib/prisma";

async function getTeacherClassrooms(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      Classroom: {
        include: {
          students: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
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
    teacher: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.user.email,
      isApproved: teacher.isApproved,
    },
    totalClasses,
    totalStudents,
    activeStudents,
    classrooms: teacher.Classroom,
  };
}

export default async function ClassesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "TEACHER") {
    redirect("/dashboard");
  }

  const data = await getTeacherClassrooms(session.user.id);

  if (!data) {
    redirect("/signin");
  }

  if (!data.teacher.isApproved) {
    redirect("/teacher");
  }

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="md:h-16 bg-white border-b border-gray-200 flex items-center px-4 py-2 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">Classes</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-[320px]">
              <Input
                placeholder="Rechercher une classe..."
                className="pl-10 pr-4 border-gray-300"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-sm">
                  {data.teacher.firstName} {data.teacher.lastName}
                </p>
                <p className="text-xs text-gray-500">Professeur</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {data.teacher.firstName?.[0]}
                  {data.teacher.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Mes Classes
              </h2>
              <p className="text-gray-600">
                Gérez vos classes et suivez les progrès de vos étudiants
              </p>
            </div>
            <Button className="bg-[#d31929] hover:bg-[#b91525]">
              <Plus size={16} className="mr-2" />
              Nouvelle classe
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total classes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.totalClasses}
                    </p>
                  </div>
                  <Users className="text-blue-600" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total étudiants
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.totalStudents}
                    </p>
                  </div>
                  <Users className="text-green-600" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Étudiants actifs
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.activeStudents}
                    </p>
                  </div>
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Taux d'engagement
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.totalStudents > 0
                        ? Math.round(
                            (data.activeStudents / data.totalStudents) * 100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                  <Calendar className="text-orange-600" size={24} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {data.classrooms.length > 0 ? (
              data.classrooms.map((classroom) => (
                <ClassCard
                  key={classroom.id}
                  name={classroom.name}
                  classCode={classroom.classCode}
                  students={classroom.students.length}
                  activeStudents={
                    classroom.students.filter(
                      (s) => s.accountStatus === "ACTIVE"
                    ).length
                  }
                  createdAt={classroom.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune classe créée
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Commencez par créer votre première classe pour accueillir
                      vos étudiants.
                    </p>
                    <Button className="bg-[#d31929] hover:bg-[#b91525]">
                      <Plus size={16} className="mr-2" />
                      Créer ma première classe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          {data.classrooms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Activité récente des classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.classrooms.slice(0, 3).map((classroom) => (
                    <div
                      key={classroom.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {classroom.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{classroom.name}</p>
                          <p className="text-sm text-gray-500">
                            {classroom.students.length} étudiant
                            {classroom.students.length > 1 ? "s" : ""} • Code:{" "}
                            {classroom.classCode}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </>
  );
}

function ClassCard({
  name,
  classCode,
  students,
  activeStudents,
  createdAt,
}: {
  name: string;
  classCode: string;
  students: number;
  activeStudents: number;
  createdAt: Date;
}) {
  const engagementRate =
    students > 0 ? Math.round((activeStudents / students) * 100) : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Badge variant="outline" className="text-xs">
                Code: {classCode}
              </Badge>
              <span>•</span>
              <span>
                Créée le {new Date(createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{students}</p>
            <p className="text-xs text-blue-600">Étudiants</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {activeStudents}
            </p>
            <p className="text-xs text-green-600">Actifs</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Taux d'engagement</span>
            <span>{engagementRate}%</span>
          </div>
          <Progress value={engagementRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
