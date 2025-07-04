"use client";

import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'abonnement à la newsletter
    console.log("Email soumis:", email);
    setIsSubscribed(true);
    setEmail("");
    // Réinitialiser le message après 3 secondes
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-primary text-white font-black">
      <section className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 justify-center items-start border-b border-white/20 py-20">
        {footerSections.map((section) => (
          <div key={section.name} className="flex flex-col gap-2 w-full">
            <h3 className="text-xl">{section.name}</h3>
            <ul className="flex flex-col text-[#f48383]">
              {section.links.map((link, index) => (
                <li
                  key={link.label}
                  className="hover:text-white/70 transition-all"
                >
                  <Link href={link.href} key={index}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Section Newsletter */}
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-xl">Newsletter</h3>
          <p className="text-sm text-white/80 font-normal">
            Restez informé des dernières actualités de SOS Planète Congo
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
              />
              <Button
                type="submit"
                className="bg-[#f48383] hover:bg-[#f48383]/80 text-white px-4 py-2 whitespace-nowrap"
              >
                S'abonner
              </Button>
            </div>
            {isSubscribed && (
              <p className="text-green-400 text-sm font-normal">
                Merci pour votre abonnement !
              </p>
            )}
          </form>

          <p className="text-xs text-white/60 font-normal">
            En vous abonnant, vous acceptez de recevoir nos newsletters. Vous
            pouvez vous désabonner à tout moment.
          </p>
        </div>
      </section>
      <div className="container mx-auto py-5 text-center">
        SOS PLANETE CONGO, CRÉÉ PAR L'ASBL TEXAF BILEMBO. Tous droits réservés
        2025.
      </div>
    </footer>
  );
}

const footerSections: {
  name: string;
  links: {
    label: string;
    href: string;
  }[];
}[] = [
  {
    name: "À propos de nous",
    links: [
      { label: "Le projet", href: "/about" },
      { label: "Nos livres", href: "/books" },
      { label: "Contactez-nous", href: "/help" },
    ],
  },
  {
    name: "Légal",
    links: [
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialité", href: "/privacy" },
    ],
  },
  {
    name: "Réseaux sociaux",
    links: [
      { label: "Facebook", href: "https://www.facebook.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "YouTube", href: "https://www.youtube.com" },
    ],
  },
];
