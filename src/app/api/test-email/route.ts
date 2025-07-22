import { NextResponse } from "next/server";
import { verifyMailerConfig, sendTestEmail } from "@/lib/mailer";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  try {
    // Vérifier que l'utilisateur est admin
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const { email, testType } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email requis pour le test" },
        { status: 400 }
      );
    }

    // Vérifier la configuration d'abord
    const configCheck = await verifyMailerConfig();

    if (!configCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Configuration nodemailer invalide",
          error: configCheck.error,
          configuration: {
            SMTP_HOST: process.env.SMTP_HOST ? "✅ Défini" : "❌ Manquant",
            SMTP_PORT: process.env.SMTP_PORT || "587 (par défaut)",
            SMTP_USER: process.env.SMTP_USER ? "✅ Défini" : "❌ Manquant",
            SMTP_PASS: process.env.SMTP_PASS ? "✅ Défini" : "❌ Manquant",
            SMTP_FROM: process.env.SMTP_FROM ? "✅ Défini" : "⚠️ Optionnel",
          },
        },
        { status: 500 }
      );
    }

    // Si testType est "config-only", ne faire que vérifier la config
    if (testType === "config-only") {
      return NextResponse.json({
        success: true,
        message: "Configuration nodemailer validée avec succès",
        configuration: {
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: process.env.SMTP_PORT || "587",
          SMTP_USER: process.env.SMTP_USER,
          SMTP_FROM: process.env.SMTP_FROM || process.env.SMTP_USER,
        },
      });
    }

    // Envoyer un email de test
    const testResult = await sendTestEmail(email);

    if (testResult.success) {
      return NextResponse.json({
        success: true,
        message: `Email de test envoyé avec succès à ${email}`,
        messageId: testResult.success,
        configuration: {
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: process.env.SMTP_PORT || "587",
          SMTP_USER: process.env.SMTP_USER,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Échec de l'envoi de l'email de test",
          error: testResult.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur dans l'API test-email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du test de configuration",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Vérifier l'authentification admin
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Retourner juste le statut de la configuration
    const configCheck = await verifyMailerConfig();

    return NextResponse.json({
      configurationStatus: configCheck.success ? "✅ Valide" : "❌ Invalide",
      error: configCheck.error || null,
      environment: {
        SMTP_HOST: process.env.SMTP_HOST ? "✅ Défini" : "❌ Manquant",
        SMTP_PORT: process.env.SMTP_PORT || "587 (par défaut)",
        SMTP_USER: process.env.SMTP_USER ? "✅ Défini" : "❌ Manquant",
        SMTP_PASS: process.env.SMTP_PASS ? "✅ Défini" : "❌ Manquant",
        SMTP_FROM: process.env.SMTP_FROM
          ? process.env.SMTP_FROM
          : process.env.SMTP_USER + " (utilisateur par défaut)",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        configurationStatus: "❌ Erreur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
