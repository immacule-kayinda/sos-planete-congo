import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "STUDENT") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    // Récupérer les données complètes de l'étudiant
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
            lastLogin: true,
            isActive: true,
          },
        },
        Classroom: {
          select: {
            name: true,
            classCode: true,
          },
        },
        teacher: {
          select: {
            firstName: true,
            lastName: true,
            school: true,
          },
        },
        performance: true,
        StudentStreak: true,
        balance: true,
        inventory: {
          include: {
            item: true,
          },
        },
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
        },
        StudentConteProgress: {
          include: {
            conte: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Calculer les statistiques
    const totalStars = student.performance.reduce(
      (sum, perf) => sum + perf.stars,
      0
    );
    const completedChapters = student.StudentChapterProgress.filter(
      (p) => p.isRead
    ).length;
    const totalChapters = student.StudentChapterProgress.length;
    const avgAccuracy =
      student.performance.length > 0
        ? student.performance.reduce((sum, perf) => sum + perf.accuracy, 0) /
          student.performance.length
        : 0;

    // Calculer le temps total d'apprentissage (en minutes)
    const totalTimeSpent = student.performance.reduce(
      (sum, perf) => sum + perf.timeSpent,
      0
    );

    // Calculer le temps d'apprentissage formaté
    const hours = Math.floor(totalTimeSpent / 60);
    const minutes = totalTimeSpent % 60;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    const formattedTime = `${days}j ${remainingHours}h ${minutes}min`;

    // Déterminer la division basée sur les étoiles
    let division = "Bronze";
    if (totalStars >= 1000) division = "Diamant";
    else if (totalStars >= 500) division = "Platine";
    else if (totalStars >= 200) division = "Or";
    else if (totalStars >= 50) division = "Argent";

    // Calculer le pourcentage de progression
    const progressPercentage =
      totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

    // Formater les données de l'inventaire
    const inventoryItems = student.inventory.map((inv) => ({
      id: inv.item.id,
      name: inv.item.name,
      description: inv.item.description,
      category: inv.item.category,
      imageUrl: inv.item.imageUrl,
      quantity: inv.quantity,
      purchasedAt: inv.purchasedAt,
    }));

    // Formater les contes complétés
    const completedContes = student.StudentConteProgress.filter(
      (c) => c.isCompleted
    ).length;

    const profileData = {
      // Informations personnelles
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      email: student.user.email,
      createdAt: student.createdAt,
      lastLogin: student.user.lastLogin,
      isActive: student.user.isActive,
      accountStatus: student.accountStatus,

      // Informations de classe
      classroom: student.Classroom
        ? {
            name: student.Classroom.name,
            classCode: student.Classroom.classCode,
          }
        : null,
      teacher: student.teacher
        ? {
            firstName: student.teacher.firstName,
            lastName: student.teacher.lastName,
            school: student.teacher.school,
          }
        : null,

      // Statistiques
      stats: {
        totalStars,
        completedChapters,
        totalChapters,
        avgAccuracy: Math.round(avgAccuracy * 100),
        currentStreak: student.StudentStreak?.currentStreak || 0,
        lastActive: student.StudentStreak?.lastActive,
        progressPercentage: Math.round(progressPercentage),
        totalTimeSpent: formattedTime,
        division,
        completedContes,
        balance: student.balance?.balance || 0,
      },

      // Inventaire
      inventory: inventoryItems,
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// PUT - Mettre à jour les informations du profil
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "STUDENT") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    const body = await request.json();
    const { firstName, lastName, age } = body;

    // Validation des données
    if (firstName && typeof firstName !== "string") {
      return NextResponse.json(
        { message: "Le prénom doit être une chaîne de caractères" },
        { status: 400 }
      );
    }

    if (lastName && typeof lastName !== "string") {
      return NextResponse.json(
        { message: "Le nom doit être une chaîne de caractères" },
        { status: 400 }
      );
    }

    if (age && (typeof age !== "number" || age < 5 || age > 25)) {
      return NextResponse.json(
        { message: "L'âge doit être un nombre entre 5 et 25" },
        { status: 400 }
      );
    }

    // Mettre à jour les informations de l'étudiant
    const updatedStudent = await prisma.student.update({
      where: { userId: session.user.id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(age !== undefined && { age }),
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
            lastLogin: true,
            isActive: true,
          },
        },
        Classroom: {
          select: {
            name: true,
            classCode: true,
          },
        },
        teacher: {
          select: {
            firstName: true,
            lastName: true,
            school: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      student: {
        id: updatedStudent.id,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        age: updatedStudent.age,
        email: updatedStudent.user.email,
        createdAt: updatedStudent.createdAt,
        lastLogin: updatedStudent.user.lastLogin,
        isActive: updatedStudent.user.isActive,
        accountStatus: updatedStudent.accountStatus,
        classroom: updatedStudent.Classroom
          ? {
              name: updatedStudent.Classroom.name,
              classCode: updatedStudent.Classroom.classCode,
            }
          : null,
        teacher: updatedStudent.teacher
          ? {
              firstName: updatedStudent.teacher.firstName,
              lastName: updatedStudent.teacher.lastName,
              school: updatedStudent.teacher.school,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
