import Image from "next/image";

export default function ProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Le Projet SOS Planète Congo</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            SOS Planète Congo est un projet éducatif innovant créé par l'ASBL
            Texaf Bilembo, qui vise à sensibiliser les jeunes générations de la
            République Démocratique du Congo à la protection de l'environnement
            et à la valorisation du patrimoine culturel congolais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Notre Approche</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary">Éducation Bilingue</h3>
                <p className="text-neutral-600">
                  Utilisation du français et des langues nationales pour une
                  meilleure compréhension.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">
                  Méthodes Interactives
                </h3>
                <p className="text-neutral-600">
                  Ateliers pratiques et activités ludiques pour un apprentissage
                  engageant.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">
                  Contes Contemporains
                </h3>
                <p className="text-neutral-600">
                  Utilisation de la narration pour transmettre les valeurs et
                  connaissances.
                </p>
              </div>
            </div>
          </div>
          <Image
            alt="Notre approche"
            src="/images/approach.jpg"
            width={500}
            height={600}
            className="w-full"
          />
        </div>

        <div className="relative aspect-video">
          <div className="absolute inset-0 bg-black/20"></div>
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group hover:bg-white transition-all duration-300">
              <svg
                className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
          <Image
            alt="Vidéo de présentation"
            src="/images/video-thumbnail.jpg"
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            alt="Notre impact"
            src="/images/impact.jpg"
            width={500}
            height={600}
            className="w-full"
          />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Notre Impact</h2>
            <p className="text-neutral-600">
              Cette initiative contribue à éveiller une conscience écocitoyenne
              tout en renforçant l'identité culturelle des générations à venir.
              Notre objectif est de créer une nouvelle génération de Congolais
              conscients de l'importance de leur patrimoine naturel et culturel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
