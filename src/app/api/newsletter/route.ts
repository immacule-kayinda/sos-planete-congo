import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schéma de validation pour l'email
const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

// POST: S'abonner à la newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Vérifier si l'email existe déjà
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.active) {
        return NextResponse.json(
          { error: "Cette adresse email est déjà abonnée" },
          { status: 409 }
        );
      } else {
        // Réactiver l'abonnement
        await prisma.newsletter.update({
          where: { email },
          data: { active: true },
        });
        return NextResponse.json(
          { message: "Abonnement réactivé avec succès" },
          { status: 200 }
        );
      }
    }

    // Créer un nouvel abonnement
    await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json(
      {
        message:
          "Abonnement réussi ! Merci de vous être abonné à notre newsletter.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'abonnement à la newsletter:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE: Se désabonner de la newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Adresse email requise" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Désactiver l'abonnement au lieu de supprimer
    const result = await prisma.newsletter.updateMany({
      where: {
        email,
        active: true,
      },
      data: { active: false },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Aucun abonnement actif trouvé pour cette adresse email" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Désabonnement réussi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du désabonnement:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// GET: Récupérer le statut d'abonnement (pour l'admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (email) {
      // Vérifier le statut d'un email spécifique
      const subscription = await prisma.newsletter.findUnique({
        where: { email },
      });

      return NextResponse.json({
        subscribed: subscription?.active || false,
        subscription: subscription || null,
      });
    }

    // Récupérer tous les abonnements actifs (pour l'admin)
    const subscriptions = await prisma.newsletter.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
