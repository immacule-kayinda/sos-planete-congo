import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export default function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="bg-[#087f35] shadow-xl shadow-[#0f813b] p-4 rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center gap-2">
      <div className="bg-[#0f813b] rounded-full p-3 md:p-5 w-fit">
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
      <p className="text-xs md:text-sm text-center">{label}</p>
    </div>
  );
} 