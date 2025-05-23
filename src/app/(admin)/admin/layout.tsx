import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../../auth";
import AdminNav from "../components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  //   if (!session || session.user.role !== "ADMIN") {
  //     redirect("/");
  //   }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-72 bg-accent shadow-lg ">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-red-600 uppercase">
              SOS Planète Congo
            </h1>
            <p className="text-sm text-gray-500">Administration</p>
          </div>

          {/* Navigation */}
          <AdminNav />

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {session?.user?.name?.[0] || "A"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="  ">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
