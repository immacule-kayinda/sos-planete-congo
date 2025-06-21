import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Récupérer tous les objets de la boutique
export async function GET() {
  try {
    const items = await prisma.shopItem.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        category: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[SHOP_ITEMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
