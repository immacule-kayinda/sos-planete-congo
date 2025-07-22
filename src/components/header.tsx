"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRoleNavigation } from "@/hooks/use-role-navigation";

export default function Header({ className }: { className?: string }) {
  const { getUserHomePage, isAuthenticated, userRole } = useRoleNavigation();

  // Ne pas afficher certains liens si l'utilisateur est connecté et sur son espace de travail
  const shouldShowSignUpButton = !isAuthenticated || userRole === undefined;

  return (
    <header
      className={clsx(
        `w-full h-20 flex justify-between border-b fixed top-0 left-0 backdrop-blur-3xl z-50 transition-all`,
        !!className ? "bg-white" : className
      )}
    >
      <div className="container w-full h-full m-auto justify-between items-center flex py-4 px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
          <Link href={getUserHomePage()} className="hover:underline">
            Mon espace
          </Link>
          <Link href="/help" className="hover:underline">
            Aide
          </Link>
          {shouldShowSignUpButton && (
            <Link
              href="/signup"
              className="bg-primary font-montserrat text-white px-5 py-1 rounded-md border border-b-4 border-red-800 font-semibold"
            >
              S'inscrire
            </Link>
          )}
          {isAuthenticated && (
            <span className="text-sm text-gray-600">
              Connecté en tant que{" "}
              {userRole === "STUDENT"
                ? "Étudiant"
                : userRole === "TEACHER"
                  ? "Professeur"
                  : "Admin"}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
