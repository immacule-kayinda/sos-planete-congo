import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/news
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const published = searchParams.get("published") !== "false";

    const whereClause = {
      AND: [
        published ? { published: true } : {},
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" as const } },
                { excerpt: { contains: search, mode: "insensitive" as const } },
              ],
            }
          : {},
      ],
    };

    const news = await prisma.news.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      content,
      image,
      author,
      category,
      tags = [],
      published = false,
    } = body;

    if (!slug || !title || !excerpt || !content || !author || !category) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const existingNews = await prisma.news.findUnique({ where: { slug } });
    if (existingNews) {
      return NextResponse.json({ error: "Slug déjà utilisé" }, { status: 409 });
    }

    const news = await prisma.news.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        image: image || "https://placehold.co/600x400",
        author,
        category,
        tags,
        published,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
