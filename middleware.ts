import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("middleware");

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ["/", "/signin", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est authentifié
  if (!req.auth || !req.auth.user) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Vérifier si la session a un ID utilisateur valide
  if (!req.auth.user.id) {
    // Session JWT invalide, rediriger vers la connexion
    const newUrl = new URL("/signin", req.nextUrl.origin);
    newUrl.searchParams.set("error", "SessionExpired");
    return Response.redirect(newUrl);
  }

  return NextResponse.next();
});

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    // Protéger toutes les routes sauf les routes publiques et les assets
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.png|signin|signup|$).*)",
  ],
};
