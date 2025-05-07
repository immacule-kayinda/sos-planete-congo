import { Check } from "lucide-react";

export default function FinishedLesson({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <div className="h-14 w-14 rounded-full ring-green-500 ring-4 p-1 relative">
        <div className="p-1 bg-green-500 rounded-full flex items-center justify-center absolute -bottom-3 left-4">
          <Check className="text-white w-4 h-4" />
        </div>
        <div className="w-full h-full bg-neutral-200 rounded-full"></div>
      </div>
      <div>
        <p className="font-black text-lg uppercase">Panique dans la foret</p>
        <span className="text-lg text-gray-500 font-bold">Conte</span>
      </div>
    </div>
  );
}
