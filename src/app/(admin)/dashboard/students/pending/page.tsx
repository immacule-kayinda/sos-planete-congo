"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Mail,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface PendingStudent {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  classCode: string | null;
  accountStatus: string;
  hasClassroomAccess: boolean;
  createdAt: Date;
  user: {
    email: string;
    createdAt: Date;
  };
}

export default function PendingStudentsPage() {
  const [students, setStudents] = useState<PendingStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  const fetchPendingStudents = async () => {
    try {
      const response = await fetch("/api/admin/students/activate");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching pending students:", error);
      toast.error("Erreur lors du chargement des étudiants");
    } finally {
      setLoading(false);
    }
  };

  const updateStudentStatus = async (studentId: string, newStatus: string) => {
    setUpdating(studentId);
    try {
      const response = await fetch("/api/admin/students/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          accountStatus: newStatus,
        }),
      });

      if (!response.ok) throw new Error("Failed to update student status");

      const data = await response.json();
      toast.success(data.message);

      // Retirer l'étudiant de la liste s'il n'est plus en attente
      if (newStatus !== "PENDING_ACTIVATION") {
        setStudents(students.filter((s) => s.id !== studentId));
      }
    } catch (error) {
      console.error("Error updating student status:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING_ACTIVATION":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        );
      case "ACTIVE":
        return (
          <Badge variant="default">
            <CheckCircle className="mr-1 h-3 w-3" />
            Actif
          </Badge>
        );
      case "LIMITED_ACCESS":
        return (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" />
            Accès limité
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Étudiants en attente d'activation
          </h1>
          <p className="text-muted-foreground">
            Gérez les comptes étudiants nécessitant une activation manuelle
          </p>
        </div>
        <Button onClick={fetchPendingStudents} variant="outline">
          Actualiser
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Étudiants en attente ({students.length})
          </CardTitle>
          <CardDescription>
            Ces étudiants se sont inscrits sans code de classe valide et
            attendent l'activation manuelle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Aucun étudiant en attente</p>
              <p className="text-muted-foreground">
                Tous les étudiants ont été traités ou se sont inscrits avec un
                code de classe valide
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Âge</TableHead>
                  <TableHead>Code de classe</TableHead>
                  <TableHead>Inscrit le</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.firstName || "N/A"} {student.lastName || ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {student.user.email}
                      </div>
                    </TableCell>
                    <TableCell>{student.age} ans</TableCell>
                    <TableCell>
                      {student.classCode ? (
                        <Badge variant="outline" className="font-mono">
                          {student.classCode}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">Aucun</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(student.user.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.accountStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) =>
                            updateStudentStatus(student.id, value)
                          }
                          disabled={updating === student.id}
                        >
                          <SelectTrigger className="w-32 h-8 text-sm">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE" className="text-sm">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Activer
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="LIMITED_ACCESS"
                              className="text-sm"
                            >
                              <div className="flex items-center gap-1">
                                <XCircle className="h-3 w-3 text-orange-500" />
                                Limité
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {updating === student.id && (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <span className="text-sm">Mise à jour...</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
