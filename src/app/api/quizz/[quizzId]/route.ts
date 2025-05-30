import { getQuizQuestions } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ quizzId: string }> }
) {
  const params = await props.params;
  try {
    const questions = await getQuizQuestions(
      await Promise.resolve(params.quizzId)
    );
    return NextResponse.json(questions);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
