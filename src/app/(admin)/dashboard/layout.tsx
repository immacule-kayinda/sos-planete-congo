import type React from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Suspense } from "react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-4">
          <Image alt="Logo" src={"/logo.png"} width={40} height={40} className="h-full "/>
          <h1 className="text-lg font-semibold">Espace administrateur</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40">
          <DashboardNav />
        </aside>
        <main className="flex-1 p-6">
          <Suspense fallback={<div>Chargement...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
