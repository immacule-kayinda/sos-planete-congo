import prisma from "./prisma";
import { comparePasswords } from "./utils";

export async function validateUser(email: string, password: string) {
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
  const modules = await prisma.module.findMany({
    include: {
      conte: true,
      chapters: true,
      quizzes: true,
    },
  });
  return modules;
}
