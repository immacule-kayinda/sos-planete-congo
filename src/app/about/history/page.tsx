import React from "react";

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

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-600"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <div
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-1/2 px-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      {item.year}
                    </h3>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-600 border-4 border-white"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8">
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
