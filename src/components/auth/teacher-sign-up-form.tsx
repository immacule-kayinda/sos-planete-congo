import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { teacherSignUpSchema, type TeacherSignUpFormData } from "@/lib/validations/auth";

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

  const onSubmit = async (data: TeacherSignUpFormData) => {
    try {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 **:placeholder:text-base **:h-auto">
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
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
