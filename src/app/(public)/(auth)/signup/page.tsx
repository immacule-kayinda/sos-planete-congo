"use client";

import StudentSignUpForm from "@/components/auth/student-sign-up-form";
import TeacherSignUpForm from "@/components/auth/teacher-sign-up-form";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Signup() {
  const [role, setRole] = useState<"apprenant" | "enseignant">("apprenant");

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
          {/* Forms */}
          {role === "apprenant" ? <StudentSignUpForm /> : <TeacherSignUpForm />}

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
