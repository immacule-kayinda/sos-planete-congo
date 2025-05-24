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
import { createChapter, updateChapter } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

// Mock modules for the select dropdown
const mockModules = [
  { id: "1", title: "Introduction to Mathematics" },
  { id: "2", title: "French Grammar" },
  { id: "3", title: "Science Basics" },
  { id: "4", title: "History of Africa" },
]

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  moduleId: z.string({ required_error: "Please select a module." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
})

export function ChapterForm({ chapter = null }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: chapter
      ? {
          title: chapter.title,
          moduleId: chapter.moduleId,
          content: chapter.content,
        }
      : {
          title: "",
          moduleId: "",
          content: "",
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (chapter) {
        await updateChapter(chapter.id, values)
        toast({
          title: "Chapter updated",
          description: "The chapter has been successfully updated.",
        })
      } else {
        await createChapter(values)
        toast({
          title: "Chapter created",
          description: "The chapter has been successfully created.",
        })
      }
      router.push("/dashboard/chapters")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${chapter ? "update" : "create"} chapter. Please try again.`,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Numbers and Counting" {...field} />
              </FormControl>
              <FormDescription>The title of the chapter as it will appear to users.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>The module this chapter belongs to.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="In this chapter, we will explore..." className="min-h-64" {...field} />
              </FormControl>
              <FormDescription>The educational content of this chapter.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/chapters")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : chapter ? "Update Chapter" : "Create Chapter"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
