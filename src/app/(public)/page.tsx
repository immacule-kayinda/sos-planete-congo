"use client";

import Header from "@/components/header";
import HeroSection from "@/components/landing/hero_section";
import News from "@/components/landing/news";
import Presentation from "@/components/landing/presentation";
import StatCard from "@/components/landing/stat_card";
import Supporters from "@/components/landing/supporters";
import Testimonials from "@/components/landing/testimonials";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useScroll } from "@/hooks/use-scroll";
import {
  Book,
  Globe,
  School,
  Users,
  GraduationCap,
  Play,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const scrollY = useScroll();
  const isScrolled = scrollY > 704;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        className={isScrolled ? "backdrop-blur-3xl bg-white/20" : undefined}
      />
      <main className="flex-1">
        <HeroSection />
        <Presentation />

        {/* Section Séparation Élève/Enseignant */}
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-6">
                  Choisissez Votre Parcours
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  SOS Planète Congo propose des expériences adaptées à chaque
                  profil
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-sky-700 mb-4">
                      Pour les Élèves
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Découvrez un monde d'apprentissage interactif et ludique
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Contes interactifs bilingues
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Quiz et exercices amusants
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Vocabulaire et langues nationales
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Exercices de maths et sciences
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Découvrir le premier conte
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image
                        src="/landing/teacher.svg"
                        alt="teacher"
                        width={80}
                        height={80}
                        className="w-10 h-10 text-green-600"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-sky-700 mb-4">
                      Pour les Enseignants
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Accédez à des ressources pédagogiques complètes
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Matériel PDF téléchargeable
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-neutral-700">Formations vidéo</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-neutral-700">Suivi des élèves</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-neutral-700">
                        Exercices corrigés
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Rejoignez-nous
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section Vidéo SOS */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-6">
                  Découvrez SOS Planète Congo
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Une présentation vidéo de notre mission par Simon Hardenne
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video bg-neutral-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder pour vidéo YouTube/Vimeo */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                      Vidéo de Présentation SOS
                    </h3>
                    <p className="text-neutral-500">
                      Intégration YouTube/Vimeo - Simon Hardenne
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Photos des Livres */}
        <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-6">
                  Nos Livres
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Découvrez notre collection de contes éducatifs bilingues
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Placeholders pour photos des livres */}
              {[1, 2, 3].map((index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-500">
                        Photo Livre {index}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-sky-700 mb-2">
                        Conte SOS Volume {index}
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        Une aventure environnementale captivante en français et
                        langues nationales
                      </p>
                      <div className="flex gap-2">
                        <a
                          href="https://amazon.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                          Amazon
                        </a>
                        <a
                          href="https://weyrich.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Weyrich
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="text-center mt-12">
                <a
                  href="#"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Achetez le livre
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Supporters />
        <Testimonials />
        <News />

        {/* Section Interactive */}
        <section className="relative py-20 pt-40">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-sky-700 uppercase">
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
                    src="https://placehold.co/1200x768"
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
          <div className="w-full overflow-hidden bg-gradient-to-b from-sky-200 to-transparent py-20">
            <ScrollReveal>
              <div className="container mx-auto">
                <div className="flex flex-col text-primary items-center justify-center text-center">
                  <h2 className="text-3xl md:text-4xl font-black mb-12 font-montserrat text-sky-700 uppercase md:w-1/2">
                    Le projet SOS PLANETE CONGO aujourd&apos;hui
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
                  <p className="text-sky-600 mt-12 bg-white/50 font-bold px-6 py-2 rounded-full border border-sky-100">
                    Depuis le 30 Décembre 2024
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Remerciements aux Partenaires et Appel au Sponsoring */}
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-6">
                  Nos Partenaires & Soutiens
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Merci à tous ceux qui rendent possible la mission de SOS
                  Planète Congo
                </p>
              </div>
            </ScrollReveal>

            {/* Logos des partenaires */}
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="bg-white h-24 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-neutral-400 text-sm">
                      Partenaire {index}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Appel au sponsoring */}
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-sky-700 mb-4">
                    Soutenez Notre Mission
                  </h3>
                  <p className="text-lg text-neutral-600 mb-8">
                    Devenez partenaire de SOS Planète Congo et contribuez à
                    l'éducation environnementale des jeunes générations en RDC
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/help"
                      className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Devenir Partenaire
                    </a>
                    <a
                      href="/about"
                      className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                    >
                      En Savoir Plus
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Call to Action */}
        <section className="relative py-20 bg-white h-auto">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-primary">
                <h2 className="text-4xl font-bold mb-24 font-montserrat">
                  Rejoignez l'aventure
                </h2>
                <Link
                  href={"/signin"}
                  className="text-white w-full bg-primary hover:bg-primary/90 text-base font-semibold font-montserrat rounded-lg px-8 py-4 transition-colors"
                >
                  C'est parti !!!
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="absolute h-fit bottom-0 w-screen flex">
            <Image
              src={"/landing/canyon.svg"}
              width={100}
              height={100}
              alt="Canyon"
              className="w-screen h-auto object-cover"
            />
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
