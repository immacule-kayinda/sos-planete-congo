"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Search,
  Copy,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
}

interface Classroom {
  id: string;
  name: string;
  classCode: string;
  teacherId: string | null;
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    school: string;
  };
  students: {
    id: string;
  }[];
  createdAt: Date;
}

export function ClassroomTable() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [isChangingTeacher, setIsChangingTeacher] = useState(false);

  useEffect(() => {
    fetchClassrooms();
    fetchTeachers();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch("/api/classrooms");
      if (!response.ok) throw new Error("Failed to fetch classrooms");
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      toast.error("Erreur lors du chargement des classes");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers?approved=true");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Erreur lors du chargement des enseignants");
    }
  };

  const handleChangeTeacher = async () => {
    if (!selectedClassroom || !selectedTeacherId) return;

    setIsChangingTeacher(true);
    try {
      const response = await fetch(`/api/classrooms/${selectedClassroom.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId: selectedTeacherId }),
      });

      if (!response.ok) throw new Error("Failed to update classroom");

      const updatedClassroom = await response.json();
      setClassrooms(
        classrooms.map((c) =>
          c.id === selectedClassroom.id ? updatedClassroom : c
        )
      );
      toast.success("Responsable de classe mis à jour avec succès");
      setSelectedClassroom(null);
      setSelectedTeacherId("");
    } catch (error) {
      console.error("Error updating classroom:", error);
      toast.error("Erreur lors de la mise à jour du responsable");
    } finally {
      setIsChangingTeacher(false);
    }
  };

  const handleDeleteClassroom = async (classroomId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette classe ?")) return;

    try {
      const response = await fetch(`/api/classrooms/${classroomId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete classroom");

      setClassrooms(
        classrooms.filter((classroom) => classroom.id !== classroomId)
      );
      toast.success("Classe supprimée avec succès");
    } catch (error) {
      console.error("Error deleting classroom:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const copyClassCode = async (classCode: string) => {
    try {
      await navigator.clipboard.writeText(classCode);
      toast.success("Code de classe copié !");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la copie");
    }
  };

  // Filter classrooms based on search term
  const filteredClassrooms = classrooms.filter(
    (classroom) =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.classCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (classroom.teacher &&
        `${classroom.teacher.firstName} ${classroom.teacher.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des classes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Enseignant</TableHead>
              <TableHead>École</TableHead>
              <TableHead>Élèves</TableHead>
              <TableHead>Créée le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClassrooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucune classe trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredClassrooms.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell className="font-medium">
                    {classroom.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">
                        {classroom.classCode}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyClassCode(classroom.classCode)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {classroom.teacher ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>
                          {classroom.teacher.firstName}{" "}
                          {classroom.teacher.lastName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>{classroom.teacher?.school || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{classroom.students.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(classroom.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/classrooms/${classroom.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/classrooms/${classroom.id}/students`}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Gérer les élèves
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => copyClassCode(classroom.classCode)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier le code
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedClassroom(classroom);
                            setSelectedTeacherId(classroom.teacherId || "");
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Changer le responsable
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClassroom(classroom.id)}
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

      <Dialog
        open={!!selectedClassroom}
        onOpenChange={() => setSelectedClassroom(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le responsable de la classe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enseignant</label>
              <Select
                value={selectedTeacherId}
                onValueChange={setSelectedTeacherId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un enseignant" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedClassroom(null)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleChangeTeacher}
                disabled={isChangingTeacher || !selectedTeacherId}
              >
                {isChangingTeacher ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
