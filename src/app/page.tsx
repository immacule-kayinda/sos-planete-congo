"use client";

import Header from "@/components/header";
import HeroSection from "@/components/landing/hero_section";
import Presentation from "@/components/landing/presentation";
import StatCard from "@/components/landing/stat_card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Book, Globe, School, Users } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isThanosVisible, setIsThanosVisible] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {}, []);

  return (
    <div>
      <Header
        className={`header-transition ${
          !isHeaderVisible ? "header-hidden" : ""
        }`}
      />
      <main className="">
        <HeroSection />
        <Presentation />
        <section
          id="thanos"
          className="flex flex-col text-center justify-center items-center w-full h-fit border -space-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="h-fit"
          >
            <path
              fill="#067E33"
              fillOpacity="1"
              d="M0,32L48,53.3C96,75,192,117,288,154.7C384,192,480,224,576,197.3C672,171,768,85,864,53.3C960,21,1056,43,1152,58.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <div className="bg-[#067E33] w-full min-h-[50vh] items-center flex justify-center">
            <div className="flex flex-col text-[#D0FFC7] items-center justify-center h-full text-center font-bold">
              <h1 className="text-[#D0FFC7] uppercase mb-10 text-2xl md:text-4xl">
                Le projet sos aujourd'hui
              </h1>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
              <p className="text-base mt-10">Depuis le 30 Decembre 2024</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#067E33"
              fillOpacity="1"
              d="M0,32L48,53.3C96,75,192,117,288,154.7C384,192,480,224,576,197.3C672,171,768,85,864,53.3C960,21,1056,43,1152,58.7C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </section>

        <section className="h-screen flex justify-center items-center max-w-screen relative">
          <div className="flex flex-col text-center justify-center items-center place-self-center md:w-lg w-fit max-w-md ">
            <h1 className="uppercase text-center">
              Commence à explorer dès maintenant
            </h1>
            <Button size={"lg"} className="w-3xs ">
              C'est parti!!
            </Button>
          </div>
          <Image
            src="/floor.png"
            alt="Les herbes en dessous"
            width={1000}
            height={1000}
            className="absolute -z-10 w-full bottom-0"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

const stats = [
  {
    icon: School,
    value: "+1500",
    label: "Écoles et autres institutions",
  },
  {
    icon: Book,
    value: "+2500",
    label: "Livres distribués",
  },
  {
    icon: Users,
    value: "+2500",
    label: "Élèves sensibilisés",
  },
  {
    icon: Globe,
    value: 5,
    label: "Langue de publication",
  },
];
