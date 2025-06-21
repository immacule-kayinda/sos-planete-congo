import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function ClassesPage() {
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
                <p className="font-medium text-sm">Mr. Kashala</p>
                <p className="text-xs text-gray-500">Professeur</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="Professeur"
                />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  MK
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
                    <p className="text-2xl font-bold text-gray-900">5</p>
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
                    <p className="text-2xl font-bold text-gray-900">156</p>
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
                      Taux de réussite
                    </p>
                    <p className="text-2xl font-bold text-gray-900">84%</p>
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
                      Sessions cette semaine
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Calendar className="text-orange-600" size={24} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <ClassCard
              name="Classe A - Débutants"
              level="Niveau 1"
              students={32}
              averageProgress={78}
              nextSession="Aujourd'hui 14h00"
              formations={["Les jeux", "Mathématiques"]}
            />
            <ClassCard
              name="Classe B - Intermédiaires"
              level="Niveau 2"
              students={28}
              averageProgress={65}
              nextSession="Demain 10h00"
              formations={["Sciences", "Histoire"]}
            />
            <ClassCard
              name="Classe C - Avancés"
              level="Niveau 3"
              students={24}
              averageProgress={92}
              nextSession="Mercredi 15h30"
              formations={["Français", "Arts"]}
            />
            <ClassCard
              name="Classe D - Spécialisée"
              level="Niveau 4"
              students={18}
              averageProgress={55}
              nextSession="Jeudi 11h00"
              formations={["Mathématiques avancées"]}
            />
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente des classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        CA
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Classe A - Session terminée</p>
                      <p className="text-sm text-gray-500">
                        Formation "Les jeux" - 32 participants
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Terminé</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-yellow-100 text-yellow-600">
                        CB
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Classe B - En cours</p>
                      <p className="text-sm text-gray-500">
                        Formation "Sciences naturelles" - 28 participants
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">En cours</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        CC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        Classe C - Prochaine session
                      </p>
                      <p className="text-sm text-gray-500">
                        Formation "Français" - Mercredi 15h30
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-700">Planifié</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}

function ClassCard({
  name,
  level,
  students,
  averageProgress,
  nextSession,
  formations,
}: {
  name: string;
  level: string;
  students: number;
  averageProgress: number;
  nextSession: string;
  formations: string[];
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <Badge variant="outline" className="mb-2">
              {level}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{students} étudiants</span>
              <span>•</span>
              <span>{formations.length} formations</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
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

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progression moyenne</span>
            <span className="text-sm font-bold">{averageProgress}%</span>
          </div>
          <Progress value={averageProgress} className="h-2" />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Formations actives:</p>
          <div className="flex flex-wrap gap-2">
            {formations.map((formation, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {formation}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500">Prochaine session</p>
            <p className="text-sm font-medium">{nextSession}</p>
          </div>
          <Button
            size="sm"
            className="bg-[#d31929] hover:bg-[#b91525] mt-2 sm:mt-0"
          >
            Gérer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
