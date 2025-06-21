"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-primary">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Nos Activités
                </h1>
                <p className="text-lg text-white/80">
                  Découvrez nos programmes éducatifs et nos événements pour la
                  protection de l'environnement
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Link href={`/activities/${activity.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={activity.image}
                          alt={activity.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-primary">
                          {activity.title}
                        </h3>
                        <p className="text-neutral-600 mb-4">
                          {activity.description}
                        </p>
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-sm text-neutral-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {activity.date}
                          </div>
                          <div className="flex items-center text-sm text-neutral-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            {activity.location}
                          </div>
                          <div className="flex items-center text-sm text-neutral-500">
                            <Users className="w-4 h-4 mr-2" />
                            {activity.participants}
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          En savoir plus
                        </Button>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-20 bg-primary">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Vous souhaitez participer à nos activités ?
                </h2>
                <p className="text-lg mb-8 text-white/80">
                  Rejoignez-nous pour contribuer à la protection de
                  l'environnement et à l'éducation des jeunes
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                  Nous contacter
                </Button>
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
  },
  {
    slug: "nettoyage-communaute",
    title: "Nettoyage Communautaire",
    description: "Opérations de nettoyage des espaces publics",
    image: "/images/activities/nettoyage.jpg",
    date: "Dernier samedi du mois",
    location: "Quartiers de Kinshasa",
    participants: "200-300 volontaires",
  },
  {
    slug: "ateliers-creatifs",
    title: "Ateliers Créatifs",
    description: "Ateliers de recyclage et d'art environnemental",
    image: "/images/activities/ateliers.jpg",
    date: "Tous les samedis",
    location: "Centre culturel SOS Planète",
    participants: "30-50 enfants",
  },
  {
    slug: "conferences-debats",
    title: "Conférences et Débats",
    description: "Tables rondes sur les enjeux environnementaux",
    image: "/images/activities/conferences.jpg",
    date: "Un jeudi par mois",
    location: "Auditorium principal",
    participants: "100-150 participants",
  },
];
