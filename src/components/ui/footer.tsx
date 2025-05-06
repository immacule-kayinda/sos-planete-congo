import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-black">
      <section className="grid grid-cols-1 md:grid-cols-3 p-5 gap-x-36 gap-y-14 justify-center items-center">
        {footerSections.map((section) => (
          <div key={section.name} className="flex flex-col gap-2 w-52 text-2xl">
            <h3 className="text-xl">{section.name}</h3>
            <ul className="flex flex-col text-[#f48383] text-lg">
              {section.links.map((link, index) => (
                <li key={link.label}>
                  <Link href={link.href} key={index}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
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
      { label: "Qui sommes-nous ?", href: "/" },
      { label: "Notre mission", href: "/" },
      { label: "Contactez-nous", href: "/" },
      { label: "Partenaires", href: "/" },
      { label: "Histoire", href: "/" },
      { label: "Jeux", href: "/" },
    ],
  },
  {
    name: "Aide et support",
    links: [
      { label: "FAQ", href: "/" },
      { label: "Centre d'aide", href: "/" },
      { label: "Conditions d'utilisation", href: "/" },
      { label: "Politique de confidentialité", href: "/" },
    ],
  },
  {
    name: "Conditions d'utilisation et de confidentialité",
    links: [
      { label: "Regle de conduite de la communauté", href: "/" },
      { label: "Conditions d'utilisation", href: "/" },
      { label: "Politique de confidentialité", href: "/" },
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
