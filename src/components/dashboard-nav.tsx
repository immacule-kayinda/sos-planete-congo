"use client";

import { cn } from "@/lib/utils";
import {
  BookMarked,
  BookOpen,
  Ellipsis,
  FileText,
  GraduationCap,
  HelpCircle,
  School,
  Users,
  Layers,
  Building,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: Users,
  },
  {
    title: "Utilisateurs",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Actualités",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Sections",
    href: "/dashboard/sections",
    icon: Layers,
  },
  {
    title: "Modules",
    href: "/dashboard/modules",
    icon: BookOpen,
  },
  {
    title: "Chapitres",
    href: "/dashboard/chapters",
    icon: FileText,
  },
  {
    title: "Contes",
    href: "/dashboard/contes",
    icon: BookMarked,
  },
  {
    title: "Quiz",
    href: "/dashboard/quizzes",
    icon: HelpCircle,
  },
  {
    title: "Enseignants",
    href: "/dashboard/teachers",
    icon: School,
  },
  {
    title: "Classes",
    href: "/dashboard/classrooms",
    icon: Building,
  },
  {
    title: "Étudiants",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between md:grid gap-2 p-2 z-40 bg-background border-t md:static md:border-t-0 md:bg-transparent md:z-auto md:w-full md:p-4">
      {navItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            `md:flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent justify-center md:justify-start ${
              index > 4 && "hidden"
            }`,
            pathname === item.href
              ? "bg-accent text-accent-foreground "
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-4 w-4 md:h-4 md:w-4" />
          <span className="hidden lg:inline">{item.title}</span>
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full bg-accent md:hidden"
          >
            <Ellipsis className="h-full w-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 md:hidden" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Plus d'options</p>
              <p className="text-sm text-muted-foreground">
                Bienvenue dans votre espace d&apos;administration.
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {navItems.map(
              (item, index) =>
                index > 4 && (
                  <Link key={item.href} href={item.href}>
                    <DropdownMenuItem>
                      <item.icon className="mr-2 h-4 w-4 flex" />
                      <span className="">{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                )
            )}
            {/* <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
