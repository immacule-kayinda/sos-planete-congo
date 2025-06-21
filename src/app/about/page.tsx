import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">À Propos de SOS Planète Congo</h1>

      <div className="grid gap-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-gray-700">
            SOS Planète Congo est une organisation dédiée à la protection de
            l'environnement et à la promotion du développement durable en
            République du Congo. Notre mission est de préserver la biodiversité
            unique du Congo tout en soutenant les communautés locales dans leur
            développement.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Nos Objectifs</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Protection de la biodiversité congolaise</li>
            <li>Promotion des pratiques durables</li>
            <li>Sensibilisation environnementale</li>
            <li>Support aux communautés locales</li>
            <li>Conservation des écosystèmes</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Nos Actions</h2>
          <p className="text-gray-700 mb-4">
            Nous menons diverses actions sur le terrain pour atteindre nos
            objectifs :
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Conservation</h3>
              <p className="text-sm text-gray-600">
                Protection des espèces menacées et de leurs habitats naturels
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Éducation</h3>
              <p className="text-sm text-gray-600">
                Programmes de sensibilisation et formation des communautés
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Développement</h3>
              <p className="text-sm text-gray-600">
                Projets de développement durable avec les communautés locales
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Recherche</h3>
              <p className="text-sm text-gray-600">
                Études scientifiques pour mieux comprendre et protéger
                l'écosystème
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
