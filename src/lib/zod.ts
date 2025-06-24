import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
  );

export const studentSignUpSchema = z.object({
  email: z.string().email("Email invalide"),
  password: passwordSchema,
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  age: z
    .number()
    .min(5, "L'âge minimum est de 5 ans")
    .max(100, "L'âge maximum est de 100 ans"),
  classCode: z.string().optional(),
});

export const teacherSignUpSchema = z.object({
  email: z.string().email("Email invalide"),
  password: passwordSchema,
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  voterId: z.string().min(1, "Le numéro de carte d'électeur est requis"),
  teachingLevel: z.enum(["primaire", "secondaire", "superieur"], {
    required_error: "Le niveau d'enseignement est requis",
  }),
  schoolName: z.string().min(2, "Le nom de l'établissement est requis"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type StudentSignUpFormData = z.infer<typeof studentSignUpSchema>;
export type TeacherSignUpFormData = z.infer<typeof teacherSignUpSchema>;
