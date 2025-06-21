# Système de Jeux Éducatifs - SOS Planète Congo

## Vue d'ensemble

Le système de jeux éducatifs permet aux étudiants de s'amuser tout en apprenant à travers des jeux interactifs. Le premier jeu implémenté est un jeu de reconstitution d'histoire.

## Jeu de Reconstitution d'Histoire

### Concept
Le joueur doit sélectionner les segments d'histoire corrects parmi un ensemble de cartes contenant des images et du texte. Certaines cartes font partie de l'histoire, d'autres sont des distracteurs.

### Fonctionnalités
- **Sélection multiple** : Le joueur peut sélectionner plusieurs cartes
- **Feedback visuel** : Les cartes sélectionnées sont mises en évidence
- **Système de score** : Calcul basé sur le nombre de bonnes réponses
- **Résultats détaillés** : Affichage de l'histoire reconstituée par le joueur
- **Possibilité de recommencer** : Bouton pour rejouer le même jeu
- **Sauvegarde des meilleurs scores** : Les meilleurs scores sont conservés

### Structure des données

```typescript
interface StorySegment {
  id: number;
  text: string;
  image: string;
  isCorrect: boolean;
}

interface StoryGame {
  id: number;
  title: string;
  description: string;
  story: StorySegment[];
  correctOrder: number[];
  difficulty: "facile" | "moyen" | "difficile";
  category: "histoire" | "science" | "nature" | "culture";
}
```

### Ajout d'un nouveau jeu

Pour ajouter un nouveau jeu, il suffit de modifier le fichier `src/lib/game-data.ts` :

```typescript
export const storyGames: StoryGame[] = [
  // ... jeux existants ...
  {
    id: 3,
    title: "Nouveau Jeu",
    description: "Description du nouveau jeu",
    story: [
      {
        id: 1,
        text: "Premier segment de l'histoire",
        image: "/chemin/vers/image1.jpg",
        isCorrect: true
      },
      {
        id: 2,
        text: "Segment incorrect (distracteur)",
        image: "/chemin/vers/image2.jpg",
        isCorrect: false
      }
      // ... autres segments
    ],
    correctOrder: [1, 3, 5], // IDs des segments corrects dans l'ordre
    difficulty: "moyen",
    category: "histoire"
  }
];
```

### Composants

#### `SimpleStoryGame`
Composant principal du jeu avec des placeholders pour les images.

#### `StoryReconstructionGame`
Version avancée du composant avec gestion d'erreurs d'images et feedback plus détaillé.

### Interface utilisateur

La page des jeux (`/games`) propose :
- **Onglets de filtrage** : Par difficulté et catégorie
- **Cartes de jeux** : Affichage des jeux disponibles avec métadonnées
- **Système de scores** : Affichage des meilleurs scores par jeu
- **Navigation fluide** : Retour facile à la liste des jeux

### Calcul du score

Le score est calculé comme suit :
```
Score = (Nombre de bonnes réponses / Nombre total de segments corrects) × 100
```

### Messages de feedback

- **90%+** : "Excellent ! Tu as très bien reconstitué l'histoire !"
- **70-89%** : "Bien joué ! Tu as bien compris l'histoire."
- **50-69%** : "Pas mal ! Continue à t'entraîner."
- **<50%** : "N'abandonne pas ! Essaie encore."

## Extensions futures

Le système est conçu pour être facilement extensible :

1. **Nouveaux types de jeux** : Quiz, puzzles, etc.
2. **Système de progression** : Déblocage de jeux
3. **Statistiques détaillées** : Temps de jeu, tentatives, etc.
4. **Mode multijoueur** : Compétition entre étudiants
5. **Personnalisation** : Thèmes visuels, difficulté adaptative

## Utilisation

1. Naviguer vers `/games` dans l'interface étudiant
2. Choisir un jeu dans la liste
3. Sélectionner les segments d'histoire corrects
4. Cliquer sur "Vérifier ma réponse"
5. Consulter les résultats et recommencer si souhaité

## Fichiers principaux

- `src/app/(student)/games/page.tsx` - Page principale des jeux
- `src/components/student/SimpleStoryGame.tsx` - Composant du jeu
- `src/components/student/StoryReconstructionGame.tsx` - Version avancée
- `src/lib/game-data.ts` - Données des jeux 