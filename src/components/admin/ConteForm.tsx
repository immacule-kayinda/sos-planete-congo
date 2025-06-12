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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const conteSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  audioUrl: z.string().min(1, "L'URL audio est requise"),
  pages: z.array(
    z.object({
      imageUrl: z.string().min(1, "L'URL de l'image est requise"),
      caption: z.string().min(1, "La légende est requise"),
      duration: z.number().min(100, "La durée minimale est de 100ms"),
      order: z.number(),
    })
  ),
});

type ConteFormValues = z.infer<typeof conteSchema>;

interface ConteFormProps {
  initialData?: {
    id: string;
    title: string;
    audioUrl: string;
    pages: {
      id: string;
      imageUrl: string;
      caption: string;
      duration: number;
      order: number;
    }[];
  };
}

export function ConteForm({ initialData }: ConteFormProps) {
  const router = useRouter();
  const form = useForm<ConteFormValues>({
    resolver: zodResolver(conteSchema),
    defaultValues: initialData || {
      title: "",
      audioUrl: "",
      pages: [{ imageUrl: "", caption: "", duration: 1000, order: 0 }],
    },
  });

  const onSubmit = async (data: ConteFormValues) => {
    try {
      const response = await fetch(
        initialData ? `/api/stories/${initialData.id}` : "/api/stories",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      toast.success(
        initialData ? "Conte mis à jour avec succès" : "Conte créé avec succès"
      );
      router.refresh();
      router.push("/admin/stories");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
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
          name="audioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Audio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("pages").map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name={`pages.${index}.imageUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Image {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`pages.${index}.caption`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Légende {index + 1}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`pages.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée (ms) {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const pages = form.getValues("pages");
                form.setValue(
                  "pages",
                  pages.filter((_, i) => i !== index)
                );
              }}
            >
              Supprimer cette page
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => {
            const pages = form.getValues("pages");
            form.setValue("pages", [
              ...pages,
              {
                imageUrl: "",
                caption: "",
                duration: 1000,
                order: pages.length,
              },
            ]);
          }}
        >
          Ajouter une page
        </Button>

        <Button type="submit">{initialData ? "Mettre à jour" : "Créer"}</Button>
      </form>
    </Form>
  );
}
