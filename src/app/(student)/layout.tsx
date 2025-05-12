import NavLinks from "@/components/ui/userDashboard/navLinks";
import { Book, Brain, ChartBarIcon, Flame } from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen md:flex flex-col overflow-hidden">
      <main className="md:flex h-full">
        <div className="z-40 md:h-full px-5 md:py-4 py-2 border-r md:w-2/12 w-screen gap-3 bg-white absolute md:z-50 md:static h-fit bottom-0 border-t md:border-t-0">
          <h1 className="uppercase font-black text-2xl mb-5 hidden md:block">
            LOGO SOS
          </h1>
          <NavLinks />
        </div>
        <div className="md:w-8/12 w-screen px-5 md:px-10 md:py-4 pt-16 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-16">
          {children}
        </div>
        <div className="md:w-2/12 px-3 py-2 md:px-10 md:py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] absolute right-0 top-0 w-full bg-white border-b md:border-b-0">
          <div className="flex justify-between">
            <div className="flex">
              <Flame />
              <p>0</p>
            </div>
            <div className="flex">
              <Flame />
              <p>0</p>
            </div>
          </div>
          <div className="hidden md:flex">Righ Sidebar</div>
        </div>
      </main>
    </div>
  );
}
