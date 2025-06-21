import { ScrollReveal } from "../ui/scroll-reveal";
import Image from "next/image";

export default function Supporters() {
  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ils nous soutiennent</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Des partenaires engagés qui partagent notre vision pour
              l'éducation et la préservation de l'environnement en RDC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-items-center">
            {supporters.map((supporter, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group relative w-48 h-32 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src={supporter.logo}
                      alt={supporter.name}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const supporters = [
  {
    name: "Texaf Bilembo",
    // logo: "/images/partners/texaf.png",
    logo: "https://placehold.co/600x400",
  },
  {
    name: "UNESCO",
    // logo: "/images/partners/unesco.png",
    logo: "https://placehold.co/600x400",
  },
  {
    name: "Ministère de l'Education",
    // logo: "/images/partners/education.png",
    logo: "https://placehold.co/600x400",
  },
  {
    name: "WWF",
    // logo: "/images/partners/wwf.png",
    logo: "https://placehold.co/600x400",
  },
];
