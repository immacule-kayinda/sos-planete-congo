import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { classCode } = body;

    if (!classCode) {
      return NextResponse.json(
        { message: "Le code de classe est requis" },
        { status: 400 }
      );
    }

    const classroom = await prisma.classroom.findUnique({
      where: { classCode },
      include: {
        Teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            school: true,
            isApproved: true,
          },
        },
      },
    });

    if (!classroom) {
      return NextResponse.json(
        { message: "Code de classe invalide" },
        { status: 404 }
      );
    }

    if (!classroom.Teacher?.isApproved) {
      return NextResponse.json(
        { message: "L'enseignant de cette classe n'est pas encore approuvé" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      classroom: {
        id: classroom.id,
        name: classroom.name,
        teacher: classroom.Teacher,
      },
    });
  } catch (error) {
    console.error("[VERIFY_CLASS_CODE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
