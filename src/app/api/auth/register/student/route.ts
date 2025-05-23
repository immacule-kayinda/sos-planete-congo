import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { studentSignUpSchema } from "@/lib/zod";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = studentSignUpSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: parseResult.error.errors },
        { status: 400 }
      );
    }
    const { email, name, password, age } = parseResult.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT",
        student: {
          create: {
            age,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
