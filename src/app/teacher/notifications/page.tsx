import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Bell,
  Settings,
  Check,
  X,
  Clock,
  Info,
  Trash2,
} from "lucide-react";

export default function NotificationsPage() {
  return (
    <>
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
            Notifications
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative w-[200px] lg:w-[320px] hidden sm:block">
            <Input
              placeholder="Rechercher une notification..."
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
