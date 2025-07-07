import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "TEACHER") {
      return NextResponse.json(
        {
          message:
            "Accès refusé - Seuls les professeurs peuvent créer des classes",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Le nom de la classe est requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'enseignant existe et est approuvé
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
          message: "Seuls les enseignants vérifiés peuvent créer des classes",
        },
        { status: 403 }
      );
    }

    // Générer un code de classe unique
    let classCode: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const existing = await prisma.classroom.findUnique({
        where: { classCode },
      });
      isUnique = !existing;
      attempts++;
    } while (!isUnique && attempts < maxAttempts);

    if (!isUnique) {
      return NextResponse.json(
        { message: "Impossible de générer un code de classe unique" },
        { status: 500 }
      );
    }

    const classroom = await prisma.classroom.create({
      data: {
        name,
        classCode,
        teacherId: teacher.id,
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

    return NextResponse.json(classroom, { status: 201 });
  } catch (error) {
    console.error("[CLASSROOMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    // Si c'est un enseignant, retourner seulement ses classes
    if (session.user.role === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!teacher) {
        return NextResponse.json(
          { message: "Profil enseignant non trouvé" },
          { status: 404 }
        );
      }

      const classrooms = await prisma.classroom.findMany({
        where: { teacherId: teacher.id },
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
              accountStatus: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(classrooms);
    }

    // Si c'est un admin, retourner toutes les classes
    if (session.user.role === "ADMIN") {
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
              accountStatus: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(classrooms);
    }

    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  } catch (error) {
    console.error("[CLASSROOMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
