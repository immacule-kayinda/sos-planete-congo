"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  voterCardNumber: string;
  school: string;
  teachingLevel: string;
  isApproved: boolean;
  createdAt: Date;
  user: {
    email: string;
    isActive: boolean;
    createdAt: Date;
  };
  Classroom: {
    id: string;
    name: string;
    classCode: string;
    students: {
      id: string;
    }[];
  }[];
}

export function TeacherApprovalTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Erreur lors du chargement des enseignants");
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalChange = async (
    teacherId: string,
    isApproved: boolean
  ) => {
    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved }),
      });

      if (!response.ok) throw new Error("Failed to update teacher");

      setTeachers(
        teachers.map((teacher) =>
          teacher.id === teacherId ? { ...teacher, isApproved } : teacher
        )
      );

      toast.success(
        isApproved ? "Enseignant approuvé avec succès" : "Approbation révoquée"
      );
    } catch (error) {
      console.error("Error updating teacher:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) return;

    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete teacher");
      }

      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
      toast.success("Enseignant supprimé avec succès");
    } catch (error: any) {
      console.error("Error deleting teacher:", error);
      toast.error(error.message || "Erreur lors de la suppression");
    }
  };

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingTeachers = filteredTeachers.filter((t) => !t.isApproved);
  const approvedTeachers = filteredTeachers.filter((t) => t.isApproved);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des enseignants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Enseignants en attente d'approbation */}
      {pendingTeachers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">En attente d'approbation</h3>
            <Badge variant="secondary">{pendingTeachers.length}</Badge>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>École</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Inscrit le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      {teacher.firstName} {teacher.lastName}
                    </TableCell>
                    <TableCell>{teacher.user.email}</TableCell>
                    <TableCell>{teacher.school}</TableCell>
                    <TableCell>{teacher.teachingLevel}</TableCell>
                    <TableCell>{teacher.phoneNumber}</TableCell>
                    <TableCell>
                      {new Date(teacher.user.createdAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleApprovalChange(teacher.id, true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteTeacher(teacher.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Enseignants approuvés */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Enseignants approuvés</h3>
          <Badge variant="default">{approvedTeachers.length}</Badge>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>École</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Élèves</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Aucun enseignant approuvé trouvé.
                  </TableCell>
                </TableRow>
              ) : (
                approvedTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      {teacher.firstName} {teacher.lastName}
                    </TableCell>
                    <TableCell>{teacher.user.email}</TableCell>
                    <TableCell>{teacher.school}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{teacher.Classroom.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {teacher.Classroom.reduce(
                        (total, classroom) => total + classroom.students.length,
                        0
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approuvé
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleApprovalChange(teacher.id, false)
                            }
                            className="text-orange-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Révoquer l'approbation
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
