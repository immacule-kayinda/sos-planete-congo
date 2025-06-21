import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, classCode, teacherId } = body;

    // Vérifier si le code de classe existe déjà
    const existingClassroom = await prisma.classroom.findUnique({
      where: { classCode },
    });

    if (existingClassroom) {
      return NextResponse.json(
        { message: "Ce code de classe existe déjà" },
        { status: 400 }
      );
    }

    // Vérifier si l'enseignant est approuvé
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      select: { isApproved: true },
    });

    if (!teacher) {
      return NextResponse.json(
        { message: "Enseignant non trouvé" },
        { status: 404 }
      );
    }

    if (!teacher.isApproved) {
      return NextResponse.json(
        {
          message:
            "Seuls les enseignants vérifiés peuvent être responsables de classe",
        },
        { status: 403 }
      );
    }

    const classroom = await prisma.classroom.create({
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
    console.error("[CLASSROOMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const classrooms = await prisma.classroom.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(classrooms);
  } catch (error) {
    console.error("[CLASSROOMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
