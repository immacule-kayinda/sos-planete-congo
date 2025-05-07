import Chapter from "@/components/ui/guidebook/chapter";
import CompletedChapter from "@/components/ui/guidebook/completedChapter";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Guidebook() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-2 py-5 border-b text-base border-neutral-200 text-neutral-500"
      >
        <ArrowLeft />
        Retour
      </Link>
      <div className="flex flex-col gap-4">
        <CompletedChapter />
        {chapters.map((chapter) => {
          return <Chapter {...chapter} />;
        })}
      </div>
    </div>
  );
}

const chapters: {
  title: string;
  image: string;
  progress: number;
  total: number;
}[] = [
  {
    title: "Panique dans la foret",
    progress: 4,
    total: 12,
    image: "/images/guidebook/chapter1.png",
  },
];
