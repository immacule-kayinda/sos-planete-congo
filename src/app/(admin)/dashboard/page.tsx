import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, FileText, BookMarked } from "lucide-react";
import {
  getDashboardStats,
  getUserDistribution,
  getRecentActivity,
  formatTimeAgo,
} from "@/lib/dashboard-actions";

export default async function DashboardPage() {
  // Récupérer les vraies données de la base de données
  const [stats, userDistribution, recentActivity] = await Promise.all([
    getDashboardStats(),
    getUserDistribution(),
    getRecentActivity(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace d&apos;administration. Gérez vos modules,
          chapitres et utilisateurs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs totaux
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.usersThisMonth > 0
                ? `+${stats.usersThisMonth} nouveau${stats.usersThisMonth > 1 ? "x" : ""} ce mois-ci`
                : "Aucun nouveau ce mois-ci"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalModules}</div>
            <p className="text-xs text-muted-foreground">
              {stats.modulesThisMonth > 0
                ? `+${stats.modulesThisMonth} nouveau${stats.modulesThisMonth > 1 ? "x" : ""} ce mois-ci`
                : "Aucun nouveau ce mois-ci"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chapitres</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalChapters}</div>
            <p className="text-xs text-muted-foreground">
              {stats.chaptersThisMonth > 0
                ? `+${stats.chaptersThisMonth} nouveau${stats.chaptersThisMonth > 1 ? "x" : ""} ce mois-ci`
                : "Aucun nouveau ce mois-ci"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contes</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.contesThisMonth > 0
                ? `+${stats.contesThisMonth} nouveau${stats.contesThisMonth > 1 ? "x" : ""} ce mois-ci`
                : "Aucun nouveau ce mois-ci"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Activité récente des utilisateurs sur la plateforme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                <p>Aucune activité récente à afficher</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Répartition des utilisateurs</CardTitle>
            <CardDescription>
              Répartition des utilisateurs par rôle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Étudiants</span>
                </div>
                <span className="text-sm font-medium">
                  {userDistribution.studentsPercentage}% (
                  {userDistribution.students})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Enseignants</span>
                </div>
                <span className="text-sm font-medium">
                  {userDistribution.teachersPercentage}% (
                  {userDistribution.teachers})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium">Administrateurs</span>
                </div>
                <span className="text-sm font-medium">
                  {userDistribution.adminsPercentage}% (
                  {userDistribution.admins})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
