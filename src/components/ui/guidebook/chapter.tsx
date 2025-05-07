import { Progress } from "../progress";

export default function Chapter({
  title,
  image,
  progress,
  total,
}: {
  title: string;
  image: string;
  progress: number;
  total: number;
}) {
  return (
    <div className="border border-[#e6e6e6] rounded-lg overflow-hidden border-b-4">
      <div className="bg-[#e6e6e6] p-4">
        <h2 className="text-xl font-black uppercase">{title}</h2>
      </div>
      <div className="bg-[#e6e6e6] flex items-center justify-center py-12">
        <p className="text-gray-500">Image pilote du chapitre</p>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">Chapitre 1</h2>
        <Progress value={(progress * 100) / total} />
        <div className="text-xs text-right mt-1 text-gray-500">
          {progress}/{total}
        </div>
      </div>
    </div>
  );
}
