import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const moduleData = await prisma.module.findUnique({
      where: {
        id,
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
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!moduleData) {
      return new NextResponse("Module not found", { status: 404 });
    }

    return NextResponse.json(moduleData);
  } catch (error) {
    console.error("[MODULE_GET]", error);
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
    const { title, subtitle, sectionId, order } = body;

    const moduleData = await prisma.module.update({
      where: {
        id,
      },
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

    return NextResponse.json(moduleData);
  } catch (error) {
    console.error("[MODULE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.module.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[MODULE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
