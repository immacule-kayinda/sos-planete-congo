import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getStudentProfile } from "@/lib/actions";
import { getStudentStreakInfo } from "@/lib/student-progress";
import { ProfileEditForm } from "@/components/student/profile-edit-form";
import { StreakDisplay } from "@/components/student/streak-display";
import { LimitedAccessActions } from "@/components/student/limited-access-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Calendar,
  School,
  Trophy,
  Star,
  Target,
  CheckCircle,
  BookOpen,
  Lock,
} from "lucide-react";
import { StudentLayout } from "@/components/student/student-layout";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  const [profile, streakInfo] = await Promise.all([
    getStudentProfile(session.user.id),
    getStudentStreakInfo(session.user.id),
  ]);

  if (!profile) {
    redirect("/signin");
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500">Actif</Badge>;
      case "LIMITED_ACCESS":
        return <Badge className="bg-yellow-500">Accès Limité</Badge>;
      case "PENDING_ACTIVATION":
        return <Badge className="bg-orange-500">En Attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <StudentLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles et suivez vos progrès
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations personnelles */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Prénom
                  </label>
                  <p className="text-lg">
                    {profile.firstName || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Nom
                  </label>
                  <p className="text-lg">
                    {profile.lastName || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-lg flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Âge
                  </label>
                  <p className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {profile.age} ans
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Statut du compte
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(profile.accountStatus)}
                  </div>
                </div>
                {profile.classroom && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Classe
                    </label>
                    <p className="text-lg flex items-center gap-2">
                      <School className="h-4 w-4" />
                      {profile.classroom}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Formulaire d'édition */}
          <Card>
            <CardHeader>
              <CardTitle>Modifier mes informations</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileEditForm
                firstName={profile.firstName}
                lastName={profile.lastName}
                age={profile.age}
                onUpdate={() => window.location.reload()}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec statistiques et streak */}
        <div className="space-y-6">
          {profile.accountStatus === "LIMITED_ACCESS" ? (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-yellow-600" />
                  Accès limité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-yellow-800">
                  Votre compte est en accès limité. Entrez un code de classe ou
                  demandez l'activation pour débloquer toutes les
                  fonctionnalités.
                </p>
                <LimitedAccessActions />
              </CardContent>
            </Card>
          ) : (
            <>
              <StreakDisplay
                currentStreak={streakInfo.currentStreak}
                lastActive={streakInfo.lastActive}
              />

              {/* Statistiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Mes Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-yellow-600">
                        {profile.totalStars}
                      </div>
                      <div className="text-xs text-yellow-600">Étoiles</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Target className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(profile.progressPercentage)}%
                      </div>
                      <div className="text-xs text-blue-600">Progression</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-green-600">
                        {profile.avgAccuracy}%
                      </div>
                      <div className="text-xs text-green-600">Précision</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <BookOpen className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-purple-600">
                        {profile.completedChapters}
                      </div>
                      <div className="text-xs text-purple-600">Chapitres</div>
                    </div>
                  </div>

                  {/* Progression générale */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression générale</span>
                      <span>{Math.round(profile.progressPercentage)}%</span>
                    </div>
                    <Progress
                      value={profile.progressPercentage}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Informations sur les récompenses de streak */}
              {streakInfo.totalRewardsEarned > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      Récompenses de Série
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {streakInfo.totalRewardsEarned}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Étoiles gagnées grâce aux séries
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
