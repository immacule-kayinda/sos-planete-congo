import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, sectionId, order } = body;

    const newModule = await prisma.module.create({
      data: {
        title,
        subtitle,
        sectionId,
        order,
      },
      include: {
        section: {
          select: {
            id: true,
            title: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(newModule);
  } catch (error) {
    console.error("[MODULES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      include: {
        section: {
          select: {
            id: true,
            title: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [
        {
          section: {
            order: "asc",
          },
        },
        {
          order: "asc",
        },
      ],
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("[MODULES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
