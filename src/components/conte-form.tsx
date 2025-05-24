"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createConte, updateConte } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

// Mock modules for the select dropdown
const mockModules = [
  { id: "1", title: "Introduction to Mathematics" },
  { id: "2", title: "French Grammar" },
  { id: "3", title: "Science Basics" },
  { id: "4", title: "History of Africa" },
]

const formSchema = z.object({
  moduleId: z.string({ required_error: "Please select a module." }),
  text: z.string().min(50, { message: "Text must be at least 50 characters." }),
  audioUrl: z.string().url({ message: "Please enter a valid URL for the audio file." }).optional().or(z.literal("")),
  imagesUrls: z.string().optional(),
})

export function ConteForm({ conte = null }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: conte
      ? {
          moduleId: conte.moduleId,
          text: conte.text,
          audioUrl: conte.audioUrl || "",
          imagesUrls: conte.imagesUrls ? conte.imagesUrls.join("\n") : "",
        }
      : {
          moduleId: "",
          text: "",
          audioUrl: "",
          imagesUrls: "",
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Process imagesUrls from newline-separated string to array
      const processedValues = {
        ...values,
        imagesUrls: values.imagesUrls ? values.imagesUrls.split("\n").filter((url) => url.trim() !== "") : [],
      }

      if (conte) {
        await updateConte(conte.id, processedValues)
        toast({
          title: "Conte updated",
          description: "The conte has been successfully updated.",
        })
      } else {
        await createConte(processedValues)
        toast({
          title: "Conte created",
          description: "The conte has been successfully created.",
        })
      }
      router.push("/dashboard/contes")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${conte ? "update" : "create"} conte. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockModules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The module this conte belongs to.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Once upon a time..." className="min-h-64" {...field} />
              </FormControl>
              <FormDescription>The story text of this conte.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audio URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/audio.mp3" {...field} />
              </FormControl>
              <FormDescription>URL to the audio narration of this conte (optional).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagesUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URLs</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter one image URL per line for illustrations (optional).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/contes")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : conte ? "Update Conte" : "Create Conte"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
