"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Erreur lors de la réinitialisation.");
      }
    } catch (err: any) {
      setError(err?.message || "Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-bold">
      <div className="w-full max-w-md p-8 rounded-lg flex flex-col items-center border ">
        <h1 className="text-3xl md:text-4xl font-semibold text-black mb-6 text-center font-nunito">
          Réinitialiser le mot de passe
        </h1>
        {success ? (
          <div className="text-green-600 text-center">
            Mot de passe réinitialisé ! Vous pouvez maintenant vous connecter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input type="hidden" value={token} />
            <input type="hidden" value={email} />
            <label
              htmlFor="password"
              className="text-lg text-gray-700 font-normal"
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nouveau mot de passe"
            />
            <label
              htmlFor="confirm"
              className="text-lg text-gray-700 font-normal"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirmez le mot de passe"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition font-semibold text-lg"
              disabled={loading}
            >
              {loading ? "Réinitialisation..." : "Réinitialiser"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
