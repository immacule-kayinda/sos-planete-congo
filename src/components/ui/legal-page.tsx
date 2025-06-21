"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary/90">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                {title}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium">
                  Dernière mise à jour :
                </span>
                <span className="text-sm text-white/90">{lastUpdated}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div
                className="prose prose-lg max-w-none 
                prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-gray-600 prose-li:leading-relaxed
                prose-strong:text-primary prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
                prose-a:font-medium prose-a:transition-colors
                prose-hr:my-12 prose-hr:border-gray-200"
              >
                {children}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
