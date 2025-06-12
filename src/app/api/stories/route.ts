import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, audioUrl, pages, sectionId } = body;

    const story = await prisma.conte.create({
      data: {
        title,
        audioUrl,
        pages: {
          create: pages.map((page: any, index: number) => ({
            ...page,
            order: index,
          })),
        },
        section: {
          connect: {
            id: sectionId,
          },
        },
      },
      include: {
        pages: true,
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error("[STORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const stories = await prisma.conte.findMany({
      include: {
        pages: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error("[STORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
