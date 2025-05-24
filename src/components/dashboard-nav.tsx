"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, BookOpen, FileText, BookMarked, HelpCircle, School, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Users,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Modules",
    href: "/dashboard/modules",
    icon: BookOpen,
  },
  {
    title: "Chapters",
    href: "/dashboard/chapters",
    icon: FileText,
  },
  {
    title: "Contes",
    href: "/dashboard/contes",
    icon: BookMarked,
  },
  {
    title: "Quizzes",
    href: "/dashboard/quizzes",
    icon: HelpCircle,
  },
  {
    title: "Teachers",
    href: "/dashboard/teachers",
    icon: School,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
            pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
