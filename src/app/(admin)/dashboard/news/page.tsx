"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";
import { NewsArticle, fetchNews, deleteNewsArticle } from "@/lib/news-api";

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    const filtered = news.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [news, searchTerm]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const newsData = await fetchNews({ published: false }); // Récupérer tous les articles
      setNews(newsData);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const success = await deleteNewsArticle(slug);
      if (success) {
        setNews(news.filter((article) => article.slug !== slug));
      } else {
        alert("Erreur lors de la suppression de l'article");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Actualités</h1>
        <Link href="/dashboard/news/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {news.filter((article) => article.published).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {news.filter((article) => !article.published).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {new Set(news.map((article) => article.category)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        {filteredNews.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <Badge
                      variant={article.published ? "default" : "secondary"}
                    >
                      {article.published ? "Publié" : "Brouillon"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <span>•</span>
                    <span>{article.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/news/${article.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                  </Link>
                  <Link href={`/dashboard/news/${article.slug}/edit`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(article.slug)}
                    className="gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? `Aucun article trouvé pour "${searchTerm}"`
              : "Aucun article trouvé. Créez votre premier article !"}
          </p>
        </div>
      )}
    </div>
  );
}
