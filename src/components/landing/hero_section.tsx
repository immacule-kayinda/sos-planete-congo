import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="md:px-7 sm:px-3 px-10 py-24 flex w-full max-w-6xl m-auto gap-6 justify-center items-center flex-col md:flex-row">
      <Image
        src="/landing/hero-image.png"
        alt="Hero Image"
        width={600}
        height={700}
        className="w-full md:w-6/12 h-auto m-auto"
      />
      <div className="w-full md:w-4/12 text-center md:text-start">
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
