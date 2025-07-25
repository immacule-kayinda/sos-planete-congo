import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Check, X, Clock, Info, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";
import { TeacherHeader } from "@/components/teacher/teacher-header";

export default async function NotificationsPage() {
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
      <TeacherHeader
        title="Notifications"
        teacher={{
          firstName: teacher.firstName,
          lastName: teacher.lastName,
        }}
        showSearch={true}
        notificationCount={3}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="read">Lues</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Settings size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Notification Items */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Info className="text-blue-600" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        Nouvelle inscription
                      </p>
                      <p className="text-sm text-gray-600">
                        Marie Mukendi s'est inscrite à votre formation "Les
                        jeux"
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Check size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X size={18} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      <Clock size={14} className="inline mr-1" />
                      Il y a 2 heures
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Formation
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repeat similar cards for other notifications */}
        </div>
      </main>
    </>
  );
}
