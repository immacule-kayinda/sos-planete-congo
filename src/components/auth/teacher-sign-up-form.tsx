import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  StudentSignUpFormData,
  teacherSignUpSchema,
  type TeacherSignUpFormData,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  SelectTrigger,
  SelectGroup,
  Select,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { toast } from "sonner";

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
      toast.error("Une erreur est survenue lors de l'inscription");
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
              <FormControl>
                <Input
                  {...field}
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
              <FormControl>
                <Input
                  {...field}
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
              <FormControl>
                <Input
                  {...field}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-base h-auto adaptive py-6">
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
                <FormControl>
                  <Input
                    {...field}
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
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
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
      </form>
    </Form>
  );
}
