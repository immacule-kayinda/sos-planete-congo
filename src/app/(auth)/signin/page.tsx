"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        <h1 className="text-5xl md:text-6xl font-semibold text-black mb-10 text-center font-nunito">
          Connexion
        </h1>
        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Nom d'utilisateur ou email"
            className="w-full px-4 py-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-red-600 text-lg transition-all duration-300"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-red-600 text-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg text-xl mt-2 transition h-13"
          >
            Se connecter
          </Button>
        </form>
        {/* Separator */}
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">ou</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        {/* Social buttons */}
        <div className="flex w-full gap-4 mb-6 font-montserrat">
          <Link
            href="/oauth/facebook"
            className="flex-1 flex items-center justify-center gap-2 border text-[#1877F2] border-gray-300 rounded-lg py-3 text-lg font-semibold hover:bg-[#1877F2]/5 transition"
          >
            <Image
              src="/facebook.svg"
              alt="facebook"
              width={20}
              height={20}
              className="text-blue-600"
            />{" "}
            Facebook
          </Link>
          <Link
            href="/oauth/google"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-lg font-semibold hover:bg-[#587DBD]/5 transition text-[#587DBD]"
          >
            <Image
              src="/google.svg"
              alt="google"
              width={20}
              height={20}
              className="text-red-600"
            />
            Google
          </Link>
        </div>
        {/* Signup link */}
        <div className="text-center mt-2">
          <span className="text-lg">Tu n'as pas encore de compte ? </span>
          <a
            href="/signup"
            className="text-red-600 hover:underline text-lg"
          >
            Inscris-toi
          </a>
        </div>
      </div>
    </div>
  );
}
