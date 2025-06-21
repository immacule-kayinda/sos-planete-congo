export interface StorySegment {
  id: number;
  text: string;
  image: string;
  isCorrect: boolean;
}

export interface StoryGame {
  id: number;
  title: string;
  description: string;
  story: StorySegment[];
  correctOrder: number[];
  difficulty: "facile" | "moyen" | "difficile";
  category: "histoire" | "science" | "nature" | "culture";
}

export const storyGames: StoryGame[] = [
  {
    id: 1,
    title: "L'Aventure de la Petite Grenouille",
    description:
      "Reconstitue l'histoire de la petite grenouille qui découvre la forêt",
    story: [
      {
        id: 1,
        text: "Il était une fois une petite grenouille qui vivait dans un étang tranquille.",
        image: "/grenouille.png",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Un jour, elle décida d'explorer la forêt qui bordait son étang.",
        image: "/foret.png",
        isCorrect: true,
      },
      {
        id: 3,
        text: "Elle rencontra un oiseau qui lui montra le chemin.",
        image: "/globe.svg",
        isCorrect: true,
      },
      {
        id: 4,
        text: "La grenouille trouva un trésor caché sous un arbre.",
        image: "/floor.png",
        isCorrect: true,
      },
      {
        id: 5,
        text: "Elle rentra chez elle avec de nouveaux amis.",
        image: "/logo.png",
        isCorrect: true,
      },
      {
        id: 6,
        text: "Un poisson nageait dans l'océan.",
        image: "/window.svg",
        isCorrect: false,
      },
    ],
    correctOrder: [1, 2, 3, 4, 5],
    difficulty: "facile",
    category: "histoire",
  },
  {
    id: 2,
    title: "Le Village en Danger",
    description:
      "Aide à reconstituer l'histoire du village qui fait face à un défi",
    story: [
      {
        id: 1,
        text: "Dans un village paisible, les habitants vivaient heureux.",
        image: "/Conte 2. 11 Village en danger.JPG",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Un jour, une sécheresse menaça leurs récoltes.",
        image: "/bg-green.svg",
        isCorrect: true,
      },
      {
        id: 3,
        text: "Les enfants du village eurent une idée brillante.",
        image: "/canyon.svg",
        isCorrect: true,
      },
      {
        id: 4,
        text: "Ils construisirent un système d'irrigation ensemble.",
        image: "/landing/hero-image.png",
        isCorrect: true,
      },
      {
        id: 5,
        text: "Le village fut sauvé grâce à leur ingéniosité.",
        image: "/landing/bookimage.png",
        isCorrect: true,
      },
      {
        id: 6,
        text: "Un avion volait dans le ciel bleu.",
        image: "/file.svg",
        isCorrect: false,
      },
    ],
    correctOrder: [1, 2, 3, 4, 5],
    difficulty: "moyen",
    category: "histoire",
  },
];

export const getGameById = (id: number): StoryGame | undefined => {
  return storyGames.find((game) => game.id === id);
};

export const getGamesByDifficulty = (difficulty: string): StoryGame[] => {
  return storyGames.filter((game) => game.difficulty === difficulty);
};

export const getGamesByCategory = (category: string): StoryGame[] => {
  return storyGames.filter((game) => game.category === category);
};
