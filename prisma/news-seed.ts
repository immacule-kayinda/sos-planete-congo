import prisma from "@/lib/prisma";

async function seedNews() {
  console.log("🌱 Seeding news articles...");

  const newsArticles = [
    {
      slug: "lancement-nouvelle-edition-livre",
      title: "Lancement de la nouvelle édition du livre SOS Planète Congo",
      excerpt:
        "Découvrez la nouvelle version enrichie de notre livre avec plus d'activités et de ressources pédagogiques. Une édition spéciale qui célèbre notre engagement pour l'éducation environnementale en RDC.",
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
      `,
      image: "/landing/bookimage-removebg-preview.png",
      author: "Équipe SOS Planète Congo",
      category: "Éducation",
      tags: ["livre", "éducation", "ressources pédagogiques"],
      published: true,
    },
    {
      slug: "formation-enseignants-kinshasa",
      title: "Formation des enseignants à Kinshasa",
      excerpt:
        "Plus de 100 enseignants formés à l'utilisation de nos ressources pédagogiques pour l'année scolaire 2024. Une journée riche en échanges et en apprentissages pour une meilleure transmission des connaissances.",
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

        <h2 class="text-3xl font-bold text-primary mb-6">Prochaines étapes</h2>
        <p class="text-gray-700 mb-6">
          Suite au succès de cette première session, nous planifions déjà les prochaines 
          formations dans d'autres villes du Congo. L'objectif est de former plus de 
          500 enseignants d'ici la fin de l'année 2024.
        </p>
      `,
      image: "https://placehold.co/600x400",
      author: "Équipe Formation SOS Planète Congo",
      category: "Formation",
      tags: ["formation", "enseignants", "pédagogie"],
      published: true,
    },
    {
      slug: "partenariat-unesco",
      title: "Nouveau partenariat avec l'UNESCO",
      excerpt:
        "SOS Planète Congo renforce sa mission éducative grâce à un nouveau partenariat stratégique avec l'UNESCO pour le développement de contenus pédagogiques innovants.",
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
      image: "https://placehold.co/600x400",
      author: "Direction SOS Planète Congo",
      category: "Partenariat",
      tags: ["UNESCO", "partenariat", "éducation"],
      published: true,
    },
    {
      slug: "concours-art-environnemental",
      title: "Concours national d'art environnemental",
      excerpt:
        "Lancement du premier concours national d'art environnemental pour sensibiliser les jeunes à la protection de l'environnement en République Démocratique du Congo.",
      content: `
        <p class="text-xl text-gray-700 mb-8 leading-relaxed">
          SOS Planète Congo lance le premier concours national d'art environnemental 
          destiné aux jeunes de 8 à 18 ans. Une initiative créative pour sensibiliser 
          à la protection de l'environnement.
        </p>
      `,
      image: "https://placehold.co/600x400",
      author: "Équipe Événements SOS Planète Congo",
      category: "Concours",
      tags: ["concours", "art", "jeunes", "créativité"],
      published: true,
    },
  ];

  for (const article of newsArticles) {
    try {
      const existingArticle = await prisma.news.findUnique({
        where: { slug: article.slug },
      });

      if (existingArticle) {
        console.log(`📰 Article "${article.title}" exists, updating...`);
        await prisma.news.update({
          where: { slug: article.slug },
          data: article,
        });
      } else {
        console.log(`📰 Creating article "${article.title}"...`);
        await prisma.news.create({
          data: article,
        });
      }
    } catch (error) {
      console.error(`❌ Error with article "${article.title}":`, error);
    }
  }

  console.log("✅ News seeding completed!");
}

export default seedNews;

// Exécuter directement si ce fichier est appelé
if (require.main === module) {
  seedNews()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
