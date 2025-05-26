import Finished from "@/app/quizz/ui/Finished";
import BlockedLesson from "./blockedLesson";
import CurrentLesson from "./currentLesson";
import FinishedLesson from "./finishedLesson";

export default function LessonItem({
  title,
  subtitle,
  stars,
  state = "BLOKED",
}: {
  title: string;
  subtitle: string;
  stars: number;
  state?: "BLOKED" | "CURRENT" | "FINISHED";
}) {
  if (state === "BLOKED")
    return <BlockedLesson stars={stars} title={title} subtitle={subtitle} />;
  if (state === "CURRENT")
    return <CurrentLesson stars={stars} title={title} subtitle={subtitle} />;
  if (state === "FINISHED")
    return <FinishedLesson subtitle={subtitle} title={title} />;
}
