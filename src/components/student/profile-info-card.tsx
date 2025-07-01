import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Mail, User, School, GraduationCap } from "lucide-react";

interface ProfileInfoCardProps {
  firstName: string | null;
  lastName: string | null;
  age: number;
  email: string;
  createdAt: string;
  accountStatus: string;
  classroom: {
    name: string;
    classCode: string;
  } | null;
  teacher: {
    firstName: string;
    lastName: string;
    school: string;
  } | null;
}

export function ProfileInfoCard({
  firstName,
  lastName,
  age,
  email,
  createdAt,
  accountStatus,
  classroom,
  teacher,
}: ProfileInfoCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "LIMITED_ACCESS":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING_ACTIVATION":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Actif";
      case "LIMITED_ACCESS":
        return "Accès limité";
      case "PENDING_ACTIVATION":
        return "En attente";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = () => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Informations personnelles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar et nom */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{age} ans</p>
            <Badge className={getStatusColor(accountStatus)}>
              {getStatusText(accountStatus)}
            </Badge>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Membre depuis {formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Informations de classe */}
        {classroom && (
          <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium flex items-center gap-2">
              <School className="h-4 w-4" />
              Classe
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nom de la classe:</span>
                <span className="font-medium">{classroom.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Code de classe:</span>
                <span className="font-mono font-medium">
                  {classroom.classCode}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Informations du professeur */}
        {teacher && (
          <div className="space-y-3 p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Professeur
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nom:</span>
                <span className="font-medium">
                  {teacher.firstName} {teacher.lastName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>École:</span>
                <span className="font-medium">{teacher.school}</span>
              </div>
            </div>
          </div>
        )}

        {!classroom && !teacher && (
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Aucune classe ou professeur assigné
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
