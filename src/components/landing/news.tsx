"use client";

import { ScrollReveal } from "../ui/scroll-reveal";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchNews, NewsArticle } from "@/lib/news-api";

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews({ limit: 2, published: true });
        setNews(newsData);
      } catch (error) {
        console.error("Erreur lors du chargement des actualités:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-blue-100">
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
              {/* Skeleton loading */}
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/2 h-64 md:h-auto bg-gray-200"></div>
                    <div className="p-8 md:w-1/2 flex flex-col justify-between">
                      <div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-6"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-100">
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
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <Link href={`/news/${item.slug}`} className="group block">
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
                            <span>{formatDate(item.createdAt)}</span>
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

          {news.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">
                Aucune actualité disponible pour le moment.
              </p>
            </div>
          )}

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
