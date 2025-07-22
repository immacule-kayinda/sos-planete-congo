import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { teacherSignUpSchema, type TeacherSignUpFormData } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TeacherSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TeacherSignUpFormData>({
    resolver: zodResolver(teacherSignUpSchema),
    defaultValues: {
      name: "",
      voterId: "",
      email: "",
      teachingLevel: undefined,
      schoolName: "",
      password: "",
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (formData: TeacherSignUpFormData) => {
    try {
      const res = await fetch("/api/auth/register/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Une erreur est survenue", {
          action: {
            label: "Fermer",
            onClick() {
              console.log("Fermer");
            },
          },
        });
        return;
      }

      toast.success("Inscription réussie !");
      // Rediriger ou faire autre chose après l'inscription réussie
    } catch (error) {
      toast.error(
        `Une erreur est survenue lors de l'inscription: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 **:placeholder:text-base **:h-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="teacher-name"
                className="text-base text-gray-700 font-semibold mb-1"
              >
                Nom complet
              </label>
              <FormControl>
                <Input
                  {...field}
                  id="teacher-name"
                  ref={inputRef}
                  type="text"
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 h-auto border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voterId"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="teacher-voterId"
                className="text-base text-gray-700 font-semibold mb-1"
              >
                Numéro de carte d'électeur
              </label>
              <FormControl>
                <Input
                  {...field}
                  id="teacher-voterId"
                  type="text"
                  placeholder="Numero de carte d'electeur"
                  className="w-full px-4 py-3 border h-auto border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="teacher-email"
                className="text-base text-gray-700 font-semibold mb-1"
              >
                Email
              </label>
              <FormControl>
                <Input
                  {...field}
                  id="teacher-email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border h-auto focus-visible: border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 h-12">
          <FormField
            control={form.control}
            name="teachingLevel"
            render={({ field }) => (
              <FormItem className="flex-1">
                <label
                  htmlFor="teacher-teachingLevel"
                  className="text-base text-gray-700 font-semibold mb-1"
                >
                  Niveau d'enseignement
                </label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="text-base h-auto adaptive"
                      id="teacher-teachingLevel"
                    >
                      <SelectValue placeholder="Niveau d'enseignement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Niveau d'enseignement</SelectLabel>
                      <SelectItem value="primaire">Primaire</SelectItem>
                      <SelectItem value="secondaire">Secondaire</SelectItem>
                      <SelectItem value="superieur">Superieur</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <label
                  htmlFor="teacher-schoolName"
                  className="text-base text-gray-700 font-semibold mb-1"
                >
                  Nom de l'établissement
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="teacher-schoolName"
                    type="text"
                    placeholder="Nom de l'etablissement"
                    className="flex-1 px-4 py-3 border h-auto border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="teacher-password"
                className="text-base text-gray-700 font-semibold mb-1"
              >
                Mot de passe
              </label>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="teacher-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-3 border h-auto border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FiEye size={22} />
                    ) : (
                      <FiEyeOff size={22} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg text-xl mt-2 transition h-13"
        >
          S'inscrire
        </Button>
        <p className="text-sm text-muted-foreground">
          En vous inscrivant, vous acceptez nos{" "}
          <a href="/terms" className="text-primary underline">
            conditions d&apos;utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy" className="text-primary underline">
            politique de confidentialité
          </a>
          .
        </p>
        {/* <p className="text-sm text-muted-foreground">
          Vous recevrez un email de confirmation à l&apos;adresse fournie.
        </p> */}
      </form>
    </Form>
  );
}
