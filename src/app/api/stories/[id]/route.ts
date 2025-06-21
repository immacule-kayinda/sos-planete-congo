import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface PageData {
  content: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const story = await prisma.conte.findUnique({
      where: { id },
      include: {
        pages: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!story) {
      return new NextResponse("Story not found", { status: 404 });
    }

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("[STORY_GET]", error);
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
    const { title, audioUrl, pages } = body;

    // Supprimer toutes les pages existantes
    await prisma.page.deleteMany({
      where: {
        conteId: id,
      },
    });

    // Mettre à jour le conte et créer les nouvelles pages
    const story = await prisma.conte.update({
      where: {
        id,
      },
      data: {
        title,
        audioUrl,
        pages: {
          create: pages.map((page: PageData, index: number) => ({
            ...page,
            order: index,
          })),
        },
      },
      include: {
        pages: true,
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error("[STORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.conte.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[STORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
