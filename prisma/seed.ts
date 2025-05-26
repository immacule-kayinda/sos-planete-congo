import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

interface Teacher {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  voterCardNumber: string;
  school: string;
  teachingLevel: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Student {
  id: string;
  userId: string;
  age: number;
  teacherId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

async function main() {
  // Nettoyer la base de données
  await prisma.$transaction([
    prisma.studentStreak.deleteMany(),
    prisma.studentPerformance.deleteMany(),
    prisma.studentChapterProgress.deleteMany(),
    prisma.option.deleteMany(),
    prisma.question.deleteMany(),
    prisma.quiz.deleteMany(),
    prisma.chapter.deleteMany(),
    prisma.conte.deleteMany(),
    prisma.module.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Créer un admin
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
      isEmailVerified: true,
      admin: {
        create: {},
      },
    },
  });

  // Créer des enseignants
  const teachers = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: await bcrypt.hash("password123", 10),
          role: "TEACHER",
          isEmailVerified: true,
          teacher: {
            create: {
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              address: faker.location.streetAddress(),
              phoneNumber: faker.phone.number(),
              voterCardNumber: faker.string.numeric(10),
              school: faker.company.name(),
              teachingLevel: faker.helpers.arrayElement([
                "PRIMAIRE",
                "SECONDAIRE",
              ]),
            },
          },
        },
        include: {
          teacher: true,
        },
      });
      return user.teacher as Teacher;
    })
  );

  // Créer des étudiants
  const students = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: await bcrypt.hash("password123", 10),
          role: "STUDENT",
          isEmailVerified: true,
          student: {
            create: {
              age: faker.number.int({ min: 6, max: 18 }),
              teacherId: faker.helpers.arrayElement(teachers).id,
            },
          },
        },
        include: {
          student: true,
        },
      });
      return user.student as Student;
    })
  );

  // Créer des modules
  const modules = await Promise.all(
    Array.from({ length: 3 }).map(async () => {
      const module = await prisma.module.create({
        data: {
          title: faker.lorem.words(3),
          description: "Subtitle",
          conte: {
            create: {
              text: faker.lorem.paragraphs(3),
              audioUrl: faker.internet.url(),
              imagesUrls: Array.from({ length: 3 }).map(() =>
                faker.image.url()
              ),
            },
          },
          chapters: {
            create: Array.from({ length: 5 }).map(() => ({
              title: faker.lorem.words(3),
              content: faker.lorem.paragraphs(2),
            })),
          },
          quizzes: {
            create: Array.from({ length: 2 }).map(() => ({
              title: faker.lorem.words(3),
              questions: {
                create: Array.from({ length: 5 }).map(() => ({
                  type: faker.helpers.arrayElement([
                    "SINGLE_CHOICE",
                    "MULTIPLE_CHOICE",
                    "TEXT",
                  ]),
                  question: faker.lorem.sentence(),
                  options: {
                    create: Array.from({ length: 4 }).map((_, index) => ({
                      text: faker.lorem.sentence(),
                      isCorrect: index === 0,
                    })),
                  },
                  correctText: faker.lorem.sentence(),
                })),
              },
            })),
          },
        },
      });
      return module;
    })
  );

  // Créer des performances d'étudiants
  for (const student of students) {
    for (const module of modules) {
      // Récupérer tous les chapitres du module
      const chapters = await prisma.chapter.findMany({
        where: { moduleId: module.id },
      });

      // Créer une performance pour chaque chapitre
      for (const chapter of chapters) {
        await prisma.studentPerformance.create({
          data: {
            studentId: student.id,
            chapterId: chapter.id,
            stars: faker.number.int({ min: 0, max: 5 }),
            timeSpent: faker.number.int({ min: 300, max: 3600 }),
            accuracy: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
          },
        });
      }
    }
  }

  // Créer des streaks d'étudiants
  await Promise.all(
    students.map((student) =>
      prisma.studentStreak.create({
        data: {
          studentId: student.id,
          currentStreak: faker.number.int({ min: 0, max: 30 }),
          lastActive: faker.date.recent(),
        },
      })
    )
  );

  console.log("Base de données seedée avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
