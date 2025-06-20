import { PrismaClient, ItemCategory } from "../generated/prisma";

const prisma = new PrismaClient();

async function seedShop() {
  console.log("🌱 Seeding shop items...");

  const shopItems = [
    // Livres
    {
      name: "Livre d'Histoire du Congo",
      description:
        "Un livre complet sur l'histoire fascinante du Congo, de ses origines à nos jours.",
      price: 50,
      category: ItemCategory.BOOK,
      imageUrl: "/public/bookimage.png",
    },
    {
      name: "Guide de la Faune Africaine",
      description:
        "Découvrez les animaux extraordinaires qui peuplent l'Afrique.",
      price: 75,
      category: ItemCategory.BOOK,
      imageUrl: "/public/bookimage.png",
    },
    {
      name: "Contes Traditionnels",
      description:
        "Une collection de contes traditionnels africains pour toute la famille.",
      price: 60,
      category: ItemCategory.BOOK,
      imageUrl: "/public/bookimage.png",
    },

    // Avatars
    {
      name: "Avatar Éléphant",
      description:
        "Un avatar représentant un éléphant majestueux, symbole de sagesse.",
      price: 100,
      category: ItemCategory.AVATAR,
      imageUrl: "/public/grenouille.png",
    },
    {
      name: "Avatar Lion",
      description:
        "Un avatar représentant un lion courageux, roi de la savane.",
      price: 120,
      category: ItemCategory.AVATAR,
      imageUrl: "/public/grenouille.png",
    },
    {
      name: "Avatar Gorille",
      description:
        "Un avatar représentant un gorille intelligent et protecteur.",
      price: 150,
      category: ItemCategory.AVATAR,
      imageUrl: "/public/grenouille.png",
    },

    // Badges
    {
      name: "Badge Explorateur",
      description:
        "Badge décerné aux explorateurs courageux de la connaissance.",
      price: 30,
      category: ItemCategory.BADGE,
      imageUrl: "/public/globe.svg",
    },
    {
      name: "Badge Sage",
      description: "Badge pour les sages qui ont lu de nombreux livres.",
      price: 80,
      category: ItemCategory.BADGE,
      imageUrl: "/public/globe.svg",
    },
    {
      name: "Badge Protecteur",
      description:
        "Badge pour ceux qui protègent l'environnement et la nature.",
      price: 60,
      category: ItemCategory.BADGE,
      imageUrl: "/public/globe.svg",
    },

    // Objets de jeu
    {
      name: "Bonus de Temps",
      description: "Gagnez 30 secondes supplémentaires dans les quiz.",
      price: 25,
      category: ItemCategory.GAME_ITEM,
      imageUrl: "/public/clock.svg",
    },
    {
      name: "Indice Spécial",
      description: "Obtenez un indice pour une question difficile.",
      price: 40,
      category: ItemCategory.GAME_ITEM,
      imageUrl: "/public/lightbulb.svg",
    },
    {
      name: "Double Points",
      description: "Doublez vos points pour le prochain chapitre.",
      price: 100,
      category: ItemCategory.GAME_ITEM,
      imageUrl: "/public/star.svg",
    },

    // Décorations
    {
      name: "Cadre Doré",
      description: "Un beau cadre doré pour décorer votre profil.",
      price: 45,
      category: ItemCategory.DECORATION,
      imageUrl: "/public/frame.svg",
    },
    {
      name: "Bannière Arc-en-ciel",
      description: "Une bannière colorée pour personnaliser votre espace.",
      price: 35,
      category: ItemCategory.DECORATION,
      imageUrl: "/public/banner.svg",
    },
    {
      name: "Thème Forêt",
      description: "Un thème spécial avec des éléments de forêt tropicale.",
      price: 90,
      category: ItemCategory.DECORATION,
      imageUrl: "/public/forest.svg",
    },

    // Objets spéciaux
    {
      name: "Accès Premium",
      description:
        "Débloquez du contenu exclusif et des fonctionnalités spéciales.",
      price: 200,
      category: ItemCategory.SPECIAL,
      imageUrl: "/public/crown.svg",
    },
    {
      name: "Mentor Personnel",
      description:
        "Accédez à un mentor virtuel pour vous guider dans votre apprentissage.",
      price: 300,
      category: ItemCategory.SPECIAL,
      imageUrl: "/public/mentor.svg",
    },
    {
      name: "Certificat d'Excellence",
      description: "Un certificat spécial pour récompenser vos efforts.",
      price: 150,
      category: ItemCategory.SPECIAL,
      imageUrl: "/public/certificate.svg",
    },
  ];

  // Supprimer tous les objets existants
  await prisma.shopItem.deleteMany();

  // Créer tous les nouveaux objets
  await prisma.shopItem.createMany({
    data: shopItems,
  });

  console.log("✅ Shop items seeded successfully!");
}

async function main() {
  try {
    await seedShop();
  } catch (error) {
    console.error("❌ Error seeding shop:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
