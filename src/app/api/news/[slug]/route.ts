import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/news/[slug] - Récupérer un article par son slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    const news = await prisma.news.findUnique({
      where: {
        slug,
        published: true, // Seulement les articles publiés
      },
    });

    if (!news) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// PUT /api/news/[slug] - Mettre à jour un article (admin seulement)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      image,
      author,
      category,
      tags,
      published,
    } = body;

    const existingNews = await prisma.news.findUnique({
      where: { slug },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    const updatedNews = await prisma.news.update({
      where: { slug },
      data: {
        ...(title && { title }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(image && { image }),
        ...(author && { author }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[slug] - Supprimer un article (admin seulement)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    const existingNews = await prisma.news.findUnique({
      where: { slug },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    await prisma.news.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
