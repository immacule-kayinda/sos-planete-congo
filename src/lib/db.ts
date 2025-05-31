import type { User } from "next-auth";
import { auth } from "../../auth";
import prisma from "./prisma";
import { comparePasswords } from "./utils";

export async function validateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      teacher: true,
      student: true,
      admin: true,
    },
  });

  if (!user) return null;

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) return null;

  return user;
}
/**
 * returns a response that specifies if a user exist or no in the database
 * @param userId string
 * @returns boolean
 */
export async function userExist(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return !!user;
}

export async function getChapterWithUserPerformances(
  userId: string,
  chapterId: string
) {
  if (await userExist(userId)) {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        performance: {
          where: { studentId: userId, chapterId: chapterId },
        },
      },
    });

    return chapter;
  }

  return null;
}

export async function getStudentData(userId: string) {
  const student = await prisma.student.findFirst({
    where: { userId },
    include: {
      performance: {
        include: {
          chapter: {
            include: {
              module: true,
            },
          },
        },
      },
    },
  });
  return student;
}

export async function getModules() {
  const sections = await prisma.section.findMany({
    include: {
      conte: true,
      quizz: true,
      modules: {
        include: {
          chapters: {
            include: {
              progress: true,
              performance: true,
            },
          },
        },
      },
    },
  });
  return sections;
}

export async function getSectionWithModules(sectionId: string = "") {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const student = await prisma.student.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (sectionId) {
    console.log("Section");
    const section = await prisma.section.findUnique({
      where: {
        id: sectionId,
      },
      include: {
        conte: true,
        quizz: true,
        modules: {
          select: { id: true, title: true, subtitle: true },
          include: {
            chapters: {
              select: { id: true, title: true, subtitle: true },
              include: {
                progress: {
                  where: {
                    studentId: student?.id,
                  },
                },
                performance: {
                  where: {
                    studentId: student?.id,
                  },
                },
              },
            },
          },
        },
      },
    });
    return section;
  }

  // Si aucun ID n'est fourni, retourner la première section
  const firstSection = await prisma.section.findFirst({
    include: {
      conte: true,
      quizz: true,
      modules: {
        include: {
          chapters: {
            include: {
              progress: {
                where: {
                  studentId: student?.id,
                },
              },
              performance: {
                where: {
                  studentId: student?.id,
                },
              },
            },
          },
        },
      },
    },
  });
  return firstSection;
}

export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "OPEN_ENDED"
  | "SINGLE_CHOICE"
  | "TEXT";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  answers: string[];
  correctAnswer: number | string;
  explanation?: string;
}

export async function getQuizQuestions(
  quizId: string
): Promise<QuizQuestion[]> {
  const quizz = await prisma.quizz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  if (!quizz?.questions) return [];

  return quizz.questions.map((q) => {
    const formattedQuestion: QuizQuestion = {
      id: q.id,
      type: q.type as QuestionType,
      question: q.question,
      answers: q.options.map((o) => o.text),
      correctAnswer: q.options.findIndex((o) => o.isCorrect),
      explanation: q.correctText || undefined,
    };

    // Format based on question type
    switch (q.type) {
      case "MULTIPLE_CHOICE":
        return formattedQuestion;

      case "SINGLE_CHOICE":
        return {
          ...formattedQuestion,
          answers: q.options.map((o) => o.text),
          correctAnswer: q.options.findIndex((o) => o.isCorrect),
        };

      case "TEXT":
        return {
          ...formattedQuestion,
          answers: q.options.map((o) => o.text),
          correctAnswer: q.correctText || "",
        };

      default:
        return formattedQuestion;
    }
  });
}
