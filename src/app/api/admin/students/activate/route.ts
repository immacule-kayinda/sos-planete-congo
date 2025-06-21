import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Vérifier que l'utilisateur est admin
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { studentId, accountStatus } = body;

    if (!studentId || !accountStatus) {
      return NextResponse.json(
        { message: "ID étudiant et statut du compte requis" },
        { status: 400 }
      );
    }

    // Valider le statut
    if (
      !["ACTIVE", "LIMITED_ACCESS", "PENDING_ACTIVATION"].includes(
        accountStatus
      )
    ) {
      return NextResponse.json(
        { message: "Statut de compte invalide" },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de l'étudiant
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        accountStatus,
        // Si on active le compte complètement et qu'il n'a pas d'accès classe, on garde hasClassroomAccess à false
        hasClassroomAccess: accountStatus === "ACTIVE" ? false : false,
      },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    return NextResponse.json({
      message: "Statut du compte mis à jour avec succès",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Erreur lors de l'activation du compte:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'activation du compte" },
      { status: 500 }
    );
  }
}

// Endpoint pour lister les étudiants en attente d'activation
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const students = await prisma.student.findMany({
      where: {
        accountStatus: "PENDING_ACTIVATION",
      },
      include: {
        user: {
          select: { email: true, createdAt: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des étudiants" },
      { status: 500 }
    );
  }
}
