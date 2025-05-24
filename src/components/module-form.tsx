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
import { createModule, updateModule } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
})

export function ModuleForm({ module = null }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: module
      ? {
          title: module.title,
          description: module.description,
        }
      : {
          title: "",
          description: "",
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (module) {
        await updateModule(module.id, values)
        toast({
          title: "Module updated",
          description: "The module has been successfully updated.",
        })
      } else {
        await createModule(values)
        toast({
          title: "Module created",
          description: "The module has been successfully created.",
        })
      }
      router.push("/dashboard/modules")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${module ? "update" : "create"} module. Please try again.`,
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
                <Input placeholder="Introduction to Mathematics" {...field} />
              </FormControl>
              <FormDescription>The title of the module as it will appear to users.</FormDescription>
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
                <Textarea
                  placeholder="A comprehensive introduction to basic mathematical concepts..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide a detailed description of what this module covers.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/modules")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : module ? "Update Module" : "Create Module"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
