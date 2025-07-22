import nodemailer from "nodemailer";

// Validation des variables d'environnement requises
const requiredEnvVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(
    `❌ Variables d'environnement manquantes pour nodemailer: ${missingVars.join(", ")}`
  );
}

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === "465", // true pour le port 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Options supplémentaires pour une meilleure compatibilité
  tls: {
    // Ne pas échouer sur les certificats invalides
    rejectUnauthorized: false,
  },
  // Timeout configuration
  connectionTimeout: 60000, // 60 secondes
  greetingTimeout: 30000, // 30 secondes
  socketTimeout: 60000, // 60 secondes
});

// Fonction pour vérifier la configuration
export async function verifyMailerConfig(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Vérifier que toutes les variables d'environnement sont présentes
    if (missingVars.length > 0) {
      return {
        success: false,
        error: `Variables d'environnement manquantes: ${missingVars.join(", ")}`,
      };
    }

    // Tester la connexion SMTP
    const isConnected = await transporter.verify();

    if (isConnected) {
      console.log("✅ Configuration nodemailer validée avec succès");
      return { success: true };
    } else {
      return {
        success: false,
        error: "Impossible de se connecter au serveur SMTP",
      };
    }
  } catch (error) {
    console.error("❌ Erreur de configuration nodemailer:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

// Fonction d'envoi d'email améliorée
export async function sendMail({
  to,
  subject,
  html,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Vérifier la configuration avant d'envoyer
    const configCheck = await verifyMailerConfig();
    if (!configCheck.success) {
      return {
        success: false,
        error: `Configuration invalide: ${configCheck.error}`,
      };
    }

    const result = await transporter.sendMail({
      from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    console.log(
      `✅ Email envoyé avec succès à ${to} - Message ID: ${result.messageId}`
    );

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error(`❌ Erreur lors de l'envoi d'email à ${to}:`, error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors de l'envoi",
    };
  }
}

// Fonction pour envoyer un email de test
export async function sendTestEmail(
  testEmail: string
): Promise<{ success: boolean; error?: string }> {
  return sendMail({
    to: testEmail,
    subject: "Test de configuration nodemailer - SOS Planète Congo",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d31929;">🎉 Configuration nodemailer réussie !</h2>
        <p>Félicitations ! Votre configuration nodemailer fonctionne correctement.</p>
        <p><strong>Serveur:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>Port:</strong> ${process.env.SMTP_PORT || 587}</p>
        <p><strong>Utilisateur:</strong> ${process.env.SMTP_USER}</p>
        <p><strong>Date du test:</strong> ${new Date().toLocaleString("fr-FR")}</p>
        <hr>
        <p style="color: #666; font-size: 14px;">
          Ceci est un email de test automatique de SOS Planète Congo.
        </p>
      </div>
    `,
  });
}

export default transporter;
