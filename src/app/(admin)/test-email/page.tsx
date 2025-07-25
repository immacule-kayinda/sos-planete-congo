"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    success: boolean;
    message: string;
    error?: string;
  }>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResult({
        success: data.success,
        message: data.message,
        error: data.error,
      });
    } catch (err) {
      setResult({
        success: false,
        message: "Erreur lors de la requête",
        error: String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2>Test d'envoi d'email</h2>
      <form onSubmit={handleSend}>
        <label htmlFor="email">Email de destination :</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "8px 0", padding: 8 }}
        />
        <Button
          type="submit"
          disabled={loading || !email}
          style={{ width: "100%", padding: 10 }}
        >
          {loading ? "Envoi en cours..." : "Envoyer un email de test"}
        </Button>
      </form>
      {result && (
        <div style={{ marginTop: 16, color: result.success ? "green" : "red" }}>
          <strong>{result.success ? "Succès : " : "Erreur : "}</strong>
          {result.message}
          {result.error && <div style={{ color: "#b00" }}>{result.error}</div>}
        </div>
      )}
    </div>
  );
}
