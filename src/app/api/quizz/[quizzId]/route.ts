import { getQuizQuestions } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { quizzId: string } }
) {
  try {
    const questions = await getQuizQuestions(
      await Promise.resolve(params.quizzId)
    );
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
