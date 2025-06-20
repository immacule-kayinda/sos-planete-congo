import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

// Acheter un objet
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "STUDENT") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { itemId } = await request.json();

    if (!itemId) {
      return new NextResponse("Item ID is required", { status: 400 });
    }

    // Trouver l'étudiant
    const student = await prisma.student.findFirst({
      where: { userId: session.user.id },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Récupérer l'objet à acheter
    const item = await prisma.shopItem.findUnique({
      where: { id: itemId },
    });

    if (!item || !item.isActive) {
      return new NextResponse("Item not found or not available", {
        status: 404,
      });
    }

    // Calculer le solde de l'étudiant (étoiles totales)
    const totalStars = await prisma.studentPerformance.aggregate({
      where: { studentId: student.id },
      _sum: { stars: true },
    });

    const studentStars = totalStars._sum.stars || 0;

    // Vérifier si l'étudiant a assez d'étoiles
    if (studentStars < item.price) {
      return new NextResponse("Insufficient stars", { status: 400 });
    }

    // Créer ou mettre à jour l'inventaire
    const inventory = await prisma.studentInventory.upsert({
      where: {
        studentId_itemId: {
          studentId: student.id,
          itemId: item.id,
        },
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
      create: {
        studentId: student.id,
        itemId: item.id,
        quantity: 1,
      },
    });

    return NextResponse.json({
      success: true,
      inventory,
      remainingStars: studentStars - item.price,
    });
  } catch (error) {
    console.error("[SHOP_PURCHASE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
