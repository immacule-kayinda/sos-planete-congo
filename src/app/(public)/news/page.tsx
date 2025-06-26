"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { fetchNews, NewsArticle } from "@/lib/news-api";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // Charger toutes les actualités au démarrage
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNews({ published: true });
        setNews(newsData);
      } catch (error) {
        console.error("Erreur lors du chargement des actualités:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Recherche avec délai (debounce)
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          setSearching(true);
          const searchResults = await fetchNews({
            search: searchTerm.trim(),
            published: true,
          });
          setNews(searchResults);
        } catch (error) {
          console.error("Erreur lors de la recherche:", error);
        } finally {
          setSearching(false);
        }
      } else {
        // Si le terme de recherche est vide, recharger toutes les actualités
        const loadAllNews = async () => {
          try {
            setSearching(true);
            const allNews = await fetchNews({ published: true });
            setNews(allNews);
          } catch (error) {
            console.error("Erreur lors du rechargement:", error);
          } finally {
            setSearching(false);
          }
        };
        loadAllNews();
      }
    }, 500); // Délai de 500ms

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary to-primary/90">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat uppercase">
                  Nos Actualités
                </h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Découvrez les dernières nouvelles et événements de SOS Planète
                  Congo
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans les actualités..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {searching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto px-4">
            {loading ? (
              // Skeleton loading
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                  >
                    <div className="relative h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.1}>
                    <Link href={`/news/${item.slug}`} className="group block">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative h-48">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 uppercase font-montserrat">
                            {item.title}
                          </h3>
                          <p className="text-neutral-600 line-clamp-3 mb-4">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                            <span>Lire l'article</span>
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {!loading && news.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">
                  {searchTerm
                    ? `Aucun article trouvé pour "${searchTerm}"`
                    : "Aucune actualité disponible pour le moment."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-6 font-montserrat">
                  Ne manquez aucune actualité
                </h2>
                <p className="text-lg mb-8 text-white/80">
                  Abonnez-vous à notre newsletter pour recevoir les dernières
                  nouvelles de SOS Planète Congo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  />
                  <Button className="bg-white text-primary hover:bg-white/90">
                    S'abonner
                  </Button>
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
