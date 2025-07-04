import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, token, password } = await request.json();
  if (!email || !token || !password) {
    return NextResponse.json(
      { message: "Paramètres manquants." },
      { status: 400 }
    );
  }
  // Recherche de l'utilisateur par email, token et expiration
  const user = await prisma.user.findFirst({
    where: {
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Lien invalide ou expiré." },
      { status: 400 }
    );
  }
  // Mettre à jour le mot de passe (hashé) et invalider le token
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
  return NextResponse.json({
    message: "Mot de passe réinitialisé avec succès.",
  });
}
