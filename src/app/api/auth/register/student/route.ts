import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { studentSignUpSchema } from "@/lib/zod";
import { NextResponse } from "next/server";
import { StudentAccountStatus } from "../../../../../../generated/prisma";

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
    const { email, password, name, age, classCode } = parseResult.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    // Séparer le prénom et nom
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    let accountStatus: StudentAccountStatus =
      StudentAccountStatus.PENDING_ACTIVATION;
    let hasClassroomAccess = false;
    let classroomId = null;

    // Vérifier si un code de classe a été fourni
    if (classCode && classCode.trim() !== "") {
      const classroom = await prisma.classroom.findUnique({
        where: { classCode: classCode.trim() },
      });

      if (classroom) {
        // Code de classe valide - activer automatiquement le compte
        accountStatus = StudentAccountStatus.ACTIVE;
        hasClassroomAccess = true;
        classroomId = classroom.id;
      } else {
        return NextResponse.json(
          { message: "Code de classe invalide" },
          { status: 400 }
        );
      }
    } else {
      // Pas de code de classe - accès limité
      accountStatus = StudentAccountStatus.LIMITED_ACCESS;
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT",
        student: {
          create: {
            firstName,
            lastName,
            age,
            classCode: classCode || null,
            accountStatus,
            hasClassroomAccess,
            classroomId,
          },
        },
      },
    });

    let message = "Utilisateur créé avec succès";
    if (classCode && accountStatus === StudentAccountStatus.ACTIVE) {
      message +=
        ". Votre compte est automatiquement activé car vous avez fourni un code de classe valide.";
    } else if (!classCode) {
      message +=
        ". Votre accès est limité au premier conte en attendant l'activation manuelle de votre compte.";
    }

    return NextResponse.json({ message, accountStatus }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
