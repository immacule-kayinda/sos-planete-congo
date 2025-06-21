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
import { FileUpload } from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

const conteSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  audioUrl: z.string().min(1, "Le fichier audio est requis"),
  sectionId: z.string().min(1, "La section est requise"),
  pages: z.array(
    z.object({
      imageUrl: z.string().min(1, "L'image est requise"),
      caption: z.string().min(1, "La légende est requise"),
      duration: z.number().min(100, "La durée minimale est de 100ms"),
      order: z.number(),
    })
  ),
});

type ConteFormValues = z.infer<typeof conteSchema>;

interface ConteFormProps {
  conte?: {
    id: string;
    title: string;
    audioUrl: string;
    sectionId: string;
    pages: {
      id: string;
      imageUrl: string;
      caption: string;
      duration: number;
      order: number;
    }[];
  };
}

export function ConteForm({ conte }: ConteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<number[]>([]);

  const form = useForm<ConteFormValues>({
    resolver: zodResolver(conteSchema),
    defaultValues: conte || {
      title: "",
      audioUrl: "",
      sectionId: "",
      pages: [{ imageUrl: "", caption: "", duration: 5000, order: 0 }],
    },
  });

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const handleAudioUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setUploadingAudio(true);
    try {
      const audioUrl = await uploadFile(files[0]);
      form.setValue("audioUrl", audioUrl);
      toast.success("Audio uploadé avec succès");
    } catch {
      toast.error("Erreur lors de l'upload de l'audio");
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleImageUpload = async (files: File[], pageIndex: number) => {
    if (files.length === 0) return;

    setUploadingImages((prev) => [...prev, pageIndex]);
    try {
      const imageUrl = await uploadFile(files[0]);
      form.setValue(`pages.${pageIndex}.imageUrl`, imageUrl);
      toast.success("Image uploadée avec succès");
    } catch {
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImages((prev) => prev.filter((i) => i !== pageIndex));
    }
  };

  const onSubmit = async (data: ConteFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        conte ? `/api/stories/${conte.id}` : "/api/stories",
        {
          method: conte ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      toast.success(
        conte ? "Conte mis à jour avec succès" : "Conte créé avec succès"
      );
      router.refresh();
      router.push("/dashboard/contes");
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
          name="sectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                L'ID de la section à laquelle appartient ce conte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fichier Audio</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <FileUpload
                    accept="audio/*"
                    onFileSelect={handleAudioUpload}
                    placeholder={
                      uploadingAudio
                        ? "Upload en cours..."
                        : "Sélectionner un fichier audio"
                    }
                    value={field.value ? [field.value] : []}
                  />
                  {field.value && (
                    <audio controls className="w-full">
                      <source src={field.value} />
                    </audio>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Fichier audio de narration du conte (MP3, WAV, etc.).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Pages du conte</h3>
          {form.watch("pages").map((_, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Page {index + 1}</h4>

              <FormField
                control={form.control}
                name={`pages.${index}.imageUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <FileUpload
                          accept="image/*"
                          onFileSelect={(files) =>
                            handleImageUpload(files, index)
                          }
                          placeholder={
                            uploadingImages.includes(index)
                              ? "Upload en cours..."
                              : "Sélectionner une image"
                          }
                          value={field.value ? [field.value] : []}
                        />
                        {field.value && (
                          <Image
                            src={field.value}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="object-cover rounded"
                          />
                        )}
                      </div>
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
                    <FormLabel>Légende</FormLabel>
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
                    <FormLabel>Durée (millisecondes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Durée d'affichage de cette page en millisecondes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("pages").length > 1 && (
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
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const pages = form.getValues("pages");
              form.setValue("pages", [
                ...pages,
                {
                  imageUrl: "",
                  caption: "",
                  duration: 5000,
                  order: pages.length,
                },
              ]);
            }}
          >
            Ajouter une page
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/contes")}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting || uploadingAudio || uploadingImages.length > 0
            }
          >
            {isSubmitting ? "Sauvegarde..." : conte ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
