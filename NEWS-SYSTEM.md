# 📰 Système de News/Actualités

## Vue d'ensemble

Le système de news de SOS Planète Congo permet de gérer des articles d'actualités dynamiquement depuis la base de données. Il remplace l'ancien système basé sur des données statiques.

## 🏗️ Architecture

### Base de données
- **Table `News`** : Stockage des articles avec tous les métadonnées
- **Champs** : `id`, `slug`, `title`, `excerpt`, `content`, `image`, `author`, `category`, `tags`, `published`, `createdAt`, `updatedAt`

### API Routes
- `GET /api/news` : Récupérer tous les articles (avec filtres)
- `POST /api/news` : Créer un nouvel article
- `GET /api/news/[slug]` : Récupérer un article spécifique
- `PUT /api/news/[slug]` : Mettre à jour un article
- `DELETE /api/news/[slug]` : Supprimer un article

### Pages
- `/news` : Liste de tous les articles avec recherche
- `/news/[slug]` : Page de détail d'un article
- `/dashboard/news` : Interface d'administration (à créer)

## 🚀 Installation et configuration

### 1. Appliquer les migrations
```bash
npm run setup-news
```

Ou manuellement :
```bash
npx prisma generate
npx prisma migrate dev --name add_news_table
node -r @swc/register prisma/news-seed.ts
```

### 2. Vérifier que la base de données est connectée
Assurez-vous que votre variable d'environnement `NEON_DATABASE_URL` est configurée.

## 📝 Utilisation

### Ajouter un nouvel article

#### Via l'API (programmatiquement)
```javascript
import { createNewsArticle } from '@/lib/news-api';

const newArticle = await createNewsArticle({
  slug: 'mon-nouvel-article',
  title: 'Titre de l\'article',
  excerpt: 'Résumé de l\'article...',
  content: '<p>Contenu HTML de l\'article...</p>',
  image: '/path/to/image.jpg',
  author: 'Nom de l\'auteur',
  category: 'Catégorie',
  tags: ['tag1', 'tag2'],
  published: true
});
```

#### Via la base de données (directement)
```sql
INSERT INTO "News" (
  "slug", "title", "excerpt", "content", "image", 
  "author", "category", "tags", "published", 
  "createdAt", "updatedAt"
) VALUES (
  'mon-article', 'Mon titre', 'Mon résumé', '<p>Mon contenu</p>',
  '/image.jpg', 'Auteur', 'Catégorie', ARRAY['tag1', 'tag2'],
  true, NOW(), NOW()
);
```

### Récupérer les articles

#### Tous les articles publiés
```javascript
import { fetchNews } from '@/lib/news-api';

const articles = await fetchNews({ published: true });
```

#### Avec recherche
```javascript
const articles = await fetchNews({ 
  search: 'mot-clé', 
  published: true 
});
```

#### Un article spécifique
```javascript
import { fetchNewsArticle } from '@/lib/news-api';

const article = await fetchNewsArticle('slug-de-l-article');
```

## 🎨 Fonctionnalités

### ✅ Implémentées
- [x] Système de base de données avec Prisma
- [x] API REST complète (CRUD)
- [x] Pages dynamiques avec Next.js App Router
- [x] Recherche en temps réel
- [x] Gestion des états de chargement
- [x] Articles connexes
- [x] Formatage des dates
- [x] Système de tags et catégories
- [x] Gestion des erreurs 404
- [x] Données d'exemple (seeding)

### 🔄 À implémenter
- [ ] Interface d'administration complète
- [ ] Éditeur de contenu riche (WYSIWYG)
- [ ] Upload d'images
- [ ] Système de commentaires
- [ ] Newsletter automatique
- [ ] SEO optimisé (meta tags)
- [ ] Système de cache
- [ ] Pagination

## 🔧 Maintenance

### Ajouter de nouveaux articles
1. Utilisez l'API ou ajoutez directement en base
2. Assurez-vous que le slug est unique
3. Testez l'affichage sur `/news/[slug]`

### Modifier le schéma
1. Modifiez `prisma/schema.prisma`
2. Créez une migration : `npx prisma migrate dev`
3. Mettez à jour les types TypeScript

### Mettre à jour les données d'exemple
1. Modifiez `prisma/news-seed.ts`
2. Exécutez : `node -r @swc/register prisma/news-seed.ts`

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez `NEON_DATABASE_URL` dans `.env`
- Assurez-vous que la base de données est accessible

### Articles qui ne s'affichent pas
- Vérifiez que `published: true`
- Vérifiez les logs de l'API dans la console

### Erreurs de migration
- Reset complet : `npx prisma migrate reset`
- Puis réappliquez : `npx prisma migrate dev`

## 📊 Structure des données

```typescript
interface NewsArticle {
  id: string;
  slug: string;           // URL unique
  title: string;          // Titre de l'article
  excerpt: string;        // Résumé court
  content: string;        // Contenu HTML complet
  image: string;          // URL de l'image
  author: string;         // Nom de l'auteur
  category: string;       // Catégorie (Éducation, Formation, etc.)
  tags: string[];         // Tags pour la recherche
  published: boolean;     // Statut de publication
  createdAt: string;      // Date de création
  updatedAt: string;      // Date de modification
}
```

## 🔗 Liens utiles

- **Landing page** : `/` (section actualités)
- **Liste des articles** : `/news`
- **Article exemple** : `/news/lancement-nouvelle-edition-livre`
- **API docs** : `/api/news` 