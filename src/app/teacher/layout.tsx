import type { Metadata } from "next";
import "./globals.css";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import { RoleGuard } from "@/components/access-control/RoleGuard";

export const metadata: Metadata = {
  title: "Teacher",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRoles={["TEACHER"]}>
      <div className="md:flex min-h-screen bg-gray-50">
        <TeacherSidebar />
        <main className="flex-1 max-h-screen overflow-y-auto ">{children}</main>
      </div>
    </RoleGuard>
  );
}
