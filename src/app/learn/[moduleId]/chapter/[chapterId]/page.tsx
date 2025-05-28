import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "../../../../../../auth";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ moduleId: string; chapterId: string }>;
}) {
  const session = await auth();

  const { moduleId, chapterId } = await params;

  if (!session?.user?.id) return <div>You are not authenticated</div>;

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
      moduleId: moduleId,
    },
    include: {
      module: {
        include: {
          section: true,
        },
      },
    },
  });

  if (!chapter) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header section with gray background */}
      <div className="bg-[#d9d9d9] px-4 py-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button and title */}
          <Link
            href={"/learn"}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#666666] cursor-pointer hover:text-[#000000] transition-colors" />
            <span className="text-[#666666] text-lg md:text-xl font-medium">
              Retour
            </span>
          </Link>

          {/* Separator line */}
          <div className="w-full h-px bg-[#666666] mb-16 md:mb-20 lg:mb-24"></div>

          {/* Centered image title */}
          <div className="text-center">
            <h1 className="text-[#000000] text-xl md:text-2xl lg:text-3xl font-medium">
              Image de l&apos;antilope Tetsi
            </h1>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="bg-white px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main title */}
          <h2 className="text-[#000000] text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 uppercase">
            {chapter.title}
          </h2>

          {/* Subtitle */}
          <p className="text-[#666666] text-base md:text-lg lg:text-xl mb-8 md:mb-10 lg:mb-12 italic">
            {chapter.subtitle}
          </p>

          {/* Content wrapper for better reading experience */}
          <div className="prose prose-lg max-w-none md:prose-xl lg:prose-2xl">
            {/* First paragraph */}

            <p className="text-[#000000] text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 lg:mb-10">
              {chapter.content.split("\n")}
            </p>

            {/* <p className="text-[#000000] text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 lg:mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p> */}

            {/* Second paragraph */}
            {/* <p className="text-[#000000] text-base md:text-lg lg:text-xl leading-relaxed mb-12 md:mb-16 lg:mb-20">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur
            </p> */}
          </div>

          {/* Red button - responsive width */}
          <div className="flex justify-center md:justify-start">
            <Button className="w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] bg-[#d31929] hover:bg-[#a52d2d] text-white font-medium py-4 md:py-5 lg:py-6 px-8 md:px-12 lg:px-16 rounded-lg text-base md:text-lg lg:text-xl transition-all duration-200 hover:shadow-lg">
              Marquer comme lu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
