import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-black">
      <section className="container m-auto grid grid-cols-1 md:grid-cols-3 gap-x-36 gap-y-14 justify-center items-center border-b border-white/20 py-20">
        {footerSections.map((section) => (
          <div key={section.name} className="flex flex-col gap-2 w-52 h-full">
            <h3 className="text-xl">{section.name}</h3>
            <ul className="flex flex-col text-[#f48383]">
              {section.links.map((link, index) => (
                <li
                  key={link.label}
                  className="hover:text-white/70 transition-all"
                >
                  <Link href={link.href} key={index}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <div className="container mx-auto py-5">
        SOS PLANETE CONGO. Tout droits reservés
      </div>
    </footer>
  );
}

const footerSections: {
  name: string;
  links: {
    label: string;
    href: string;
  }[];
}[] = [
  {
    name: "A propos de nous",
    links: [
      { label: "Qui sommes-nous ?", href: "/about/qui-sommes-nous" },
      { label: "Notre mission", href: "/about/notre-mission" },
      { label: "Contactez-nous", href: "/contact" },
      { label: "Partenaires", href: "/about/partenaires" },
      { label: "Histoire", href: "/about/histoire" },
      { label: "Jeux", href: "/about/jeux" },
    ],
  },
  {
    name: "Aide et support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Centre d'aide", href: "/help" },
    ],
  },
  {
    name: "Conditions d'utilisation et de confidentialité",
    links: [
      { label: "Regle de conduite de la communauté", href: "/rules" },
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialité", href: "/privacy" },
    ],
  },
  {
    name: "Social",
    links: [
      { label: "Facebook", href: "/" },
      { label: "Twitter", href: "/" },
      { label: "Instagram", href: "/" },
      { label: "Youtube", href: "/" },
      { label: "Tiktok", href: "/" },
      { label: "Blog", href: "/" },
    ],
  },
];
