import { useRef, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "../ui/button";
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
import { studentSignUpSchema, type StudentSignUpFormData } from "@/lib/zod";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";

export default function StudentSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<StudentSignUpFormData>({
    resolver: zodResolver(studentSignUpSchema),
    defaultValues: {
      age: undefined,
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (formData: StudentSignUpFormData) => {
    try {
      const res = await fetch("/api/auth/register/student", {
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
      // Connexion automatique après l'inscription
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: "/learn",
      });
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 **:placeholder:text-base **:h-auto"
        >
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    ref={inputRef}
                    type="number"
                    max={500}
                    min={0}
                    placeholder="Age"
                    className="w-full px-4 py-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
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
                    className="w-full px-4 py-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      className="w-full px-4 py-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg pr-12"
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
    </>
  );
}
