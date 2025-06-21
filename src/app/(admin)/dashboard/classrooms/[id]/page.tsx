"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Users,
  UserPlus,
  GraduationCap,
  School,
  Calendar,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
}

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
  phoneNumber: string;
  email: string;
}

interface Classroom {
  id: string;
  name: string;
  classCode: string;
  createdAt: Date;
  Teacher: Teacher;
  students: Student[];
}

export default function ClassroomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [isChangingTeacher, setIsChangingTeacher] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);

  const fetchClassroom = useCallback(async () => {
    try {
      const response = await fetch(`/api/classrooms/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch classroom");
      const data = await response.json();
      setClassroom(data);
    } catch (error) {
      console.error("Error fetching classroom:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement de la classe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id, toast]);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await fetch("/api/teachers?approved=true");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des enseignants",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchClassroom();
    fetchTeachers();
  }, [fetchClassroom, fetchTeachers]);

  const handleChangeTeacher = async () => {
    if (!selectedTeacherId) return;

    setIsChangingTeacher(true);
    try {
      const response = await fetch(`/api/classrooms/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId: selectedTeacherId }),
      });

      if (!response.ok) throw new Error("Failed to update classroom");

      const updatedClassroom = await response.json();
      setClassroom(updatedClassroom);
      toast({
        title: "Succès",
        description: "Responsable de classe mis à jour avec succès",
        variant: "default",
      });
      setShowTeacherDialog(false);
      setSelectedTeacherId("");
    } catch (error) {
      console.error("Error updating classroom:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du responsable",
        variant: "destructive",
      });
    } finally {
      setIsChangingTeacher(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Classe non trouvée</h2>
        <Button onClick={() => router.push("/dashboard/classrooms")}>
          Retour aux classes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/classrooms")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {classroom.name}
            </h1>
            <p className="text-muted-foreground">
              Détails et informations de la classe
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/classrooms/${params.id}/students`}>
            <Users className="mr-2 h-4 w-4" />
            Gérer les élèves
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la classe</CardTitle>
            <CardDescription>Détails généraux de la classe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Code de classe</p>
                <Badge variant="secondary" className="font-mono">
                  {classroom.classCode}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Créée le</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(classroom.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nombre d'élèves</p>
                <p className="text-sm text-muted-foreground">
                  {classroom.students.length} élèves
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Enseignant responsable</CardTitle>
                <CardDescription>
                  Informations sur l'enseignant en charge
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTeacherId(classroom.Teacher?.id || "");
                  setShowTeacherDialog(true);
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {classroom.Teacher ? "Changer" : "Assigner"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {classroom.Teacher ? (
              <>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Nom</p>
                    <p className="text-sm text-muted-foreground">
                      {classroom.Teacher.firstName} {classroom.Teacher.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">École</p>
                    <p className="text-sm text-muted-foreground">
                      {classroom.Teacher.school}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">
                      {classroom.Teacher.phoneNumber}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  Aucun enseignant assigné à cette classe
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des élèves</CardTitle>
          <CardDescription>
            Les élèves inscrits dans cette classe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Âge</TableHead>
                <TableHead>Inscrit le</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classroom.students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Aucun élève inscrit
                  </TableCell>
                </TableRow>
              ) : (
                classroom.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell>{student.age} ans</TableCell>
                    <TableCell>
                      {new Date(student.createdAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showTeacherDialog} onOpenChange={setShowTeacherDialog}>
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
                onClick={() => setShowTeacherDialog(false)}
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
