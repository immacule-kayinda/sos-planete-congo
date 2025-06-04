"use client";

import Header from "@/components/header";
import HeroSection from "@/components/landing/hero_section";
import Presentation from "@/components/landing/presentation";
import StatCard from "@/components/landing/stat_card";
import Supporters from "@/components/landing/supporters";
import Testimonials from "@/components/landing/testimonials";
import News from "@/components/landing/news";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Book, Globe, School, Users } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Presentation />
        <Supporters />
        <Testimonials />
        <News />

        {/* Section Interactive */}
        <section className="relative py-20 from-amber-50 to-primary">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-primary">
                  Explorez SOS Planète Congo
                </h1>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  Une expérience éducative unique qui combine apprentissage,
                  nature et culture
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="space-y-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/explore.jpg"
                    alt="Explorez SOS Planète Congo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">
                      Découvrez nos activités
                    </h3>
                    <p className="mb-6 text-white/90">
                      Des expériences uniques pour apprendre et grandir
                    </p>
                    <Button className="bg-white text-primary hover:bg-white/90">
                      Explorer les activités
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        {/* Section Statistiques */}
        <section className="relative w-full">
          <div className="bg-primary w-full py-20">
            <ScrollReveal>
              <div className="container mx-auto">
                <div className="flex flex-col text-white items-center justify-center text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-12">
                    Le projet SOS aujourd&apos;hui
                  </h2>
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                      <ScrollReveal key={stat.label} delay={index * 0.1}>
                        <StatCard
                          icon={stat.icon}
                          value={stat.value}
                          label={stat.label}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                  <p className="text-white/80 mt-12 bg-accent/20 px-6 py-2 rounded-full border border-white/20">
                    Depuis le 30 Décembre 2024
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        {/* Section Call to Action */}
        <section className="relative py-20 bg-primary">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-4xl font-bold mb-8">
                  Rejoignez l'aventure
                </h2>
                <p className="text-lg mb-12 text-white/80">
                  Ensemble, construisons un avenir durable pour la RDC
                </p>
                <Link
                  href={"/signIn"}
                  className="bg-white w-full text-primary hover:bg-white/90 text-lg font-semibold font-montserrat rounded-lg px-8 py-4 transition-colors"
                >
                  C'est parti !!!
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const stats = [
  {
    icon: School,
    value: "+1500",
    label: "Écoles et autres institutions",
  },
  {
    icon: Book,
    value: "+2500",
    label: "Livres distribués",
  },
  {
    icon: Users,
    value: "+2500",
    label: "Élèves sensibilisés",
  },
  {
    icon: Globe,
    value: 5,
    label: "Langue de publication",
  },
];

const features = [
  {
    title: "Apprentissage Interactif",
    description:
      "Des activités pratiques et ludiques pour une meilleure compréhension",
    icon: <School className="w-6 h-6 text-primary" />,
  },
  {
    title: "Ressources Bilingues",
    description: "Contenus disponibles en français et en langues nationales",
    icon: <Globe className="w-6 h-6 text-primary" />,
  },
  {
    title: "Support Pédagogique",
    description: "Des outils et guides pour les enseignants et animateurs",
    icon: <Book className="w-6 h-6 text-primary" />,
  },
  {
    title: "Communauté Active",
    description:
      "Rejoignez une communauté engagée pour l'éducation et l'environnement",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
];
