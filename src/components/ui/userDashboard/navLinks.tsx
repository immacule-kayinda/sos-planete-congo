"use client";
import clsx from "clsx";
import {
  BarChart2,
  Book,
  BookOpen,
  Gamepad2,
  MoreHorizontal,
  ShoppingBag,
  User,
} from "lucide-react";

import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex md:flex-col gap-2">
      {links.map((link, index) => (
        <Link
          href={link.href ?? "#"}
          key={index}
          className={clsx(
            "flex items-center gap-2 p-3 w-full hover:bg-red-200 md:justify-start rounded-md justify-center hover:text-red-500",
            pathname === link.href &&
              "bg-red-200 text-red-500 border-2 border-red-500"
          )}
        >
          {link.icon}
          <span className="font-black uppercase text-sm hidden md:block">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}

const links: { href?: string; icon: React.ReactNode; label: string }[] = [
  {
    href: "/learn",
    icon: <BookOpen className="w-4 h-4" />,
    label: "Apprendre",
  },
  {
    href: "/leaderboard",
    icon: <BarChart2 className="w-5 h-5" />,
    label: "Ligue",
  },
  {
    href: "/exercices",
    icon: <Brain className="w-5 h-5" />,
    label: "Exercices",
  },
  {
    href: "/profile",
    icon: <User />,
    label: "Profil",
  },
  {
    href: "/games",
    icon: <Gamepad2 />,
    label: "Jeux",
  },

  {
    icon: <MoreHorizontal />,
    label: "Plus",
  },
  {
    href: "/shop",
    icon: <ShoppingBag />,
    label: "Boutique ",
  },
];
