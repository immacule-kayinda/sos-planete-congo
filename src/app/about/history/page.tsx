import { Timeline } from "@/components/timeline";

export default function HistoryPage() {
  const timeline = [
    {
      year: "2010",
      title: "Fondation",
      description:
        "Création de SOS Planète Congo par un groupe de scientifiques et d'activistes environnementaux.",
    },
    {
      year: "2012",
      title: "Premier Projet Majeur",
      description:
        "Lancement du programme de protection des gorilles des montagnes dans l'est du Congo.",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Établissement de partenariats avec des organisations internationales de conservation.",
    },
    {
      year: "2018",
      title: "Innovation",
      description:
        "Mise en place du programme d'éducation environnementale dans les écoles locales.",
    },
    {
      year: "2020",
      title: "Reconnaissance",
      description:
        "Prix international pour l'excellence en conservation de la biodiversité.",
    },
    {
      year: "2023",
      title: "Aujourd'hui",
      description:
        "Plus de 50 projets actifs dans la protection de l'environnement et le développement durable.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Notre Histoire</h1>

      <Timeline items={timeline} />

      <div className="bg-gray-100 rounded-lg p-8 w-1/2 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Notre Vision pour l'Avenir
        </h2>
        <p className="text-gray-700">
          Forts de notre expérience et de nos succès passés, nous continuons à
          œuvrer pour un Congo où la protection de l'environnement et le
          développement durable vont de pair. Notre objectif est d'étendre nos
          programmes et d'impliquer davantage les communautés locales dans nos
          initiatives de conservation.
        </p>
      </div>
    </div>
  );
}
