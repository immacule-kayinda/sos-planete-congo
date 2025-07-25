"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  BookOpen,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

type CurrentPageType =
  | "dashboard"
  | "formations"
  | "classes"
  | "students"
  | "materiel"
  | "notifications"
  | "aide";

export function TeacherSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentPage: CurrentPageType = (pathname.split("/").pop() ||
    "dashboard") as CurrentPageType;

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static h-screen inset-y-0 left-0 z-50 w-[260px] bg-[#d31929] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="SOS Planète Congo"
              width={32}
              height={32}
              className="lg:w-10 lg:h-10"
            />
            <div>
              <h2 className="font-semibold text-white text-sm lg:text-base">
                SOS Planète Congo
              </h2>
              <p className="text-xs lg:text-sm text-white/70">
                Espace Professeur
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 lg:p-4">
          <SidebarItem
            href="/teacher/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Tableau de bord"
            active={currentPage === "dashboard"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/teacher/formations"
            icon={<BookOpen size={18} />}
            label="Formations"
            count={8}
            active={currentPage === "formations"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/teacher/classes"
            icon={<Users size={18} />}
            label="Classes"
            count={5}
            active={currentPage === "classes"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/teacher/students"
            icon={<Users size={18} />}
            label="Étudiants"
            active={currentPage === "students"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/teacher/materiel"
            icon={<FileText size={18} />}
            label="Materiel"
            active={currentPage === "materiel"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/teacher/notifications"
            icon={<Bell size={18} />}
            label="Notifications"
            count={3}
            active={currentPage === "notifications"}
            onClick={() => setIsMobileOpen(false)}
          />
        </nav>

        <div className="p-3 lg:p-4 border-t border-white/10">
          <SidebarItem
            href="/teacher/aide"
            icon={<HelpCircle size={18} />}
            label="Aide"
            active={currentPage === "aide"}
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      </div>

      {/* Spacer for desktop */}
      {/* <div className="hidden lg:block w-[260px] flex-shrink-0" /> */}
    </>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  count,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2 mb-1 rounded-lg text-white/80 hover:bg-white/10 cursor-pointer transition-colors",
          active && "bg-white/20 text-white font-medium"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        {count && (
          <Badge
            variant="secondary"
            className="text-xs bg-white/20 text-white hover:bg-white/30"
          >
            {count}
          </Badge>
        )}
      </div>
    </Link>
  );
}
