import type { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SOS planete congo",
  description: "Plateforme educative pour les petits et les grands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${nunito.className} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
