import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ["/", "/signin", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (isPublicRoute) return NextResponse.next();

  // Vérifier si l'utilisateur est authentifié
  if (!req.auth || !req.auth.user) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Restriction par rôle
  const { role } = req.auth.user;
  const path = req.nextUrl.pathname;

  // Espace enseignant
  if (path.startsWith("/teacher") && role !== "TEACHER") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
  // Espace élève
  if (
    (path.startsWith("/student") ||
      path.startsWith("/learn") ||
      path.startsWith("/exercices") ||
      path.startsWith("/games") ||
      path.startsWith("/shop") ||
      path.startsWith("/stories") ||
      path.startsWith("/leaderboard") ||
      path.startsWith("/profile")) &&
    role !== "STUDENT"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
  // Espace admin
  if (path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
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
