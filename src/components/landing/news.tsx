import { ScrollReveal } from "../ui/scroll-reveal";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function News() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-montserrat uppercase">
              Nos Actualités
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Découvrez les dernières nouvelles et événements de SOS Planète
              Congo
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {news.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link href={item.link} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/2 h-64 md:h-auto">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-8 md:w-1/2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{item.date}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 uppercase font-montserrat">
                            {item.title}
                          </h3>
                          <p className="text-neutral-600 line-clamp-3 mb-6">
                            {item.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                          <span>Lire l'article</span>
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Voir toutes les actualités
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const news = [
  {
    title: "Lancement de la nouvelle édition du livre SOS Planète Congo",
    excerpt:
      "Découvrez la nouvelle version enrichie de notre livre avec plus d'activités et de ressources pédagogiques. Une édition spéciale qui célèbre notre engagement pour l'éducation environnementale en RDC.",
    date: "15 Mars 2024",
    image: "https://placehold.co/600x400",
    link: "/news/book-launch",
  },
  {
    title: "Formation des enseignants à Kinshasa",
    excerpt:
      "Plus de 100 enseignants formés à l'utilisation de nos ressources pédagogiques pour l'année scolaire 2024. Une journée riche en échanges et en apprentissages pour une meilleure transmission des connaissances.",
    date: "10 Mars 2024",
    image: "https://placehold.co/600x400",
    link: "/news/teacher-training",
  },
];
