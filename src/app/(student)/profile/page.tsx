"use client";

import { useStudentProfile } from "@/hooks/use-student-profile";
import { ProfileInfoCard } from "@/components/student/profile-info-card";
import { ProfileStatsCard } from "@/components/student/profile-stats-card";
import { ProfileInventoryCard } from "@/components/student/profile-inventory-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Profile() {
  const { profile, loading, error, refreshProfile } = useStudentProfile();

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profil</h1>
          <Button disabled>
            <RefreshCw className="h-4 w-4 animate-spin" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={refreshProfile}
            >
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Impossible de charger le profil. Veuillez réessayer.
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={refreshProfile}
            >
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et suivez votre progression
          </p>
        </div>
        <Button onClick={refreshProfile} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <ProfileInfoCard
          firstName={profile.firstName}
          lastName={profile.lastName}
          age={profile.age}
          email={profile.email}
          createdAt={profile.createdAt}
          accountStatus={profile.accountStatus}
          classroom={profile.classroom}
          teacher={profile.teacher}
        />

        {/* Statistiques */}
        <ProfileStatsCard stats={profile.stats} />
      </div>

      {/* Inventaire */}
      <ProfileInventoryCard inventory={profile.inventory} />
    </div>
  );
}
