import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

async function seedAdmin() {
  await prisma.$transaction([
    prisma.user.deleteMany({
      where: {
        role: "ADMIN",
      },
    }),
  ]);
  void (await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await hashPassword("admin123"),
      role: "ADMIN",
      isEmailVerified: true,
      admin: {
        create: {},
      },
    },
  }));
  console.log("🌱 Seeding news articles...");
}

export default seedAdmin;
