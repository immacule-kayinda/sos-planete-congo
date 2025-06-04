import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export default function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="bg-[#d82b3a] shadow-xl shadow-[#] p-4 rounded-full border border-white/20 w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center gap-2">
      <div className="bg-[#ec8c9438] rounded-full p-3 md:p-5 w-fit">
        <Icon className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
      <p className="text-xs md:text-sm text-center">{label}</p>
    </div>
  );
}
