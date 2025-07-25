import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../../auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "TEACHER") {
      return NextResponse.json(
        {
          message:
            "Accès refusé - Seuls les professeurs peuvent approuver des étudiants",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["ACTIVE", "LIMITED_ACCESS", "PENDING_ACTIVATION"].includes(status)) {
      return NextResponse.json({ message: "Statut invalide" }, { status: 400 });
    }

    // Vérifier que l'enseignant est approuvé
    const teacher = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      select: { id: true, isApproved: true },
    });

    if (!teacher) {
      return NextResponse.json(
        { message: "Profil enseignant non trouvé" },
        { status: 404 }
      );
    }

    if (!teacher.isApproved) {
      return NextResponse.json(
        {
          message: "Seuls les enseignants vérifiés peuvent gérer les étudiants",
        },
        { status: 403 }
      );
    }

    // Vérifier que l'étudiant appartient à une classe de cet enseignant
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        Classroom: {
          select: {
            teacherId: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    if (!student.Classroom || student.Classroom.teacherId !== teacher.id) {
      return NextResponse.json(
        { message: "Vous ne pouvez gérer que vos propres étudiants" },
        { status: 403 }
      );
    }

    // Mettre à jour le statut de l'étudiant
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { accountStatus: status },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        Classroom: {
          select: {
            name: true,
            classCode: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      student: updatedStudent,
      message: `Statut de l'étudiant mis à jour: ${status}`,
    });
  } catch (error) {
    console.error("[STUDENT_APPROVE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
