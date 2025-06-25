export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "book-launch",
    title: "Lancement de la nouvelle édition du livre SOS Planète Congo",
    excerpt:
      "Découvrez la nouvelle version enrichie de notre livre avec plus d'activités et de ressources pédagogiques. Une édition spéciale qui célèbre notre engagement pour l'éducation environnementale en RDC.",
    date: "15 Mars 2024",
    image: "/landing/bookimage-removebg-preview.png",
    author: "Équipe SOS Planète Congo",
    category: "Éducation",
    tags: ["livre", "éducation", "ressources pédagogiques"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      Nous sommes ravis d'annoncer le lancement de la nouvelle édition de notre livre éducatif 
      "SOS Planète Congo". Cette version enrichie représente une étape importante dans notre 
      mission d'éducation environnementale en République Démocratique du Congo.
    </p>

    <h2 class="text-3xl font-bold text-primary mb-6">Qu'est-ce qui est nouveau ?</h2>
    
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div class="bg-amber-50 p-6 rounded-xl">
        <h3 class="text-xl font-bold text-primary mb-4">Contenu enrichi</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• 50+ nouvelles activités pratiques</li>
          <li>• Exercices interactifs modernisés</li>
          <li>• Illustrations colorées et attractives</li>
          <li>• QR codes pour contenus numériques</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-6 rounded-xl">
        <h3 class="text-xl font-bold text-primary mb-4">Approche multilingue</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• Contenu en français et langues nationales</li>
          <li>• Glossaire enrichi</li>
          <li>• Expressions culturelles locales</li>
          <li>• Adaptation aux contextes régionaux</li>
        </ul>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-primary mb-6">Pour qui est ce livre ?</h2>
    <p class="text-gray-700 mb-6">
      Cette nouvelle édition s'adresse à un large public : élèves du primaire et secondaire, 
      enseignants, parents, et tous ceux qui souhaitent contribuer à l'éducation environnementale 
      au Congo. Le livre propose des activités adaptées à différents niveaux d'apprentissage.
    </p>

    <h2 class="text-3xl font-bold text-primary mb-6">Impact attendu</h2>
    <p class="text-gray-700 mb-6">
      Avec cette nouvelle édition, nous espérons atteindre plus de 10 000 élèves dans les 
      écoles partenaires à travers le pays. Le livre servira de guide pratique pour sensibiliser 
      les jeunes générations aux enjeux environnementaux et culturels de la RDC.
    </p>

    <div class="bg-primary/10 p-8 rounded-xl mb-12">
      <h3 class="text-2xl font-bold text-primary mb-4">Comment se procurer le livre ?</h3>
      <p class="text-gray-700 mb-6">
        Le livre sera disponible dans les écoles partenaires dès le mois d'avril 2024. 
        Les enseignants peuvent également télécharger des extraits et des ressources 
        complémentaires depuis notre plateforme en ligne.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <button class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
          Commander le livre
        </button>
        <button class="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg">
          Télécharger des extraits
        </button>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-primary mb-6">Témoignages</h2>
    <div class="space-y-6 mb-12">
      <blockquote class="border-l-4 border-primary pl-6 italic text-gray-700">
        "Cette nouvelle édition apporte une dimension pratique remarquable à l'enseignement 
        de l'environnement. Mes élèves sont plus engagés que jamais !"
        <footer class="mt-2 text-sm text-gray-600">
          — Marie Kalombo, Enseignante à Kinshasa
        </footer>
      </blockquote>
      
      <blockquote class="border-l-4 border-primary pl-6 italic text-gray-700">
        "L'approche multilingue permet enfin à nos enfants d'apprendre dans leur langue 
        maternelle tout en maîtrisant le français. C'est révolutionnaire !"
        <footer class="mt-2 text-sm text-gray-600">
          — Jean Mukendi, Directeur d'école à Lubumbashi
        </footer>
      </blockquote>
    </div>
    `,
  },
  {
    slug: "teacher-training",
    title: "Formation des enseignants à Kinshasa",
    excerpt:
      "Plus de 100 enseignants formés à l'utilisation de nos ressources pédagogiques pour l'année scolaire 2024. Une journée riche en échanges et en apprentissages pour une meilleure transmission des connaissances.",
    date: "10 Mars 2024",
    image: "https://placehold.co/600x400",
    author: "Équipe Formation SOS Planète Congo",
    category: "Formation",
    tags: ["formation", "enseignants", "pédagogie"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      Le week-end dernier, SOS Planète Congo a organisé une session de formation intensive 
      à destination des enseignants de la région de Kinshasa. Plus de 100 éducateurs ont 
      participé à cette journée exceptionnelle dédiée à l'amélioration des pratiques pédagogiques 
      en éducation environnementale.
    </p>

    <h2 class="text-3xl font-bold text-primary mb-6">Objectifs de la formation</h2>
    <p class="text-gray-700 mb-6">
      Cette formation visait à familiariser les enseignants avec nos nouvelles ressources 
      pédagogiques et à leur donner les outils nécessaires pour intégrer efficacement 
      l'éducation environnementale dans leurs programmes scolaires.
    </p>

    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <div class="bg-blue-50 p-6 rounded-xl text-center">
        <div class="text-3xl font-bold text-primary mb-2">100+</div>
        <div class="text-gray-700">Enseignants formés</div>
      </div>
      <div class="bg-green-50 p-6 rounded-xl text-center">
        <div class="text-3xl font-bold text-primary mb-2">8h</div>
        <div class="text-gray-700">Heures de formation</div>
      </div>
      <div class="bg-amber-50 p-6 rounded-xl text-center">
        <div class="text-3xl font-bold text-primary mb-2">15</div>
        <div class="text-gray-700">Écoles représentées</div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-primary mb-6">Programme de la journée</h2>
    <ul class="space-y-4 text-gray-700 mb-8">
      <li>• <strong>9h00-10h30 :</strong> Présentation des nouvelles ressources SOS Planète Congo</li>
      <li>• <strong>10h45-12h15 :</strong> Ateliers pratiques d'utilisation du livre éducatif</li>
      <li>• <strong>14h00-15h30 :</strong> Techniques d'animation et d'engagement des élèves</li>
      <li>• <strong>15h45-17h00 :</strong> Échanges d'expériences et planification des activités</li>
    </ul>

    <h2 class="text-3xl font-bold text-primary mb-6">Retours des participants</h2>
    <p class="text-gray-700 mb-6">
      Les enseignants ont exprimé leur satisfaction quant à la qualité de la formation 
      et l'utilité des outils mis à leur disposition. Beaucoup ont déjà planifié 
      l'intégration de ces ressources dans leurs cours dès la rentrée.
    </p>

    <blockquote class="border-l-4 border-primary pl-6 italic text-gray-700 mb-8">
      "Cette formation m'a donné confiance pour aborder les sujets environnementaux 
      avec mes élèves. Les ressources sont vraiment adaptées à notre contexte local."
      <footer class="mt-2 text-sm text-gray-600">
        — Professeur Mbaki, École primaire de Lemba
      </footer>
    </blockquote>

    <h2 class="text-3xl font-bold text-primary mb-6">Prochaines étapes</h2>
    <p class="text-gray-700 mb-6">
      Suite au succès de cette première session, nous planifions déjà les prochaines 
      formations dans d'autres villes du Congo. L'objectif est de former plus de 
      500 enseignants d'ici la fin de l'année 2024.
    </p>
    `,
  },
  {
    slug: "unesco-partnership",
    title: "Nouveau partenariat avec l'UNESCO",
    excerpt:
      "SOS Planète Congo renforce sa mission éducative grâce à un nouveau partenariat stratégique avec l'UNESCO pour le développement de contenus pédagogiques innovants.",
    date: "5 Mars 2024",
    image: "https://placehold.co/600x400",
    author: "Direction SOS Planète Congo",
    category: "Partenariat",
    tags: ["UNESCO", "partenariat", "éducation"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      Nous sommes fiers d'annoncer la signature d'un accord de partenariat stratégique 
      avec l'UNESCO pour renforcer l'éducation environnementale en République Démocratique du Congo.
    </p>

    <h2 class="text-3xl font-bold text-primary mb-6">Un partenariat prometteur</h2>
    <p class="text-gray-700 mb-6">
      Ce partenariat permettra de développer des contenus éducatifs de qualité internationale 
      tout en respectant les spécificités culturelles et linguistiques du Congo.
    </p>
    `,
  },
  {
    slug: "art-contest",
    title: "Concours national d'art environnemental",
    excerpt:
      "Lancement du premier concours national d'art environnemental pour sensibiliser les jeunes à la protection de l'environnement en République Démocratique du Congo.",
    date: "28 Février 2024",
    image: "https://placehold.co/600x400",
    author: "Équipe Événements SOS Planète Congo",
    category: "Concours",
    tags: ["concours", "art", "jeunes", "créativité"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      SOS Planète Congo lance le premier concours national d'art environnemental 
      destiné aux jeunes de 8 à 18 ans. Une initiative créative pour sensibiliser 
      à la protection de l'environnement.
    </p>
    `,
  },
  {
    slug: "tree-planting",
    title: "Plantation de 1000 arbres à Lubumbashi",
    excerpt:
      "Une initiative communautaire remarquable : la plantation de 1000 arbres dans la ville de Lubumbashi avec la participation de plus de 200 étudiants et enseignants.",
    date: "20 Février 2024",
    image: "https://placehold.co/600x400",
    author: "Équipe Terrain Lubumbashi",
    category: "Action environnementale",
    tags: ["plantation", "arbres", "communauté", "Lubumbashi"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      Une journée mémorable à Lubumbashi avec la plantation de 1000 arbres par 
      notre communauté éducative. Plus de 200 participants ont contribué à cette 
      action environnementale d'envergure.
    </p>
    `,
  },
  {
    slug: "online-platform",
    title: "Nouvelle plateforme d'apprentissage en ligne",
    excerpt:
      "Découvrez notre nouvelle plateforme d'apprentissage en ligne avec des cours interactifs, des jeux éducatifs et des ressources multimédia pour tous les âges.",
    date: "15 Février 2024",
    image: "https://placehold.co/600x400",
    author: "Équipe Développement SOS Planète Congo",
    category: "Technologie",
    tags: ["plateforme", "apprentissage", "numérique", "innovation"],
    content: `
    <p class="text-xl text-gray-700 mb-8 leading-relaxed">
      Lancement officiel de notre nouvelle plateforme d'apprentissage en ligne, 
      offrant une expérience éducative immersive et interactive pour tous les 
      apprenants congolais.
    </p>
    `,
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit: number = 2
): NewsArticle[] {
  return newsArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
}
