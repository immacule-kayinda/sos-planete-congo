import React from "react";
import Image from "next/image";

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Notre Plateforme Éducative</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Notre plateforme éducative est conçue pour offrir une expérience
            d'apprentissage enrichissante et interactive aux jeunes Congolais.
            Elle combine des ressources pédagogiques innovantes avec des
            méthodes d'apprentissage modernes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Nos Ressources</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary">Contenus Bilingues</h3>
                <p className="text-neutral-600">
                  Ressources pédagogiques disponibles en français et en langues
                  nationales.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">
                  Matériel Interactif
                </h3>
                <p className="text-neutral-600">
                  Exercices, quiz et activités pratiques pour un apprentissage
                  engageant.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">
                  Ressources Multimédia
                </h3>
                <p className="text-neutral-600">
                  Vidéos, images et documents pour une compréhension
                  approfondie.
                </p>
              </div>
            </div>
          </div>
          <Image
            alt="Ressources éducatives"
            src="/images/education-resources.jpg"
            width={500}
            height={600}
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            alt="Méthode d'apprentissage"
            src="/images/education-method.jpg"
            width={500}
            height={600}
            className="w-full"
          />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Notre Méthode</h2>
            <p className="text-neutral-600">
              Notre approche pédagogique est basée sur l'apprentissage actif et
              l'engagement des élèves. Nous utilisons des méthodes modernes qui
              encouragent la participation et la réflexion critique.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Formation des Enseignants
            </h2>
            <p className="text-neutral-600">
              Nous accompagnons les enseignants dans l'utilisation de notre
              plateforme et de nos ressources. Des sessions de formation
              régulières sont organisées pour assurer une transmission efficace
              des connaissances.
            </p>
          </div>
          <Image
            alt="Formation des enseignants"
            src="/images/teacher-training.jpg"
            width={500}
            height={600}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
