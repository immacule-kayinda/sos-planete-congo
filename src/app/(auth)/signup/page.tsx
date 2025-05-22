"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TeacherSignUpForm from "@/components/auth/teacher-sign-up-form";
import StudentSignUpForm from "@/components/auth/student-sign-up-form";

export default function Signup() {
  const [role, setRole] = useState<"apprenant" | "enseignant">("apprenant");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white font-bold">
        <div className="w-full md:max-w-md md:w-full p-8 rounded-lg flex flex-col items-center md:border ">
          {/* Close icon */}
          <Link
            href="/"
            className="self-start mb-8  text-gray-400 hover:text-gray-600 focus:outline-none sticky top-5 md:static"
          >
            <p className="md:hidden">&times;</p>
            <p className="hidden md:flex gap-2 items-center text-base">
              <AiOutlineArrowLeft /> Retour
            </p>
          </Link>
          {/* Toggle */}
          <div className="w-full flex flex-col items-center mb-2">
            <span className="mb-2 text-base font-semibold text-black">
              S'inscrire en tant que
            </span>
            <div className="flex w-full max-w-xs rounded-full overflow-hidden bg-gray-100 mb-4">
              <button
                className={`flex-1 py-2 text-base font-bold transition rounded-full ${
                  role === "apprenant"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => setRole("apprenant")}
                type="button"
              >
                Apprenant
              </button>
              <button
                className={`flex-1 py-2 text-base font-bold transition rounded-full ${
                  role === "enseignant"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => setRole("enseignant")}
                type="button"
              >
                Enseignant
              </button>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-5xl hidden md:text-6xl font-semibold text-black mb-8 text-center font-nunito">
            Inscription
          </h1>
          {/* Form */}
          <form className="w-full flex flex-col gap-4 **:placeholder:text-base **:h-auto">
            {role === "apprenant" ? (
              <StudentSignUpForm />
            ) : (
              <TeacherSignUpForm />
            )}
            <Button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg text-xl mt-2 transition h-13"
            >
              S'inscrire
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
              className="flex-1 flex items-center justify-center gap-2 border text-base text-[#1877F2] border-gray-300 rounded-lg py-3 font-semibold hover:bg-[#1877F2]/5 transition"
            >
              <Image
                src="/facebook.svg"
                alt="facebook"
                width={20}
                height={20}
                className="text-blue-600"
              />
              Facebook
            </Link>
            <Link
              href="/oauth/google"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-base font-semibold hover:bg-[#587DBD]/5 transition text-[#587DBD]"
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
          {/* Signin link */}
          <div className="text-center mt-2 text-base">
            <span className="">Tu as déjà un compte ? </span>
            <a href="/signin" className="text-red-600 hover:underline">
              Connecte-toi
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
