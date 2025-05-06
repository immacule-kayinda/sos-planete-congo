import { montserrat } from "@/app/layout";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-7 py-10">
      <div className="">
        <h1
          className={`uppercase font-bold text-3xl text-primary ${montserrat.className} text-center mb-4`}
        >
          Sos planete congo
        </h1>
        <p className="text-[#A87878] text-center">
          La plateforme éducative et ludique pour explorer l’environnement et la
          culture de la RDC. Des outils interactifs et bilingues (français et
          langues nationales) pour les élèves et enseignants.
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <Button className="w-full py-4" size={"lg"}>
          S'inscrire
        </Button>
        <Button variant={"outline"} className="w-full" size={"lg"}>
          J'ai déjà un compte
        </Button>
      </div>
    </section>
  );
}
