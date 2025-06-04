import PresentationItem from "../presentationItem";
import { ScrollReveal } from "../ui/scroll-reveal";

export default function Presentation() {
  return (
    <div className="text-center container m-auto py-10 flex flex-col gap-20 px-7 my-52">
      <ScrollReveal>
        {sections.map((section, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <PresentationItem index={index} key={index} {...section} />
          </ScrollReveal>
        ))}
      </ScrollReveal>
    </div>
  );
}

const sections: {
  title: string;
  text: string;
  imgUrl: string;
  alt: string;
  buttonText?: string;
  //   buttonUrl?: string;
}[] = [
  {
    title: "Pour les enseignant et les écoles",
    alt: "Teacher is Teaching",
    imgUrl: "/teacher-landing.png",
    text: `Des outils prêts à l’emploi pour vos cours ! <br />
            Téléchargez des cahiers d'exercices inspirés de notre livre S.O.S
            Planète Congo et enrichissez vos leçons en toute simplicité`,
    // buttonText: "Creer une classe",
  },
  {
    title: "Des activités en plus, rien que pour toi",
    alt: "Student with book",
    imgUrl: "/grenouille.png",
    text: `Apprendre les langues nationalesInitiez-vous au lingala, kikongo, 
    swahili et tshiluba grâce à des cours interactifs pensés pour petits et grands.`,
    // buttonText: "Explorer les activités",
  },
  {
    title: "Offrez vous le livre",
    alt: "Book Cover",
    // imgUrl: "/book-landing.png",
    text: `Un livre d'activités éducatives et ludiques pour explorer
              l'environnement et la culture de la RDC. <br />
              Des outils interactifs et bilingues (français et langues nationales)
              pour les élèves et enseignants`,
    imgUrl: "/landing/bookimage-removebg-preview.png",
    buttonText: "Acheter le livre",
  },
];
