"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ActivityDetailPage() {
  const params = useParams();
  const activity = activities.find((a) => a.slug === params.slug);

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Activité non trouvée
            </h1>
            <Link href="/activities">
              <Button className="bg-primary hover:bg-primary/90">
                Retour aux activités
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-4xl">
                  <Link
                    href="/activities"
                    className="inline-flex items-center text-white mb-6 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux activités
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {activity.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {activity.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {activity.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {activity.participants}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold text-primary mb-6">
                      À propos de cette activité
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8">
                      {activity.description}
                    </p>
                    <div className="space-y-6">
                      {activity.details.map((detail, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold mb-3">
                            {detail.title}
                          </h3>
                          <p className="text-neutral-600">{detail.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ScrollReveal>
                  <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-primary mb-6">
                      Informations pratiques
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-primary mt-1 mr-3" />
                        <div>
                          <h4 className="font-semibold">Durée</h4>
                          <p className="text-neutral-600">
                            {activity.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="w-5 h-5 text-primary mt-1 mr-3" />
                        <div>
                          <h4 className="font-semibold">Prérequis</h4>
                          <p className="text-neutral-600">
                            {activity.prerequisites}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          S'inscrire à cette activité
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Related Activities */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                Autres activités qui pourraient vous intéresser
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .filter((a) => a.slug !== activity.slug)
                  .slice(0, 3)
                  .map((relatedActivity, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <Link href={`/activities/${relatedActivity.slug}`}>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={relatedActivity.image}
                              alt={relatedActivity.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3 text-primary">
                              {relatedActivity.title}
                            </h3>
                            <p className="text-neutral-600 mb-4">
                              {relatedActivity.description}
                            </p>
                            <div className="flex items-center text-sm text-neutral-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              {relatedActivity.date}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const activities = [
  {
    slug: "sensibilisation-environnement",
    title: "Sensibilisation à l'Environnement",
    description:
      "Programme éducatif pour sensibiliser les jeunes à la protection de l'environnement",
    image: "/images/activities/sensibilisation.jpg",
    date: "Tous les mercredis",
    location: "Écoles partenaires",
    participants: "50-100 élèves par session",
    duration: "2 heures par session",
    prerequisites: "Aucun prérequis nécessaire",
    details: [
      {
        title: "Objectifs",
        content:
          "Sensibiliser les jeunes aux enjeux environnementaux et leur donner les outils pour agir au quotidien. Le programme comprend des ateliers pratiques, des jeux éducatifs et des discussions interactives.",
      },
      {
        title: "Programme",
        content:
          "Introduction aux concepts environnementaux, ateliers pratiques sur le recyclage, jeux de rôle sur la protection de l'environnement, et session de questions-réponses.",
      },
      {
        title: "Bénéfices",
        content:
          "Les participants développeront une conscience environnementale, apprendront des gestes écologiques quotidiens et deviendront des ambassadeurs de la protection de l'environnement dans leur communauté.",
      },
    ],
  },
  {
    slug: "plantation-arbres",
    title: "Plantation d'Arbres",
    description:
      "Journées de plantation d'arbres pour restaurer les espaces verts",
    image: "/images/activities/plantation.jpg",
    date: "Premier samedi du mois",
    location: "Différents sites à Kinshasa",
    participants: "100-200 participants",
    duration: "4 heures",
    prerequisites: "Tenue confortable et chaussures de marche",
    details: [
      {
        title: "Objectifs",
        content:
          "Contribuer à la reforestation urbaine et sensibiliser la communauté à l'importance des arbres dans l'écosystème urbain.",
      },
      {
        title: "Programme",
        content:
          "Formation sur les techniques de plantation, mise en pratique, et suivi des arbres plantés.",
      },
      {
        title: "Impact",
        content:
          "Chaque session permet de planter 50 à 100 arbres, contribuant ainsi à la création d'espaces verts durables dans la ville.",
      },
    ],
  },
  {
    slug: "formation-enseignants",
    title: "Formation des Enseignants",
    description:
      "Sessions de formation pour les enseignants sur l'éducation environnementale",
    image: "/images/activities/formation.jpg",
    date: "Pendant les vacances scolaires",
    location: "Centre de formation SOS Planète",
    participants: "30-50 enseignants",
    duration: "5 jours",
    prerequisites: "Être enseignant en activité",
    details: [
      {
        title: "Objectifs",
        content:
          "Former les enseignants à intégrer l'éducation environnementale dans leur programme scolaire.",
      },
      {
        title: "Programme",
        content:
          "Modules théoriques et pratiques, ateliers de création de supports pédagogiques, et sessions de mise en situation.",
      },
      {
        title: "Certification",
        content:
          "Les participants reçoivent un certificat de formation en éducation environnementale.",
      },
    ],
  },
];
