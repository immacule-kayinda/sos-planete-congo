"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Le nom doit contenir au moins 3 caractères." }),
  classCode: z
    .string()
    .min(4, {
      message: "Le code de classe doit contenir au moins 4 caractères.",
    })
    .max(10, {
      message: "Le code de classe ne peut pas dépasser 10 caractères.",
    }),
  teacherId: z.string().min(1, { message: "L'enseignant est requis." }),
});

type ClassroomData = {
  id: string;
  name: string;
  classCode: string;
  teacherId: string | null;
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  students?: {
    id: string;
  }[];
};

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
};

type ClassroomFormProps = {
  classroom?: ClassroomData | null;
};

export function ClassroomForm({ classroom = null }: ClassroomFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: classroom
      ? {
          name: classroom.name,
          classCode: classroom.classCode,
          teacherId: classroom.teacherId || "",
        }
      : {
          name: "",
          classCode: "",
          teacherId: "",
        },
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers?approved=true");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Erreur lors du chargement des enseignants");
    } finally {
      setLoadingTeachers(false);
    }
  };

  const generateClassCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    form.setValue("classCode", code);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        classroom ? `/api/classrooms/${classroom.id}` : "/api/classrooms",
        {
          method: classroom ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la sauvegarde");
      }

      toast.success(
        classroom
          ? "Classe mise à jour avec succès"
          : "Classe créée avec succès"
      );
      router.refresh();
      router.push("/dashboard/classrooms");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Classroom submission error:", error);
        toast.error(error.message || "Une erreur est survenue");
      } else {
        console.error("Classroom submission error:", error);
        toast.error("Une erreur est survenue");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la classe</FormLabel>
              <FormControl>
                <Input placeholder="Classe de CM2 A" {...field} />
              </FormControl>
              <FormDescription>
                Le nom de la classe tel qu'il apparaîtra aux utilisateurs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code de classe</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="ABC123" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateClassCode}
                >
                  Générer
                </Button>
              </div>
              <FormDescription>
                Code unique que les élèves utiliseront pour rejoindre la classe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enseignant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingTeachers
                          ? "Chargement..."
                          : "Sélectionner un enseignant"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                L'enseignant responsable de cette classe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/classrooms")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Sauvegarde..."
              : classroom
                ? "Mettre à jour"
                : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
