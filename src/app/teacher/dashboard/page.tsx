import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getTeacherDashboardData(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          lastLogin: true,
        },
      },
      Classroom: {
        include: {
          students: {
            include: {
              user: {
                select: {
                  lastLogin: true,
                  createdAt: true,
                },
              },
              performance: {
                include: {
                  chapter: {
                    select: {
                      title: true,
                      module: {
                        select: {
                          title: true,
                        },
                      },
                    },
                  },
                },
              },
              StudentChapterProgress: {
                include: {
                  chapter: {
                    select: {
                      title: true,
                    },
                  },
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

  // Calculate comprehensive statistics
  const allStudents = teacher.Classroom.flatMap(
    (classroom) => classroom.students
  );
  const totalStudents = allStudents.length;
  const activeStudents = allStudents.filter(
    (s) => s.accountStatus === "ACTIVE"
  ).length;
  const pendingStudents = allStudents.filter(
    (s) => s.accountStatus === "PENDING_ACTIVATION"
  ).length;

  // Recent activity (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const recentStudents = allStudents.filter((s) => s.user.createdAt >= weekAgo);

  const recentActivity = allStudents
    .filter((s) => s.user.lastLogin && s.user.lastLogin >= weekAgo)
    .sort(
      (a, b) =>
        new Date(b.user.lastLogin!).getTime() -
        new Date(a.user.lastLogin!).getTime()
    )
    .slice(0, 5);

  // Performance statistics
  const allPerformances = allStudents.flatMap((s) => s.performance);
  const totalStars = allPerformances.reduce(
    (sum, p) => sum + (p.stars || 0),
    0
  );
  const avgAccuracy =
    allPerformances.length > 0
      ? Math.round(
          allPerformances.reduce((sum, p) => sum + (p.accuracy || 0), 0) /
            allPerformances.length
        )
      : 0;

  // Progress statistics
  const allProgress = allStudents.flatMap((s) => s.StudentChapterProgress);
  const completedChapters = allProgress.filter((p) => p.isRead).length;
  const totalChapters = allProgress.length;
  const overallProgress =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  // Top performing students
  const studentsWithStats = allStudents
    .map((student) => {
      const stars = student.performance.reduce(
        (sum, p) => sum + (p.stars || 0),
        0
      );
      const accuracy =
        student.performance.length > 0
          ? Math.round(
              student.performance.reduce(
                (sum, p) => sum + (p.accuracy || 0),
                0
              ) / student.performance.length
            )
          : 0;
      const completed = student.StudentChapterProgress.filter(
        (p) => p.isRead
      ).length;
      const total = student.StudentChapterProgress.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...student,
        stars,
        accuracy,
        progress,
        score: stars + accuracy + progress, // Simple scoring system
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    teacher: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      school: teacher.school,
      teachingLevel: teacher.teachingLevel,
      isApproved: teacher.isApproved,
      email: teacher.user.email,
      lastLogin: teacher.user.lastLogin,
    },
    stats: {
      totalClasses: teacher.Classroom.length,
      totalStudents,
      activeStudents,
      pendingStudents,
      recentStudents: recentStudents.length,
      totalStars,
      avgAccuracy,
      overallProgress,
    },
    classrooms: teacher.Classroom.map((classroom) => ({
      ...classroom,
      activeStudents: classroom.students.filter(
        (s) => s.accountStatus === "ACTIVE"
      ).length,
      avgProgress:
        classroom.students.length > 0
          ? Math.round(
              classroom.students.reduce((sum, s) => {
                const completed = s.StudentChapterProgress.filter(
                  (p) => p.isRead
                ).length;
                const total = s.StudentChapterProgress.length;
                return sum + (total > 0 ? (completed / total) * 100 : 0);
              }, 0) / classroom.students.length
            )
          : 0,
    })),
    recentActivity,
    topStudents: studentsWithStats,
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

  const data = await getTeacherDashboardData(session.user.id);

  if (!data) {
    redirect("/signin");
  }

  if (!data.teacher.isApproved) {
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
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Tableau de bord
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-sm">
              {data.teacher.firstName} {data.teacher.lastName}
            </p>
            <p className="text-xs text-gray-500">
              Professeur • {data.teacher.school}
            </p>
          </div>
          <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
              {data.teacher.firstName?.[0]}
              {data.teacher.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenue {data.teacher.firstName} !
          </h2>
          <p className="text-gray-600">
            Vous gérez {data.stats.totalClasses} classe
            {data.stats.totalClasses > 1 ? "s" : ""} avec{" "}
            {data.stats.totalStudents} étudiant
            {data.stats.totalStudents > 1 ? "s" : ""}.
            {data.stats.recentStudents > 0 && (
              <span className="text-green-600 font-medium">
                {" "}
                {data.stats.recentStudents} nouveau
                {data.stats.recentStudents > 1 ? "x" : ""} cette semaine !
              </span>
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Étudiants Actifs
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {data.stats.activeStudents}
                  </p>
                  <p className="text-xs text-gray-500">
                    +{data.stats.recentStudents} cette semaine
                  </p>
                </div>
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    En Attente
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {data.stats.pendingStudents}
                  </p>
                  <p className="text-xs text-gray-500">Approbation requise</p>
                </div>
                <Clock className="text-orange-600" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Étoiles Totales
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {data.stats.totalStars}
                  </p>
                  <p className="text-xs text-gray-500">
                    Moy. {data.stats.avgAccuracy}% précision
                  </p>
                </div>
                <Award className="text-yellow-600" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Progression
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {data.stats.overallProgress}%
                  </p>
                  <p className="text-xs text-gray-500">Moyenne générale</p>
                </div>
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Classes Overview */}
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mes Classes</CardTitle>
                  <Link href="/teacher/classes">
                    <Button variant="outline" size="sm">
                      Voir tout <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {data.classrooms.length > 0 ? (
                  <div className="space-y-4">
                    {data.classrooms.slice(0, 3).map((classroom) => (
                      <div
                        key={classroom.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{classroom.name}</h4>
                          <p className="text-sm text-gray-500">
                            {classroom.students.length} étudiant
                            {classroom.students.length > 1 ? "s" : ""} •
                            {classroom.activeStudents} actif
                            {classroom.activeStudents > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {classroom.avgProgress}%
                          </p>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${classroom.avgProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Aucune classe créée</p>
                    <Button className="bg-[#d31929] hover:bg-[#b91525]">
                      <Plus size={16} className="mr-2" />
                      Créer une classe
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                {data.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {data.recentActivity.map((student) => (
                      <div key={student.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                            {student.firstName?.[0] || "U"}
                            {student.lastName?.[0] || ""}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {student.firstName || "Étudiant"}{" "}
                              {student.lastName || ""}
                            </span>{" "}
                            s'est connecté
                          </p>
                          <p className="text-xs text-gray-500">
                            {student.user.lastLogin
                              ? new Date(
                                  student.user.lastLogin
                                ).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Jamais connecté"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aucune activité récente
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} className="text-yellow-500" />
                  Top Étudiants
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.topStudents.length > 0 ? (
                  <div className="space-y-3">
                    {data.topStudents.map((student, index) => (
                      <div key={student.id} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Badge
                            variant={index === 0 ? "default" : "secondary"}
                            className="w-6 h-6 p-0 flex items-center justify-center"
                          >
                            {index + 1}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {student.firstName || "Étudiant"}{" "}
                            {student.lastName || ""}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>⭐ {student.stars}</span>
                            <span>•</span>
                            <span>{student.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aucun étudiant encore
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/teacher/classes">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus size={16} className="mr-2" />
                    Créer une classe
                  </Button>
                </Link>
                <Link href="/teacher/students">
                  <Button variant="outline" className="w-full justify-start">
                    <Users size={16} className="mr-2" />
                    Gérer les étudiants
                  </Button>
                </Link>
                <Link href="/teacher/classes">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen size={16} className="mr-2" />
                    Voir les classes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Dernière connexion
                  </p>
                  <p className="text-sm">
                    {data.teacher.lastLogin
                      ? new Date(data.teacher.lastLogin).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Première connexion"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">École</p>
                  <p className="text-sm">{data.teacher.school}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Niveau</p>
                  <p className="text-sm">{data.teacher.teachingLevel}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
