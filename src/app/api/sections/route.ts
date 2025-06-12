import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, order, quizId } = body;

    const section = await prisma.section.create({
      data: {
        title,
        description,
        order,
        quizId,
      },
      include: {
        modules: true,
        conte: true,
        quizz: true,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      include: {
        modules: {
          select: {
            id: true,
            title: true,
          },
        },
        conte: {
          select: {
            id: true,
            title: true,
          },
        },
        quizz: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("[SECTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
