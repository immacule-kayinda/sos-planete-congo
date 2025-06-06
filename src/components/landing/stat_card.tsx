import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export default function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="bg-sky-100/5 backdrop-blur-3xl shadow-xl shadow-[#] p-4 rounded-full border text-sky-400 border-sky-900/10 w-40 h-40 md:w-44 md:h-44 flex flex-col items-center justify-center gap-2">
      <div className="bg-sky-400/10 backdrop-blur-3xl rounded-full p-3 md:p-5 w-fit">
        <Icon className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
      <p className="text-xs md:text-sm text-center max-w-max px-1">{label}</p>
    </div>
  );
}
