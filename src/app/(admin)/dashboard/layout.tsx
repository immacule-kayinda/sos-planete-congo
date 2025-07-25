import type React from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Suspense } from "react";
import Image from "next/image";
import { RoleGuard } from "@/components/access-control/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <Image
              alt="Logo"
              src={"/logo.png"}
              width={40}
              height={40}
              className="h-full "
            />
            <h1 className="text-lg font-semibold">Espace administrateur</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col md:flex-row">
          <aside className="w-fit md:w-64 border-r bg-red/40 max-w-fit md:max-w-max max-h-screen overflow-y-auto">
            <DashboardNav />
          </aside>
          <main className="flex-1 p-4 md:p-6 pb-20">
            <Suspense fallback={<div>Chargement...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
