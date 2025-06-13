import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
            createdAt: true,
          },
        },
        Classroom: {
          select: {
            id: true,
            name: true,
            classCode: true,
            students: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!teacher) {
      return new NextResponse("Teacher not found", { status: 404 });
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.error("[TEACHER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isApproved, ...otherData } = body;

    const teacher = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        ...otherData,
        isApproved,
      },
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
          },
        },
        Classroom: {
          select: {
            id: true,
            name: true,
            classCode: true,
          },
        },
      },
    });

    // Si l'enseignant est approuvé et n'a pas de classe, créer une classe automatiquement
    if (isApproved && teacher.Classroom.length === 0) {
      const classCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      await prisma.classroom.create({
        data: {
          name: `Classe de ${teacher.firstName} ${teacher.lastName}`,
          classCode,
          teacherId: teacher.id,
        },
      });
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.error("[TEACHER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Vérifier s'il y a des classes ou des étudiants associés
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        Classroom: true,
        students: true,
      },
    });

    if (!teacher) {
      return new NextResponse("Teacher not found", { status: 404 });
    }

    if (teacher.Classroom.length > 0 || teacher.students.length > 0) {
      return NextResponse.json(
        {
          message:
            "Impossible de supprimer un enseignant qui a des classes ou des élèves",
        },
        { status: 400 }
      );
    }

    // Supprimer l'enseignant et l'utilisateur associé
    await prisma.$transaction([
      prisma.teacher.delete({
        where: { id },
      }),
      prisma.user.delete({
        where: { id: teacher.userId },
      }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TEACHER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
