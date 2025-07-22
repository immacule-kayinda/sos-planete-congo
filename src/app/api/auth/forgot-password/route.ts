import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email requis." }, { status: 400 });
    }

    // Recherche de l'utilisateur dans la base
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Générer un token sécurisé
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1h

      // Mettre à jour l'utilisateur avec le token et l'expiration
      await prisma.user.update({
        where: { email },
        data: {
          resetPasswordToken: token,
          resetPasswordExpires: expires,
        },
      });

      // Générer le lien de réinitialisation
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

      // Envoyer l'email avec la nouvelle fonction améliorée
      const emailResult = await sendMail({
        to: email,
        subject: "Réinitialisation de votre mot de passe - SOS Planète Congo",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d31929; margin-bottom: 10px;">SOS Planète Congo</h1>
              <h2 style="color: #333; font-weight: normal;">Réinitialisation de mot de passe</h2>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #333; line-height: 1.6;">
                Bonjour,<br><br>
                Vous avez demandé la réinitialisation de votre mot de passe. 
                Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #d31929; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 6px; font-weight: bold;
                        display: inline-block;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                ⚠️ <strong>Important :</strong> Ce lien expire dans 1 heure pour votre sécurité.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.<br>
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <span style="word-break: break-all;">${resetUrl}</span>
              </p>
            </div>
          </div>
        `,
      });

      // Vérifier si l'email a été envoyé avec succès
      if (!emailResult.success) {
        console.error("Erreur lors de l'envoi de l'email:", emailResult.error);
        return NextResponse.json(
          {
            message:
              "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.",
          },
          { status: 500 }
        );
      }

      console.log(
        `Email de réinitialisation envoyé à ${email} - Message ID: ${emailResult.messageId}`
      );
    }

    // Toujours répondre positivement pour la sécurité
    return NextResponse.json({
      message:
        "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur dans l'API forgot-password:", error);
    return NextResponse.json(
      {
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}
