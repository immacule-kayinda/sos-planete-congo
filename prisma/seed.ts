import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
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
    prisma.chapter.deleteMany(),
    prisma.conte.deleteMany(),
    prisma.module.deleteMany(),
    prisma.section.deleteMany(),
    prisma.quizz.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Créer un admin
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await hashPassword("admin123"),
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
          email: faker.internet.email().toLowerCase(),
          password: await hashPassword("password123"),
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
          email: faker.internet.email().toLowerCase(),
          password: await hashPassword("password123"),
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

  // Créer des sections avec leurs modules et contes
  const sections = await Promise.all(
    Array.from({ length: 3 }).map(async (_, sectionIndex) => {
      // Créer d'abord le quiz
      const quizz = await prisma.quizz.create({
        data: {
          title: faker.lorem.words(3),
          sectionId: "", // Temporaire, sera mis à jour après la création de la section
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
        },
      });

      const section = await prisma.section.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          order: sectionIndex + 1,
          quizId: quizz.id,
          conte: {
            create: {
              title: faker.lorem.words(3),
              audioUrl: faker.internet.url(),
              imagesUrls: Array.from({ length: 3 }).map(() =>
                faker.image.url()
              ),
            },
          },
          modules: {
            create: Array.from({ length: 3 }).map((_, moduleIndex) => ({
              title: faker.lorem.words(3),
              subtitle: faker.lorem.sentence(),
              order: moduleIndex + 1,
              chapters: {
                create: Array.from({ length: 5 }).map((_, chapterIndex) => ({
                  title: faker.lorem.words(3),
                  subtitle: faker.lorem.sentence(),
                  content: faker.lorem.paragraphs(2),
                  order: chapterIndex + 1,
                })),
              },
            })),
          },
        },
      });

      // Mettre à jour le quiz avec l'ID de la section
      await prisma.quizz.update({
        where: { id: quizz.id },
        data: { sectionId: section.id },
      });

      return section;
    })
  );

  // Récupérer tous les modules pour créer les performances
  const modules = await prisma.module.findMany({
    include: {
      chapters: true,
    },
  });

  // Créer des performances d'étudiants
  for (const student of students) {
    for (const module of modules) {
      // Créer une performance pour chaque chapitre
      for (const chapter of module.chapters) {
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
