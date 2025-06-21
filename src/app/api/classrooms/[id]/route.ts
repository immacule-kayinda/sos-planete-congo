import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const classroom = await prisma.classroom.findUnique({
      where: {
        id,
      },
      include: {
        Teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            school: true,
          },
        },
        students: {
          select: {
            id: true,
            user: {
              select: {
                email: true,
              },
            },
            age: true,
          },
        },
      },
    });

    if (!classroom) {
      return new NextResponse("Classroom not found", { status: 404 });
    }

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("[CLASSROOM_GET]", error);
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
    const { name, classCode, teacherId } = body;

    // Vérifier si le code de classe existe déjà (sauf pour cette classe)
    if (classCode) {
      const existingClassroom = await prisma.classroom.findFirst({
        where: {
          classCode,
          NOT: {
            id,
          },
        },
      });

      if (existingClassroom) {
        return NextResponse.json(
          { message: "Ce code de classe existe déjà" },
          { status: 400 }
        );
      }
    }

    const classroom = await prisma.classroom.update({
      where: {
        id,
      },
      data: {
        name,
        classCode,
        teacherId,
      },
      include: {
        Teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            school: true,
          },
        },
        students: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("[CLASSROOM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Vérifier s'il y a des étudiants dans la classe
    const classroom = await prisma.classroom.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });

    if (!classroom) {
      return new NextResponse("Classroom not found", { status: 404 });
    }

    if (classroom.students.length > 0) {
      return NextResponse.json(
        {
          message: "Impossible de supprimer une classe qui contient des élèves",
        },
        { status: 400 }
      );
    }

    await prisma.classroom.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CLASSROOM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
