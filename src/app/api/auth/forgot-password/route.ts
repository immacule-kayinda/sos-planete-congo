import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
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
    // Envoyer l'email
    await sendMail({
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `<p>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Ce lien expire dans 1 heure.</p>`,
    });
  }
  // Toujours répondre positivement pour la sécurité
  return NextResponse.json({
    message:
      "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
  });
}
