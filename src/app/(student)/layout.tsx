import NavLinks from "@/components/ui/userDashboard/navLinks";
import { Book, Brain, ChartBarIcon, Flame } from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex h-full">
        <div className="h-full px-5 py-4 border-r w-1/6 gap-3">
          <h1 className="uppercase font-black text-2xl mb-5">LOGO SOS</h1>
          <NavLinks />
        </div>
        <div className="w-8/12 px-10 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {children}
        </div>
        <div className="w-4/12 px-10 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="flex">
            <div className="flex">
              <Flame />
              <p>0</p>
            </div>
            <div className="flex">
              <Flame />
              <p>0</p>
            </div>
          </div>
          <div className="flex">Righ Sidebar</div>
        </div>
      </main>
    </div>
  );
}
