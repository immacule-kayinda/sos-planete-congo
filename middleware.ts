import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;

  // Routes complètement publiques qui ne nécessitent pas d'authentification
  const publicRoutes = [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/help",
    "/terms",
    "/privacy",
    "/rules",
    "/news",
    "/activities",
    "/books",
    "/api/auth",
    "/api/newsletter",
    "/api/upload",
    "/_next",
    "/favicon.ico",
    "/logo.png",
    "/public",
  ];

  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  if (isPublicRoute) return NextResponse.next();

  // Vérifier si l'utilisateur est authentifié
  if (!req.auth || !req.auth.user) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  const { role } = req.auth.user;

  // Définir les pages d'accueil par défaut pour chaque rôle
  const getHomePageForRole = (userRole: string) => {
    switch (userRole) {
      case "STUDENT":
        return "/learn";
      case "TEACHER":
        return "/teacher/dashboard";
      case "ADMIN":
        return "/dashboard";
      default:
        return "/signin";
    }
  };

  // Routes spécifiques par rôle
  const studentRoutes = [
    "/learn",
    "/exercices",
    "/games",
    "/shop",
    "/stories",
    "/leaderboard",
    "/profile",
    "/guidebook",
    "/quizz", // Ajouter les quiz pour les étudiants
  ];

  const teacherRoutes = ["/teacher"];

  const adminRoutes = ["/dashboard"];

  // Contrôle d'accès basé sur les rôles
  if (role === "STUDENT") {
    // Les étudiants ne peuvent accéder qu'aux routes étudiants
    const isStudentRoute = studentRoutes.some((route) =>
      path.startsWith(route)
    );
    if (!isStudentRoute) {
      return NextResponse.redirect(
        new URL(getHomePageForRole("STUDENT"), req.nextUrl.origin)
      );
    }
  } else if (role === "TEACHER") {
    // Les enseignants ne peuvent accéder qu'aux routes enseignants
    const isTeacherRoute = teacherRoutes.some((route) =>
      path.startsWith(route)
    );
    if (!isTeacherRoute) {
      return NextResponse.redirect(
        new URL(getHomePageForRole("TEACHER"), req.nextUrl.origin)
      );
    }
  } else if (role === "ADMIN") {
    // Les admins ne peuvent accéder qu'aux routes admin
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
    if (!isAdminRoute) {
      return NextResponse.redirect(
        new URL(getHomePageForRole("ADMIN"), req.nextUrl.origin)
      );
    }
  } else {
    // Rôle non reconnu, rediriger vers la connexion
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    // Protéger toutes les routes sauf les routes publiques et les assets
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.png|public|.*\\.).*)",
  ],
};
