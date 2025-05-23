import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const classrooms = await prisma.classroom.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              {
                Teacher: {
                  OR: [
                    { firstName: { contains: search, mode: "insensitive" } },
                    { lastName: { contains: search, mode: "insensitive" } },
                  ],
                },
              },
            ],
          }
        : undefined,
      include: {
        Teacher: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, teacherId } = body;

    const classroom = await prisma.classroom.create({
      data: {
        name,
        ...(teacherId && {
          Teacher: {
            connect: {
              id: teacherId,
            },
          },
        }),
      },
      include: {
        Teacher: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("Error creating classroom:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
