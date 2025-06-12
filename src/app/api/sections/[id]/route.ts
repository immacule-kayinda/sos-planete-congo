import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const section = await prisma.section.findUnique({
      where: { id: params.id },
      include: {
        modules: {
          include: {
            chapters: true,
          },
        },
        conte: {
          include: {
            pages: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
        quizz: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!section) {
      return new NextResponse("Section not found", { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, order, quizId } = body;

    const section = await prisma.section.update({
      where: {
        id: params.id,
      },
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
    console.error("[SECTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.section.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[SECTION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
