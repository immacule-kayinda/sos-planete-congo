import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentsManagement } from "@/components/teacher/students-management";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import prisma from "@/lib/prisma";

async function getTeacherStudents(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      Classroom: {
        include: {
          students: {
            include: {
              user: {
                select: {
                  email: true,
                  createdAt: true,
                },
              },
              performance: {
                select: {
                  stars: true,
                  accuracy: true,
                },
              },
              StudentChapterProgress: {
                select: {
                  isRead: true,
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

  // Flatten all students from all classrooms
  const allStudents = teacher.Classroom.flatMap((classroom) =>
    classroom.students.map((student) => ({
      ...student,
      classroomName: classroom.name,
      classroomCode: classroom.classCode,
      totalStars: student.performance.reduce(
        (sum, p) => sum + (p.stars || 0),
        0
      ),
      avgAccuracy:
        student.performance.length > 0
          ? Math.round(
              student.performance.reduce(
                (sum, p) => sum + (p.accuracy || 0),
                0
              ) / student.performance.length
            )
          : 0,
      completedChapters: student.StudentChapterProgress.filter((p) => p.isRead)
        .length,
      totalChapters: student.StudentChapterProgress.length,
    }))
  );

  // Calculate statistics
  const totalStudents = allStudents.length;
  const activeStudents = allStudents.filter(
    (s) => s.accountStatus === "ACTIVE"
  ).length;
  const pendingStudents = allStudents.filter(
    (s) => s.accountStatus === "PENDING_ACTIVATION"
  ).length;
  const limitedStudents = allStudents.filter(
    (s) => s.accountStatus === "LIMITED_ACCESS"
  ).length;

  return {
    teacher: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      isApproved: teacher.isApproved,
    },
    students: allStudents,
    stats: {
      totalStudents,
      activeStudents,
      pendingStudents,
      limitedStudents,
    },
    classrooms: teacher.Classroom,
  };
}

export default async function TeacherStudentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "TEACHER") {
    redirect("/dashboard");
  }

  const data = await getTeacherStudents(session.user.id);

  if (!data) {
    redirect("/signin");
  }

  if (!data.teacher.isApproved) {
    redirect("/teacher");
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Gestion des Étudiants
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Étudiants
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.stats.totalStudents}
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
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-green-600">
                    {data.stats.activeStudents}
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
                    Accès Limité
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {data.stats.limitedStudents}
                  </p>
                </div>
                <XCircle className="text-yellow-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gestion des Étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            {data.students.length > 0 ? (
              <StudentsManagement
                students={data.students}
                classrooms={data.classrooms}
              />
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun étudiant inscrit
                </h3>
                <p className="text-gray-500 mb-6">
                  Les étudiants apparaîtront ici une fois qu'ils s'inscriront
                  avec vos codes de classe.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
