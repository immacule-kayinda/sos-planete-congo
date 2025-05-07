import { Check } from "lucide-react";
import Link from "next/link";

export default function CompletedChapter() {
  return (
    <div className="border border-[#e6e6e6] rounded-lg overflow-hidden border-b-4">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Chapitre 1</h2>
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <div className="bg-green-500 rounded-full p-1 flex items-center justify-center w-fit">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p>Terminée</p>
          </div>
        </div>
        <Link
          href="/guidebook/chapter-1"
          className="text-sm text-cyan-500 border p-2 rounded-lg border-b-4 font-black px-5 border-[#e6e6e6]"
        >
          Reviser
        </Link>
      </div>
    </div>
  );
}
