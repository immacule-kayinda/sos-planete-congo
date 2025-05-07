import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-7 py-10 flex w-full max-w-6xl m-auto gap-6 justify-center">
      <div className="flex justify-center items-center w-6/12 bg-neutral-100">
        Image must be here
      </div>
      <div className="w-4/12 text-center md:text-start">
        <div className="">
          <h1 className={`uppercase font-bold text-3xl text-primary mb-4`}>
            Sos planete congo
          </h1>
          <p className="text-[#A87878]">
            La plateforme éducative et ludique pour explorer l’environnement et
            la culture de la RDC. Des outils interactifs et bilingues (français
            et langues nationales) pour les élèves et enseignants.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <Link
            href="/signup"
            className="bg-primary text-center font-montserrat text-white px-5 py-1 rounded-md border border-b-4 border-red-800 font-semibold"
          >
            S'inscrire
          </Link>
          <Link
            href="/signin"
            className="bg-white font-montserrat text-primary text-center px-5 py-1 rounded-md border border-b-4 border-red-800 font-semibold"
          >
            J'ai déjà un compte
          </Link>
        </div>
      </div>
    </section>
  );
}
