"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import {
  fetchNewsBySlug,
  updateNewsArticle,
  NewsArticle,
} from "@/lib/news-api";

const CATEGORIES = [
  "Éducation",
  "Environnement",
  "Technologie",
  "Culture",
  "Actualités",
  "Événements",
  "Formation",
  "Innovation",
];

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [] as string[],
    published: false,
    featuredImage: "",
  });
  const [newTag, setNewTag] = useState("");

  const loadArticle = useCallback(async () => {
    try {
      setLoading(true);
      const articleData = await fetchNewsBySlug(slug);
      if (articleData) {
        setArticle(articleData);
        setFormData({
          title: articleData.title,
          excerpt: articleData.excerpt,
          content: articleData.content,
          author: articleData.author,
          category: articleData.category,
          tags: articleData.tags,
          published: articleData.published,
          featuredImage: articleData.featuredImage || "",
        });
      } else {
        alert("Article non trouvé");
        router.push("/dashboard/news");
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'article:", error);
      alert("Erreur lors du chargement de l'article");
      router.push("/dashboard/news");
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const success = await updateNewsArticle(slug, formData);
      if (success) {
        router.push("/dashboard/news");
      } else {
        alert("Erreur lors de la mise à jour de l'article");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour de l'article");
    } finally {
      setSaving(false);
    }
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

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <p>Article non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/news">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Modifier l'article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu de l'article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Titre de l'article"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Extrait *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="Résumé court de l'article"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Contenu complet de l'article"
                    rows={12}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Auteur *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    placeholder="Nom de l'auteur"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featuredImage">Image principale</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    placeholder="URL de l'image"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Ajouter un tag"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      size="sm"
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      handleInputChange("published", checked)
                    }
                  />
                  <Label htmlFor="published">Publier l'article</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Titre:</strong> {formData.title || "Non défini"}
                  </div>
                  <div>
                    <strong>Auteur:</strong> {formData.author || "Non défini"}
                  </div>
                  <div>
                    <strong>Catégorie:</strong>{" "}
                    {formData.category || "Non définie"}
                  </div>
                  <div>
                    <strong>Tags:</strong>{" "}
                    {formData.tags.length > 0
                      ? formData.tags.join(", ")
                      : "Aucun"}
                  </div>
                  <div>
                    <strong>Statut:</strong>{" "}
                    <Badge
                      variant={formData.published ? "default" : "secondary"}
                    >
                      {formData.published ? "Publié" : "Brouillon"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/news">
            <Button variant="outline" type="button">
              Annuler
            </Button>
          </Link>
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? (
              "Enregistrement..."
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
