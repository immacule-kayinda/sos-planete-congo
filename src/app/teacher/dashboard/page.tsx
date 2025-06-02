import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function TeacherDashboard() {
  return (
    <>
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
              placeholder="Explore courses..."
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
              3
            </span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm">Mr. Kashala</p>
              <p className="text-xs text-gray-500">Professeur</p>
            </div>
            <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="Professeur"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                MK
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Welcome Section */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            Bienvenu Mr. Kashala
          </h2>
          <p className="text-sm lg:text-base text-gray-600">
            Cette semaine vous avez créé 4 nouvelles formations. Continuez votre
            excellent travail !
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <StatsCard
            title="Formations actives"
            value="8"
            subtitle="3 nouvelles cette semaine"
            icon={<BookOpen className="text-blue-600" />}
          />
          <StatsCard
            title="Classes"
            value="5"
            subtitle="156 étudiants au total"
            icon={<Users className="text-green-600" />}
          />
          <StatsCard
            title="Matériel"
            value="24"
            subtitle="12 ajoutés ce mois"
            icon={<FileText className="text-purple-600" />}
          />
          <StatsCard
            title="Taux d'engagement"
            value="78%"
            subtitle="+5% ce mois"
            icon={<TrendingUp className="text-orange-600" />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Formations Section */}
          <div className="xl:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Formations en progression
              </h3>
              <Button className="bg-[#d31929] hover:bg-[#b91525] w-full sm:w-auto">
                <Plus size={16} className="mr-2" />
                Nouvelle formation
              </Button>
            </div>

            <div className="space-y-4">
              <FormationCard
                title="Les jeux"
                description="Apprenez le fonctionnement de chaque jeux et les règles de chaque jeux"
                students={24}
                completion={65}
                lastUpdate="Il y a 2 heures"
                status="active"
              />
              <FormationCard
                title="Mathématiques niveau 1"
                description="Formation complète sur les bases des mathématiques"
                students={32}
                completion={78}
                lastUpdate="Hier"
                status="active"
              />
              <FormationCard
                title="Sciences naturelles"
                description="Découverte de l'environnement et de la nature"
                students={18}
                completion={45}
                lastUpdate="Il y a 3 jours"
                status="draft"
              />
              <FormationCard
                title="Histoire du Congo"
                description="Patrimoine et culture de notre pays"
                students={28}
                completion={92}
                lastUpdate="La semaine dernière"
                status="completed"
              />
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
                  Créer une formation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users size={16} className="mr-2" />
                  Gérer les classes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText size={16} className="mr-2" />
                  Ajouter du matériel
                </Button>
              </CardContent>
            </Card>

            {/* Aperçu des progrès */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Aperçu des progrès</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Formations en progression
                    </span>
                    <Badge className="bg-[#059d00] hover:bg-[#059d00]/90 text-white">
                      4
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#059d00] h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Formations terminées
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-bold">8</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activité récente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ActivityItem
                  student="Marie Mukendi"
                  action="a terminé"
                  course="Les jeux"
                  time="Il y a 1h"
                />
                <ActivityItem
                  student="Jean Kabila"
                  action="a commencé"
                  course="Mathématiques niveau 1"
                  time="Il y a 2h"
                />
                <ActivityItem
                  student="Sarah Tshisekedi"
                  action="a posé une question dans"
                  course="Sciences naturelles"
                  time="Il y a 4h"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
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

function FormationCard({
  title,
  description,
  students,
  completion,
  lastUpdate,
  status,
}: {
  title: string;
  description: string;
  students: number;
  completion: number;
  lastUpdate: string;
  status: "active" | "draft" | "completed";
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Actif
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Brouillon
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Terminé
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h4 className="font-semibold text-gray-900">{title}</h4>
              {getStatusBadge(status)}
            </div>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs text-gray-500">
              <span>{students} étudiants</span>
              <span className="hidden sm:inline">•</span>
              <span>{completion}% complété</span>
              <span className="hidden sm:inline">•</span>
              <span>{lastUpdate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
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
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#d31929] h-2 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  student,
  action,
  course,
  time,
}: {
  student: string;
  action: string;
  course: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
          {student
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{student}</span> {action}{" "}
          <span className="font-medium">{course}</span>
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
