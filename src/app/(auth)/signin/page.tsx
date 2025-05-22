"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
        <h1 className="text-5xl md:text-6xl font-semibold text-black mb-10 text-center font-nunito">
          Connexion
        </h1>
        {/* Form */}
        <SignInForm />
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
          <a href="/signup" className="text-red-600 hover:underline text-lg">
            Inscris-toi
          </a>
        </div>
      </div>
    </div>
  );
}
