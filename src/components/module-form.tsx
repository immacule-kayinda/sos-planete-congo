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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit contenir au moins 3 caractères." }),
  subtitle: z.string().min(10, {
    message: "Le sous-titre doit contenir au moins 10 caractères.",
  }),
  sectionId: z.string().min(1, { message: "La section est requise." }),
  order: z.number().min(1, { message: "L'ordre doit être supérieur à 0." }),
});

type ModuleData = {
  id: string;
  title: string;
  subtitle: string;
  sectionId: string;
  order: number;
  section?: {
    id: string;
    title: string;
  };
  chapters?: {
    id: string;
    title: string;
  }[];
};

type Section = {
  id: string;
  title: string;
};

type ModuleFormProps = {
  module?: ModuleData | null;
};

export function ModuleForm({ module = null }: ModuleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loadingSections, setLoadingSections] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: module
      ? {
          title: module.title,
          subtitle: module.subtitle,
          sectionId: module.sectionId,
          order: module.order,
        }
      : {
          title: "",
          subtitle: "",
          sectionId: "",
          order: 1,
        },
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/sections");
      if (!response.ok) throw new Error("Failed to fetch sections");
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Erreur lors du chargement des sections");
    } finally {
      setLoadingSections(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        module ? `/api/modules/${module.id}` : "/api/modules",
        {
          method: module ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      toast.success(
        module ? "Module mis à jour avec succès" : "Module créé avec succès"
      );
      router.refresh();
      router.push("/dashboard/modules");
    } catch (error) {
      console.error("Module submission error:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduction aux Mathématiques"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Le titre du module tel qu'il apparaîtra aux utilisateurs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sous-titre</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Une introduction complète aux concepts mathématiques de base..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Fournissez une description détaillée de ce que couvre ce module.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingSections
                          ? "Chargement..."
                          : "Sélectionner une section"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                La section à laquelle appartient ce module.
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
                Ordre d'affichage du module dans la section.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/modules")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Sauvegarde..."
              : module
              ? "Mettre à jour"
              : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
