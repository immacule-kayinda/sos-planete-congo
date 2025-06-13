import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import {
  invalidateUserTokens,
  forceLogoutUser,
  reactivateUser,
  getUserSessionInfo,
} from "@/lib/jwt-session-utils";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { action, userId } = body;

    switch (action) {
      case "invalidate":
        await invalidateUserTokens(userId);
        return NextResponse.json({
          message: `Tokens de l'utilisateur ${userId} invalidés`,
        });

      case "forceLogout":
        await forceLogoutUser(userId);
        return NextResponse.json({
          message: `Utilisateur ${userId} déconnecté de force`,
        });

      case "reactivate":
        await reactivateUser(userId);
        return NextResponse.json({
          message: `Utilisateur ${userId} réactivé`,
        });

      default:
        return NextResponse.json(
          { message: "Action non supportée" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Erreur lors de la gestion des sessions JWT:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const userInfo = await getUserSessionInfo(userId);
      return NextResponse.json({ user: userInfo });
    }

    return NextResponse.json(
      { message: "Paramètre userId requis" },
      { status: 400 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des infos utilisateur:",
      error
    );
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
