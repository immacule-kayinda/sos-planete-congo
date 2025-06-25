"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, ArrowLeft, Share2, User, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchNewsArticle,
  fetchRelatedNews,
  NewsArticle,
} from "@/lib/news-api";
import { useState, useEffect } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsArticlePage({ params }: PageProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(false);

        // Charger l'article principal
        const articleData = await fetchNewsArticle(params.slug);

        if (!articleData) {
          setError(true);
          return;
        }

        setArticle(articleData);

        // Charger les articles connexes
        const relatedData = await fetchRelatedNews(params.slug, 2);
        setRelatedArticles(relatedData);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [params.slug]);

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Loading skeleton */}
          <section className="relative py-20 bg-gradient-to-b from-primary to-primary/90">
            <div className="container mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto">
                <div className="h-8 bg-white/20 rounded mb-8 w-48"></div>
                <div className="text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-4 bg-white/20 rounded w-32"></div>
                    <div className="h-4 bg-white/20 rounded w-40"></div>
                    <div className="h-6 bg-white/20 rounded w-24"></div>
                  </div>
                  <div className="h-12 bg-white/20 rounded mb-6"></div>
                  <div className="h-6 bg-white/20 rounded max-w-3xl"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative h-96 mb-12 rounded-2xl overflow-hidden bg-gray-200 animate-pulse"></div>
                <div className="space-y-4">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary to-primary/90">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour aux actualités
                </Link>
                <div className="text-white">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4" />
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat uppercase leading-tight text-white">
                    {article.title}
                  </h1>
                  <p className="text-lg text-white/80 max-w-3xl">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </ScrollReveal>

              {/* Tags */}
              <ScrollReveal>
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                  <span className="text-sm text-gray-600 mr-4">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* Share Section */}
              <ScrollReveal>
                <div className="flex items-center justify-between border-t border-gray-200 pt-8 mt-8">
                  <div className="text-sm text-gray-600">
                    Publié le {formatDate(article.createdAt)} par{" "}
                    {article.author}
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-center text-primary mb-12">
                  Autres actualités
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {relatedArticles.map((relatedArticle, index) => (
                    <ScrollReveal key={relatedArticle.slug} delay={index * 0.1}>
                      <Link
                        href={`/news/${relatedArticle.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                              {relatedArticle.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {formatDate(relatedArticle.createdAt)}
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {relatedArticle.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}

                  {/* Link to all news */}
                  <div className="md:col-span-2 text-center mt-8">
                    <Link href="/news">
                      <Button className="bg-primary hover:bg-primary/90">
                        Voir toutes les actualités
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
