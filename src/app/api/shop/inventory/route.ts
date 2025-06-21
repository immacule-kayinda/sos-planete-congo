import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

// Récupérer l'inventaire de l'étudiant
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "STUDENT") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Trouver l'étudiant
    const student = await prisma.student.findFirst({
      where: { userId: session.user.id },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Récupérer l'inventaire avec les détails des objets
    const inventory = await prisma.studentInventory.findMany({
      where: { studentId: student.id },
      include: {
        item: true,
      },
      orderBy: {
        purchasedAt: "desc",
      },
    });

    // Calculer le total des étoiles
    const totalStars = await prisma.studentPerformance.aggregate({
      where: { studentId: student.id },
      _sum: { stars: true },
    });

    return NextResponse.json({
      inventory,
      totalStars: totalStars._sum.stars || 0,
    });
  } catch (error) {
    console.error("[SHOP_INVENTORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
