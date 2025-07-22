"use client";

import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SignInForm from "@/components/auth/sign-in-form";

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-bold">
      <div className="w-full max-w-md p-8 rounded-lg flex flex-col items-center border ">
        {/* Close icon */}
        <Link
          href="/"
          className="self-start mb-8 text-3xl text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <p className="md:hidden">&times;</p>
          <p className="hidden md:flex gap-2 items-center text-xl">
            <AiOutlineArrowLeft /> Retour
          </p>
        </Link>
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold text-black mb-8 text-center font-nunito">
          Connexion
        </h1>
        {/* Form */}
        <SignInForm />
        {/* Forgot password link */}
        <div className="w-full text-right mb-4">
          <Link
            href="/forgot-password"
            className="text-green-600 hover:underline text-sm"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Signup link */}
        <div className="text-center mt-2">
          <span className="text-lg">Tu n'as pas encore de compte ? </span>
          <a href="/signup" className="text-red-600 hover:underline text-lg">
            Inscris-toi
          </a>
        </div>
      </div>
    </div>
  );
}
