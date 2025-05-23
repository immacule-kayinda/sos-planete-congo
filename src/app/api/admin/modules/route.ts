import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const modules = await prisma.module.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        _count: {
          select: {
            chapters: true,
            quizzes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
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
    const { title, description, conte } = body;

    const module = await prisma.module.create({
      data: {
        title,
        description,
        ...(conte && {
          conte: {
            create: conte,
          },
        }),
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error creating module:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
