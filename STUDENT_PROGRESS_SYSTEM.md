# Système de Progression et Leaderboard pour Étudiants

## Vue d'ensemble

Ce système permet de suivre la progression des étudiants à travers les chapitres du cours et d'afficher des classements basés sur leurs performances.

## Architecture

### 🗄️ Modèles de base de données

#### `StudentChapterProgress`
- Suit la progression d'un étudiant dans chaque chapitre
- `isRead`: Le chapitre a été terminé
- `isCurrent`: Le chapitre actuellement en cours
- Relation unique étudiant-chapitre

#### `StudentPerformance`
- Enregistre les performances pour chaque chapitre terminé
- `stars`: Note de 0 à 5 étoiles
- `timeSpent`: Temps passé en secondes
- `accuracy`: Précision de 0 à 1 (0-100%)

#### `StudentStreak`
- Gère les séries de jours consécutifs d'activité
- `currentStreak`: Nombre de jours consécutifs
- `lastActive`: Dernière date d'activité

### 🔧 APIs disponibles

#### `/api/student/progress`
- **GET**: Récupère la progression d'un étudiant
- **POST**: Met à jour la progression (marquer chapitre actuel/lu)

#### `/api/student/performance`
- **POST**: Enregistre une performance pour un chapitre

#### `/api/leaderboard`
- **GET**: Récupère différents types de classements
- Paramètres: `type` (global, classroom, streak), `limit`

### 🎯 Composants React

#### `ProgressTracker`
- Affiche la progression complète de l'étudiant
- Organisé par sections > modules > chapitres
- Statistiques globales (progression, étoiles, précision)
- Actions pour marquer les chapitres comme actuels

#### `Leaderboard`
- Trois types de classements: Global, Classe, Séries
- Interface avec onglets
- Mise en évidence de l'utilisateur actuel
- Actualisation en temps réel

#### `ChapterCompletion` (Exemple)
- Simulation de complétion de chapitre
- Différents niveaux de performance
- Intégration avec l'API de performance

### 📊 Système de scoring

#### Score composite (Leaderboard Global/Classe)
```
Score = (Étoiles totales × 100) + (Précision moyenne × 10)
```

#### Gestion des streaks
- Série s'incrémente si activité le jour suivant
- Série se remet à 1 si plus d'un jour d'inactivité
- Série reste identique si activité le même jour

## 🚀 Utilisation

### 1. Initialiser la progression d'un étudiant
```typescript
import { initializeStudentProgress } from '@/lib/student-progress';

const chaptersCount = await initializeStudentProgress(studentId);
```

### 2. Enregistrer une performance
```typescript
import { recordStudentPerformance } from '@/lib/student-progress';

await recordStudentPerformance(studentId, {
  chapterId: "chapter-id",
  stars: 4,
  timeSpent: 600, // en secondes
  accuracy: 0.85 // 85%
});
```

### 3. Mettre à jour la progression
```typescript
import { updateStudentProgress } from '@/lib/student-progress';

await updateStudentProgress(studentId, {
  chapterId: "chapter-id",
  isCurrent: true
});
```

### 4. Obtenir les statistiques
```typescript
import { getStudentStats } from '@/lib/student-progress';

const stats = await getStudentStats(studentId);
// {
//   totalStars: 45,
//   completedChapters: 12,
//   totalChapters: 20,
//   avgAccuracy: 78,
//   currentStreak: 5,
//   progressPercentage: 60
// }
```

## 🎨 Pages disponibles

### `/dashboard` (Étudiants)
- Vue d'ensemble de la progression
- Onglet "Progression" avec `ProgressTracker`
- Onglet "Statistiques" avec résumé personnel

### `/leaderboard` (Étudiants)
- Classements complets
- Comparaison avec autres étudiants
- Trois types de classements

## 🔄 Flux de données

1. **Nouvelle inscription étudiant** → Initialisation de la progression
2. **Chapitre terminé** → Enregistrement performance + Mise à jour progression + Calcul streak
3. **Changement chapitre actuel** → Mise à jour progression (désactivation autres chapitres)
4. **Consultation classements** → Calcul scores en temps réel

## 🎯 Fonctionnalités clés

- ✅ Suivi complet de progression par chapitre
- ✅ Système d'étoiles et de précision
- ✅ Streaks de motivation
- ✅ Classements multiples (global, classe, streaks)
- ✅ Interface utilisateur intuitive
- ✅ APIs RESTful
- ✅ Gestion d'erreurs robuste
- ✅ Mise à jour en temps réel
- ✅ Helpers TypeScript pour faciliter l'intégration

## 🔧 Extensions possibles

- Badges et achievements
- Graphiques de progression temporelle
- Notifications de streak
- Défis entre étudiants
- Export des données de progression
- Analytics pour les enseignants
