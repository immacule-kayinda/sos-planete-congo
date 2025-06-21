import React from "react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Dr. Jean-Pierre Mwamba",
      role: "Directeur Exécutif",
      description:
        "Expert en conservation avec plus de 15 ans d'expérience dans la protection de la biodiversité congolaise.",
      image: "/team/director.jpg",
    },
    {
      name: "Marie-Louise Nkosi",
      role: "Responsable des Programmes",
      description:
        "Spécialiste en développement durable et coordination des projets communautaires.",
      image: "/team/programs.jpg",
    },
    {
      name: "Dr. Samuel Okito",
      role: "Responsable Scientifique",
      description: "Chercheur en écologie tropicale et expert en biodiversité.",
      image: "/team/science.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Notre Équipe</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1">
              <div className="w-full h-64 bg-gray-200">
                {/* Image placeholder - replace with actual images */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-green-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Rejoignez Notre Équipe</h2>
        <p className="text-gray-700 mb-4">
          Nous sommes toujours à la recherche de personnes passionnées par la
          protection de l'environnement et le développement durable.
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
          Voir les opportunités
        </button>
      </div>
    </div>
  );
}
