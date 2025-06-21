import Chapter from "@/components/ui/guidebook/chapter";
import CompletedChapter from "@/components/ui/guidebook/completedChapter";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getStudentProgress(userId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        StudentChapterProgress: {
          include: {
            chapter: {
              include: {
                module: {
                  include: {
                    section: true,
                  },
                },
              },
            },
          },
          orderBy: {
            chapter: {
              order: "asc",
            },
          },
        },
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // Grouper la progression par section
    const sections = await prisma.section.findMany({
      orderBy: { order: "asc" },
      include: {
        modules: {
          include: {
            chapters: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!sections || sections.length === 0) {
      throw new Error("No sections found");
    }

    return sections.map((section) => {
      const sectionProgress = student.StudentChapterProgress.filter(
        (progress) => progress.chapter.module.sectionId === section.id
      );

      const totalChapters = section.modules.reduce(
        (total, module) => total + module.chapters.length,
        0
      );

      const completedChapters = sectionProgress.filter(
        (progress) => progress.isRead
      ).length;

      return {
        id: section.id,
        title: section.title,
        progress: completedChapters,
        total: totalChapters,
        image: `/images/guidebook/chapter${section.order}.png`,
        isCurrent: sectionProgress.some((progress) => progress.isCurrent),
        isCompleted: completedChapters === totalChapters,
      };
    });
  } catch (error) {
    console.error("Error in getStudentProgress:", error);
    throw error;
  }
}

export default async function Guidebook() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  try {
    const sections = await getStudentProgress(session.user.id);

    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/learn"
          className="flex items-center gap-2 py-5 border-b text-base border-neutral-200 text-neutral-500"
        >
          <ArrowLeft />
          Retour à l'apprentissage
        </Link>
        <div className="flex flex-col gap-4">
          {sections.map((section) =>
            section.isCompleted ? (
              <CompletedChapter key={section.id} {...section} />
            ) : (
              <Chapter key={section.id} {...section} />
            )
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading guidebook:", error);
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/learn"
          className="flex items-center gap-2 py-5 border-b text-base border-neutral-200 text-neutral-500"
        >
          <ArrowLeft />
          Retour à l'apprentissage
        </Link>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-600 font-bold mb-2">Erreur de chargement</h2>
          <p className="text-red-500">
            Une erreur est survenue lors du chargement du guide. Veuillez
            réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }
}
