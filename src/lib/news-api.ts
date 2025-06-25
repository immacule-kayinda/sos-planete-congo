export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  featuredImage?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = "/api/news";

// Récupérer toutes les actualités
export async function fetchNews(options?: {
  search?: string;
  limit?: number;
  published?: boolean;
}): Promise<NewsArticle[]> {
  try {
    const params = new URLSearchParams();

    if (options?.search) {
      params.append("search", options.search);
    }
    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options?.published !== undefined) {
      params.append("published", options.published.toString());
    }

    const url = `${API_BASE_URL}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Next.js app router cache configuration
      cache: "no-store", // Pour toujours avoir les dernières données
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des actualités:", error);
    // En cas d'erreur, retourner un tableau vide pour éviter que l'app plante
    return [];
  }
}

// Récupérer un article spécifique par son slug
export async function fetchNewsArticle(
  slug: string
): Promise<NewsArticle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    return null;
  }
}

// Alias pour fetchNewsArticle (pour la compatibilité avec l'admin)
export async function fetchNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  return fetchNewsArticle(slug);
}

// Récupérer les articles connexes (exclut l'article actuel)
export async function fetchRelatedNews(
  currentSlug: string,
  limit: number = 2
): Promise<NewsArticle[]> {
  try {
    const allNews = await fetchNews({ limit: limit + 5 }); // Récupérer un peu plus pour filtrer

    // Filtrer l'article actuel et limiter le nombre de résultats
    const relatedNews = allNews
      .filter((article) => article.slug !== currentSlug)
      .slice(0, limit);

    return relatedNews;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles connexes:",
      error
    );
    return [];
  }
}

// Créer un nouvel article (pour l'admin)
export async function createNewsArticle(
  articleData: Omit<NewsArticle, "id" | "createdAt" | "updatedAt" | "slug">
): Promise<boolean> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    return false;
  }
}

// Mettre à jour un article (pour l'admin)
export async function updateNewsArticle(
  slug: string,
  updates: Partial<Omit<NewsArticle, "id" | "slug" | "createdAt" | "updatedAt">>
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article:", error);
    return false;
  }
}

// Supprimer un article (pour l'admin)
export async function deleteNewsArticle(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return false;
  }
}
