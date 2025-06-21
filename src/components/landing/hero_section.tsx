import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function HeroSection() {
  return (
    <div className="h-fit relative overflow-hidden pt-16 md:pt-0">
      <div className="absolute h-full -z-40 min-w-screen w-full">
        <div className="bg-orange-200 w-96 h-96 rounded-full absolute top-10 right-3/6"></div>
        <div className="bg-red-700 w-32 h-32 rounded-full absolute left-10 bottom-30"></div>
      </div>
      <section className="h-full flex items-center backdrop-blur-3xl bg-white/1">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                  SOS Planète Congo
                </h1>
                <p className="text-lg text-neutral-600 mb-8 max-w-xl">
                  La plateforme éducative et ludique pour explorer
                  l'environnement et la culture de la RDC. Des outils
                  interactifs et bilingues (français et langues nationales) pour
                  les élèves et enseignants.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    S'inscrire
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    J'ai déjà un compte
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative aspect-square max-w-xl mx-auto">
                <Image
                  src="/landing/hero-image.png"
                  alt="Hero Image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
