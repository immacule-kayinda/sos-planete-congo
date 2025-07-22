# Système de Contrôle d'Accès Basé sur les Rôles

Ce système garantit que chaque utilisateur n'accède qu'aux pages qui lui sont autorisées selon son rôle.

## Composants du Système

### 1. Middleware (`middleware.ts`)
- **Protection côté serveur** : Intercepte toutes les requêtes avant qu'elles n'atteignent les pages
- **Redirections automatiques** : Redirige les utilisateurs vers leur espace approprié
- **Routes publiques** : Définit les pages accessibles sans authentification

### 2. RoleGuard Component (`RoleGuard.tsx`)
- **Protection côté client** : Composant React qui protège les pages
- **Vérification en temps réel** : Vérifie les permissions lors du changement de session
- **UI de chargement** : Affiche un loader pendant la vérification

### 3. Hook useRoleNavigation (`use-role-navigation.ts`)
- **Navigation intelligente** : Fonctions utilitaires pour la navigation basée sur les rôles
- **Vérification d'accès** : Méthodes pour vérifier les permissions
- **Redirection** : Navigation automatique vers la page d'accueil appropriée

## Rôles et Permissions

### 👨‍🎓 STUDENT (Étudiant)
**Pages autorisées :**
- `/learn` - Page d'apprentissage principale
- `/exercices` - Exercices et activités
- `/games` - Jeux éducatifs
- `/shop` - Boutique virtuelle
- `/stories` - Histoires et contes
- `/leaderboard` - Classements
- `/profile` - Profil étudiant
- `/guidebook` - Guide d'utilisation
- `/quizz` - Quiz et évaluations

**Page d'accueil :** `/learn`

### 👨‍🏫 TEACHER (Professeur)
**Pages autorisées :**
- `/teacher/*` - Toutes les pages de l'espace enseignant
  - `/teacher/dashboard` - Tableau de bord
  - `/teacher/classes` - Gestion des classes
  - `/teacher/students` - Gestion des étudiants
  - `/teacher/notifications` - Notifications
  - etc.

**Page d'accueil :** `/teacher/dashboard`

### 👨‍💼 ADMIN (Administrateur)
**Pages autorisées :**
- `/dashboard/*` - Toutes les pages de l'espace admin
  - `/dashboard` - Tableau de bord admin
  - `/dashboard/users` - Gestion des utilisateurs
  - `/dashboard/modules` - Gestion des modules
  - `/dashboard/news` - Gestion des actualités
  - etc.

**Page d'accueil :** `/dashboard`

## Utilisation

### Protéger un Layout
```tsx
import { RoleGuard } from "@/components/access-control/RoleGuard";

export default function AdminLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      {/* Contenu du layout admin */}
    </RoleGuard>
  );
}
```

### Utiliser le Hook de Navigation
```tsx
import { useRoleNavigation } from "@/hooks/use-role-navigation";

function MyComponent() {
  const { 
    userRole, 
    getUserHomePage, 
    canAccessRoute,
    navigateToUserHome 
  } = useRoleNavigation();

  // Vérifier si l'utilisateur peut accéder à une route
  if (!canAccessRoute("/admin/users")) {
    // Rediriger ou afficher un message d'erreur
  }

  return (
    <button onClick={navigateToUserHome}>
      Aller à mon espace
    </button>
  );
}
```

## Flux de Fonctionnement

1. **Requête utilisateur** → URL demandée
2. **Middleware** → Vérifie l'authentification et les permissions
3. **Redirection automatique** → Si pas autorisé, redirige vers la page appropriée
4. **RoleGuard** → Protection supplémentaire côté client
5. **Affichage** → Page autorisée affichée

## Sécurité

- **Double protection** : Middleware (serveur) + RoleGuard (client)
- **Redirections intelligentes** : Chaque rôle va vers sa page d'accueil
- **Pas de contenu sensible exposé** : Les utilisateurs non autorisés ne voient jamais le contenu
- **Session persistante** : Vérification continue de la session utilisateur

## Avantages

✅ **Sécurité renforcée** : Aucun utilisateur ne peut accéder à des pages non autorisées
✅ **Expérience utilisateur fluide** : Redirections automatiques vers le bon espace
✅ **Maintenabilité** : Système centralisé et réutilisable
✅ **Performance** : Vérifications optimisées côté serveur et client 