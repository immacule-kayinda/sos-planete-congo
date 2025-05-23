import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import type { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    const where = {
      ...(role && { role: role as "ADMIN" | "TEACHER" | "STUDENT" }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: "insensitive" as const } },
          { lastName: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const users = await prisma.user.findMany({
      where,
      include: {
        teacher: true,
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { email, password, role, firstName, lastName, ...additionalData } =
      body;

    const user = await prisma.user.create({
      data: {
        email,
        password, // Note: Le mot de passe doit être hashé avant d'être stocké
        role,
        ...(role === "TEACHER" && {
          teacher: {
            create: {
              firstName,
              lastName,
              ...additionalData,
            },
          },
        }),
        ...(role === "STUDENT" && {
          student: {
            create: {
              firstName,
              lastName,
              ...additionalData,
            },
          },
        }),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
