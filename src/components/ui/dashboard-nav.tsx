"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Users, BookOpen, Settings } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
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
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const path = usePathname()

  return (
    <ScrollArea className="h-full py-6">
      <div className="flex flex-col gap-2 px-4">
        {items.map((item) => (
          <Button
            key={item.href}
            variant={path === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              path === item.href && "bg-muted font-medium"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
} 