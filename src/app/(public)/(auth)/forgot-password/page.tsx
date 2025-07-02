"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Appel à l'API pour envoyer l'email de réinitialisation
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (err: any) {
      setError(err?.message || "Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-bold">
      <div className="w-full max-w-md p-8 rounded-lg flex flex-col items-center border ">
        <Link
          href="/signin"
          className="self-start mb-8 text-3xl text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          &larr; Retour
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold text-black mb-6 text-center font-nunito">
          Mot de passe oublié ?
        </h1>
        {submitted ? (
          <div className="text-green-600 text-center">
            Si un compte existe avec cet email, un lien de réinitialisation a
            été envoyé.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <label
              htmlFor="email"
              className="text-lg text-gray-700 font-normal"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Entrez votre email"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition font-semibold text-lg"
            >
              Envoyer le lien de réinitialisation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
