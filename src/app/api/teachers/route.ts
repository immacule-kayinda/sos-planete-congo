import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");

    const whereClause = approved === "true" ? { isApproved: true } : {};

    const teachers = await prisma.teacher.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
            createdAt: true,
          },
        },
        Classroom: {
          select: {
            id: true,
            name: true,
            classCode: true,
            students: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("[TEACHERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
