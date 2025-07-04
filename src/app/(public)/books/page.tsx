"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useScroll } from "@/hooks/use-scroll";
import { Book, ExternalLink, Globe } from "lucide-react";

export default function BooksPage() {
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
                  Nos Livres
                </h1>
                <p className="text-xl text-neutral-600 mb-8">
                  Découvrez notre collection de contes éducatifs bilingues pour
                  sensibiliser à la protection de l'environnement
                </p>
                <div className="flex items-center justify-center gap-2 text-sky-600">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">
                    Disponibles en français et langues nationales
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Collection de Livres */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Collection SOS Planète Congo
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Chaque livre raconte une aventure captivante qui sensibilise
                  les jeunes aux enjeux environnementaux du Congo
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {books.map((book, index) => (
                <ScrollReveal key={book.id} delay={index * 0.1}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center relative">
                      {/* Placeholder pour image du livre */}
                      <div className="text-center">
                        <Book className="w-16 h-16 text-neutral-400 mx-auto mb-2" />
                        <span className="text-neutral-500">
                          Photo {book.title}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-sky-700">
                        {book.title}
                      </CardTitle>
                      <CardDescription>{book.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-sky-600 mb-2">
                          Langues disponibles :
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {book.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-sky-600 mb-3">
                          Où acheter :
                        </h4>
                        <div className="flex flex-col gap-2">
                          <a
                            href={book.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Amazon
                          </a>
                          <a
                            href={book.weyrichLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Weyrich Édition
                          </a>
                          <a
                            href={book.otherLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 border border-sky-600 text-sky-600 py-2 px-4 rounded-lg font-semibold hover:bg-sky-50 transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Autres libraires
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section Présentation des Contes */}
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Pourquoi nos Contes ?
                </h2>
                <p className="text-xl text-neutral-600 mb-12">
                  Une approche pédagogique unique qui allie tradition orale et
                  sensibilisation environnementale
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-sky-700">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-sky-700 mb-6">
                  Commandez vos Exemplaires
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  Offrez à vos enfants ou élèves une expérience de lecture
                  enrichissante qui les sensibilise à la protection de notre
                  planète
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Commander sur Amazon
                  </a>
                  <a
                    href="/help"
                    className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Nous Contacter
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const books = [
  {
    id: 1,
    title: "SOS Planète Congo - Volume 1",
    description:
      "La première aventure environnementale de nos héros qui découvrent l'importance de préserver la forêt congolaise.",
    languages: ["Français", "Lingala", "Kikongo", "Tshiluba", "Swahili"],
    amazonLink: "https://amazon.com",
    weyrichLink: "https://weyrich.com",
    otherLink: "#",
  },
  {
    id: 2,
    title: "SOS Planète Congo - Volume 2",
    description:
      "Nos personnages partent à la découverte des rivières et apprennent l'importance de protéger les ressources en eau.",
    languages: ["Français", "Lingala", "Kikongo", "Tshiluba", "Swahili"],
    amazonLink: "https://amazon.com",
    weyrichLink: "https://weyrich.com",
    otherLink: "#",
  },
  {
    id: 3,
    title: "SOS Planète Congo - Volume 3",
    description:
      "Une aventure passionnante sur la biodiversité congolaise et les gestes pour protéger les animaux sauvages.",
    languages: ["Français", "Lingala", "Kikongo", "Tshiluba", "Swahili"],
    amazonLink: "https://amazon.com",
    weyrichLink: "https://weyrich.com",
    otherLink: "#",
  },
];

const features = [
  {
    title: "Éducation Bilingue",
    description:
      "Chaque conte est disponible en français et dans les principales langues nationales du Congo.",
    icon: Globe,
  },
  {
    title: "Valeurs Environnementales",
    description:
      "Des histoires captivantes qui transmettent des messages forts sur la protection de l'environnement.",
    icon: Book,
  },
  {
    title: "Tradition Orale",
    description:
      "Respect et valorisation de la tradition du conte, pilier culturel de la société congolaise.",
    icon: Book,
  },
];
