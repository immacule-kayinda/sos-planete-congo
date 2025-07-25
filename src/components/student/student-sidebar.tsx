"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Trophy,
  X,
  Gamepad2,
  BookMarked,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

type CurrentPageType =
  | "learn"
  | "stories"
  | "games"
  | "exercices"
  | "guidebook"
  | "leaderboard"
  | "shop"
  | "profile";

interface StudentSidebarProps {
  accountStatus?: string;
}

export function StudentSidebar({
  accountStatus = "ACTIVE",
}: StudentSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentPage: CurrentPageType = (pathname.split("/").pop() ||
    "learn") as CurrentPageType;

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const isLimitedAccess = accountStatus === "LIMITED_ACCESS";

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg border border-gray-200 hover:bg-gray-50"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <div
        className={cn(
          "fixed md:static h-screen inset-y-0 left-0 z-50 w-[260px] bg-[#d31929] flex flex-col transition-transform duration-300 ease-in-out",
          "md:translate-x-0", // Always visible on desktop
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" // Hidden on mobile unless open
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
                Espace Étudiant
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 lg:p-4">
          <SidebarItem
            href="/learn"
            icon={<BookOpen size={18} />}
            label="Apprendre"
            active={currentPage === "learn"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/stories"
            icon={<BookMarked size={18} />}
            label="Histoires"
            active={currentPage === "stories"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
          <SidebarItem
            href="/games"
            icon={<Gamepad2 size={18} />}
            label="Jeux"
            active={currentPage === "games"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
          <SidebarItem
            href="/exercices"
            icon={<FileText size={18} />}
            label="Exercices"
            active={currentPage === "exercices"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
          <SidebarItem
            href="/guidebook"
            icon={<LayoutDashboard size={18} />}
            label="Guide"
            active={currentPage === "guidebook"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
          <SidebarItem
            href="/leaderboard"
            icon={<Trophy size={18} />}
            label="Classement"
            active={currentPage === "leaderboard"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
          <SidebarItem
            href="/shop"
            icon={<ShoppingCart size={18} />}
            label="Boutique"
            active={currentPage === "shop"}
            onClick={() => setIsMobileOpen(false)}
            disabled={isLimitedAccess}
          />
        </nav>

        <div className="p-3 lg:p-4 border-t border-white/10">
          <SidebarItem
            href="/profile"
            icon={<User size={18} />}
            label="Mon Profil"
            active={currentPage === "profile"}
            onClick={() => setIsMobileOpen(false)}
          />
          <SidebarItem
            href="/help"
            icon={<HelpCircle size={18} />}
            label="Aide"
            active={false}
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      </div>

      {/* Spacer for desktop - Only needed if sidebar is static */}
      <div className="hidden md:block w-[260px] flex-shrink-0" />
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
  disabled = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2 mb-1 rounded-lg text-white/40 cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        <Badge
          variant="secondary"
          className="text-xs bg-white/10 text-white/40"
        >
          Verrouillé
        </Badge>
      </div>
    );
  }

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
