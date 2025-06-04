import React from "react";

export default function PartnersPage() {
  const partners = [
    {
      name: "WWF Congo",
      type: "Organisation de Conservation",
      description:
        "Partenaire principal dans nos projets de protection de la biodiversité.",
      logo: "/partners/wwf.png",
    },
    {
      name: "Ministère de l'Environnement",
      type: "Gouvernement",
      description:
        "Collaboration sur les politiques environnementales et la conservation.",
      logo: "/partners/gov.png",
    },
    {
      name: "Université de Kinshasa",
      type: "Institution Académique",
      description:
        "Partenariat pour la recherche et l'éducation environnementale.",
      logo: "/partners/uni.png",
    },
    {
      name: "Greenpeace Afrique",
      type: "ONG Internationale",
      description:
        "Coopération sur les campagnes de sensibilisation et d'action.",
      logo: "/partners/greenpeace.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nos Partenaires</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pourquoi Partenaires ?</h2>
        <p className="text-gray-700">
          La protection de l'environnement est un défi qui nécessite une
          collaboration étroite entre différents acteurs. Nos partenaires nous
          permettent d'étendre notre impact et de mener des actions plus
          efficaces sur le terrain.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                {/* Logo placeholder */}
                <span className="text-gray-500 text-sm">Logo</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{partner.name}</h3>
                <p className="text-green-600">{partner.type}</p>
              </div>
            </div>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-black text-white rounded-lg p-8 flex flex-col items-center text-lg">
        <h2 className="text-4xl font-semibold mb-4 font-montserrat">
          Devenir Partenaire
        </h2>
        <p className="text-gray-300 mb-6">
          Nous sommes toujours ouverts à de nouveaux partenariats qui peuvent
          nous aider à atteindre nos objectifs de conservation et de
          développement durable.
        </p>
        <button className="border border-white text-white px-6 py-2 rounded-md hover:bg-accent/20 transition-all hover:cursor-pointer">
          Contactez-nous
        </button>
      </div>
    </div>
  );
}
