"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const sectionSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  order: z.number().min(1, "L'ordre doit être supérieur à 0"),
  quizId: z.string().min(1, "Le quiz est requis"),
});

type SectionFormValues = z.infer<typeof sectionSchema>;

interface SectionFormProps {
  section?: {
    id: string;
    title: string;
    description: string;
    order: number;
    quizId: string;
  };
}

export function SectionForm({ section }: SectionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: section || {
      title: "",
      description: "",
      order: 1,
      quizId: "",
    },
  });

  const onSubmit = async (data: SectionFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        section ? `/api/sections/${section.id}` : "/api/sections",
        {
          method: section ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      toast.success(
        section
          ? "Section mise à jour avec succès"
          : "Section créée avec succès"
      );
      router.refresh();
      router.push("/dashboard/sections");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Description de la section pour les étudiants.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ordre</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Ordre d'affichage de la section.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quizId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                L'ID du quiz associé à cette section.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/sections")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Sauvegarde..."
              : section
              ? "Mettre à jour"
              : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
