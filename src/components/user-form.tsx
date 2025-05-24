"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createUser } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule." })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une lettre minuscule." })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." }),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"], {
    required_error: "Veuillez sélectionner un rôle.",
  }),
  isActive: z.boolean().default(true),
  isEmailVerified: z.boolean().default(false),
})

export function UserForm({ user = null }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          email: user.email,
          password: "",
          role: user.role,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
        }
      : {
          email: "",
          password: "",
          role: "STUDENT",
          isActive: true,
          isEmailVerified: false,
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // In a real app, this would call a server action to create/update the user
      await createUser(values)
      toast({
        title: user ? "Utilisateur mis à jour" : "Utilisateur créé",
        description: user ? "L'utilisateur a été mis à jour avec succès." : "L'utilisateur a été créé avec succès.",
      })
      router.push("/dashboard/users")
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Échec de la ${user ? "mise à jour" : "création"} de l'utilisateur. Veuillez réessayer.`,
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormDescription>Ceci sera utilisé comme nom d'utilisateur pour la connexion.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{user ? "Nouveau mot de passe" : "Mot de passe"}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>
                {user
                  ? "Laissez vide pour conserver le mot de passe actuel."
                  : "Doit contenir au moins 8 caractères avec des majuscules, des minuscules et des chiffres."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="TEACHER">Enseignant</SelectItem>
                  <SelectItem value="STUDENT">Étudiant</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Détermine les permissions et le niveau d'accès de l'utilisateur.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 flex-1">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Actif</FormLabel>
                  <FormDescription>Les utilisateurs inactifs ne peuvent pas se connecter à la plateforme.</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEmailVerified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 flex-1">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Email vérifié</FormLabel>
                  <FormDescription>Cochez comme vérifié pour contourner le processus de vérification par email.</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/users")}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : user ? "Mettre à jour l'utilisateur" : "Créer un utilisateur"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
