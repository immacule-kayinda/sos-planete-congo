"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StudentActions } from "./student-actions";
import { Search, Mail, School } from "lucide-react";

interface Student {
  id: string;
  firstName: string | null;
  lastName: string | null;
  accountStatus: string;
  classroomName: string;
  classroomCode: string;
  totalStars: number;
  avgAccuracy: number;
  completedChapters: number;
  totalChapters: number;
  user: {
    email: string;
    createdAt: Date;
  };
}

interface Classroom {
  id: string;
  name: string;
}

interface StudentsManagementProps {
  students: Student[];
  classrooms: Classroom[];
}

export function StudentsManagement({
  students,
  classrooms,
}: StudentsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classroomFilter, setClassroomFilter] = useState("all");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        (student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.classroomName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || student.accountStatus === statusFilter;
      const matchesClassroom =
        classroomFilter === "all" || student.classroomName === classroomFilter;

      return matchesSearch && matchesStatus && matchesClassroom;
    });
  }, [students, searchTerm, statusFilter, classroomFilter]);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleStatusUpdate = () => {
    // Refresh the page to show updated data
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Input
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Statut du compte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="ACTIVE">Actif</SelectItem>
            <SelectItem value="PENDING_ACTIVATION">En Attente</SelectItem>
            <SelectItem value="LIMITED_ACCESS">Accès Limité</SelectItem>
          </SelectContent>
        </Select>

        <Select value={classroomFilter} onValueChange={setClassroomFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les classes</SelectItem>
            {classrooms.map((classroom) => (
              <SelectItem key={classroom.id} value={classroom.name}>
                {classroom.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        {filteredStudents.length} étudiant
        {filteredStudents.length > 1 ? "s" : ""} trouvé
        {filteredStudents.length > 1 ? "s" : ""}
        {(searchTerm ||
          statusFilter !== "all" ||
          classroomFilter !== "all") && (
          <span> sur {students.length} au total</span>
        )}
      </div>

      {/* Students Table */}
      {filteredStudents.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Étoiles</TableHead>
                <TableHead>Précision</TableHead>
                <TableHead>Inscrit le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const progressPercentage =
                  student.totalChapters > 0
                    ? Math.round(
                        (student.completedChapters / student.totalChapters) *
                          100
                      )
                    : 0;

                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                            {student.firstName?.[0] || "U"}
                            {student.lastName?.[0] || ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {student.firstName || "Non renseigné"}{" "}
                            {student.lastName || ""}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {student.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <School size={14} className="text-gray-400" />
                        <span className="text-sm">{student.classroomName}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Code: {student.classroomCode}
                      </p>
                    </TableCell>
                    <TableCell>
                      <StudentActions
                        studentId={student.id}
                        currentStatus={student.accountStatus}
                        studentName={`${student.firstName || "Étudiant"} ${student.lastName || ""}`}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              progressPercentage >= 80
                                ? "bg-green-500"
                                : progressPercentage >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${getProgressColor(progressPercentage)}`}
                        >
                          {progressPercentage}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {student.completedChapters}/{student.totalChapters}{" "}
                        chapitres
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium">
                          {student.totalStars}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${getProgressColor(student.avgAccuracy)}`}
                      >
                        {student.avgAccuracy}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {new Date(student.user.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      {/* Actions are now handled by StudentActions component */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500 mb-2">
            {searchTerm || statusFilter !== "all" || classroomFilter !== "all"
              ? "Aucun étudiant ne correspond aux critères de recherche"
              : "Aucun étudiant inscrit"}
          </p>
          {(searchTerm ||
            statusFilter !== "all" ||
            classroomFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setClassroomFilter("all");
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}
