import { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
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
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  ref={inputRef}
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
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-red-600 text-lg pr-12"
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
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
