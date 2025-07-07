"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function LimitedAccessActions() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Appel API pour vérifier le code de classe
    const res = await fetch("/api/classrooms/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Code accepté ! Votre compte sera activé sous peu.");
      setCode("");
      window.location.reload();
    } else {
      setMessage(data.message || "Code invalide ou erreur.");
    }
    setLoading(false);
  };

  const handleRequest = async () => {
    setLoading(true);
    setMessage("");
    // Appel API pour demander l'activation
    const res = await fetch("/api/student/activation-request", {
      method: "POST",
    });
    if (res.ok) {
      setMessage("Demande envoyée à l'équipe pédagogique.");
    } else {
      setMessage("Erreur lors de la demande. Réessayez plus tard.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Code de classe"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !code}>
          Vérifier
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <Button onClick={handleRequest} disabled={loading} variant="outline">
          <Send className="h-4 w-4 mr-1" />
          Demander l'activation
        </Button>
      </div>
      {message && <div className="text-sm text-yellow-700">{message}</div>}
    </div>
  );
}
