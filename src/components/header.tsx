"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";

export default function Header({ className }: { className?: string }) {
  const { data: session } = useSession();
  console.log(!!className);

  // Déterminer le lien du profil selon le rôle de l'utilisateur
  const getProfileLink = () => {
    if (!session) {
      return "/signin"; // Rediriger vers la connexion si pas connecté
    }

    switch (session.user.role) {
      case "STUDENT":
        return "/learn"; // Dashboard étudiant
      case "TEACHER":
        return "/teacher/dashboard"; // Dashboard enseignant
      case "ADMIN":
        return "/dashboard"; // Dashboard admin
      default:
        return "/signin";
    }
  };

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
          <Link href={getProfileLink()} className="hover:underline">
            Mon profil
          </Link>
          <Link href="/help" className="hover:underline">
            Aide
          </Link>
          <Link
            href="/signup"
            className="bg-primary font-montserrat text-white px-5 py-1 rounded-md border border-b-4 border-red-800 font-semibold"
          >
            S'inscrire
          </Link>
        </nav>
      </div>
    </header>
  );
}
