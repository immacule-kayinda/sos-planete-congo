"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useScroll } from "@/hooks/use-scroll";
import { Book, Globe, School, Users, Heart, Target } from "lucide-react";

export default function AboutPage() {
  const scrollY = useScroll();
  const isScrolled = scrollY > 50;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        className={isScrolled ? "backdrop-blur-3xl bg-white/20" : undefined}
      />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sky-50 to-white py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-6">
                  À Propos de SOS Planète Congo
                </h1>
                <p className="text-xl text-neutral-600 mb-8">
                  Une initiative de l'ASBL Texaf Bilembo pour l'éducation
                  environnementale et culturelle en République Démocratique du
                  Congo
                </p>
                {/* Placeholder pour image de présentation */}
                <div className="w-full h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-500">
                    Image de présentation SOS Planète Congo
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Texaf Bilembo */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-sky-700">
                  Texaf Bilembo
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-sky-600">
                      Notre Organisation
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      L'ASBL Texaf Bilembo est une organisation à but non
                      lucratif dédiée à la promotion de l'éducation
                      environnementale et culturelle en République Démocratique
                      du Congo.
                    </p>
                    <p className="text-neutral-600 mb-4">
                      Fondée avec la vision de préserver notre patrimoine
                      naturel et culturel, Texaf Bilembo développe des outils
                      pédagogiques innovants pour sensibiliser les jeunes
                      générations aux enjeux environnementaux du Congo.
                    </p>
                    <p className="text-neutral-600">
                      Notre approche bilingue (français et langues nationales)
                      respecte la diversité culturelle du pays tout en
                      transmettant des valeurs écologiques essentielles.
                    </p>
                  </div>
                  <div className="bg-neutral-200 h-80 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500">
                      Logo / Photo Texaf Bilembo
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Historique du Projet */}
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-sky-700">
                  Historique du Projet
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-sky-600">
                        Genèse du Projet
                      </h3>
                      <p className="text-neutral-600">
                        SOS Planète Congo est né de la volonté de créer des
                        outils éducatifs adaptés au contexte congolais, alliant
                        respect de l'environnement et valorisation des cultures
                        locales.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-sky-600">
                        Développement des Contes
                      </h3>
                      <p className="text-neutral-600">
                        Création d'une série de contes éducatifs bilingues
                        mettant en scène des personnages attachants dans des
                        aventures environnementales captivantes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-sky-600">
                        Plateforme Numérique
                      </h3>
                      <p className="text-neutral-600">
                        Lancement de la plateforme éducative interactive
                        permettant aux élèves et enseignants d'accéder aux
                        ressources pédagogiques et de suivre leur progression.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-sky-600">
                        Expansion Nationale
                      </h3>
                      <p className="text-neutral-600">
                        Déploiement progressif dans les établissements scolaires
                        à travers les différentes provinces de la RDC.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Statistiques d'Impact */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Notre Impact
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Depuis le lancement du projet, SOS Planète Congo touche de
                  plus en plus d'établissements et d'élèves à travers le pays
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-sky-700">
                        {stat.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600 font-medium">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="text-center mt-12">
                <p className="text-sky-600 font-semibold bg-sky-50 px-6 py-3 rounded-full inline-block">
                  Données mises à jour au 30 décembre 2024
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Philosophie Pédagogique */}
        <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Notre Philosophie Pédagogique
                </h2>
                <p className="text-xl text-neutral-600">
                  Une approche innovante qui place l'apprenant au cœur de son
                  apprentissage environnemental et culturel
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pedagogyPrinciples.map((principle, index) => (
                <ScrollReveal key={principle.title} delay={index * 0.1}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <principle.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-sky-700">
                        {principle.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600 text-sm">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section Partenaires */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Nos Partenaires
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  SOS Planète Congo est soutenu par des partenaires engagés dans
                  l'éducation et la protection de l'environnement
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Placeholders pour logos des partenaires */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div
                    key={index}
                    className="bg-neutral-100 h-24 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors"
                  >
                    <span className="text-neutral-500 text-sm">
                      Logo Partenaire {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="text-center mt-12">
                <p className="text-neutral-600 mb-6">
                  Vous souhaitez devenir partenaire de SOS Planète Congo ?
                </p>
                <a
                  href="/help"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contactez-nous
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const impactStats = [
  {
    icon: School,
    value: "+1,500",
    label: "Écoles et institutions",
  },
  {
    icon: Users,
    value: "+2,500",
    label: "Élèves sensibilisés",
  },
  {
    icon: Book,
    value: "+2,500",
    label: "Livres distribués",
  },
  {
    icon: Globe,
    value: "5",
    label: "Provinces couvertes",
  },
];

const pedagogyPrinciples = [
  {
    title: "Apprentissage Actif",
    description:
      "Les élèves participent activement à travers des activités interactives et ludiques qui stimulent leur curiosité naturelle.",
    icon: Target,
  },
  {
    title: "Bilinguisme Culturel",
    description:
      "Respect et valorisation des langues nationales alongside le français pour une éducation culturellement inclusive.",
    icon: Globe,
  },
  {
    title: "Pédagogie du Conte",
    description:
      "Utilisation de la tradition orale congolaise pour transmettre des valeurs environnementales de manière captivante.",
    icon: Book,
  },
  {
    title: "Approche Collaborative",
    description:
      "Encouragement du travail en équipe et de l'entraide pour développer l'esprit communautaire.",
    icon: Heart,
  },
];
