import BlockedLesson from "./blockedLesson";
import CurrentLesson from "./currentLesson";
import FinishedLesson from "./finishedLesson";
import AvailableLesson from "./availableLesson";

export interface LessonItemProps {
  title: string;
  subtitle: string;
  chapterId: string;
  moduleId: string;
  state?: "BLOKED" | "CURRENT" | "FINISHED" | "AVAILABLE";
  stars?: number;
}

export default function LessonItem({
  title,
  subtitle,
  stars,
  state = "BLOKED",
  chapterId,
  moduleId,
}: LessonItemProps) {
  if (state === "BLOKED")
    return (
      <BlockedLesson
        stars={stars}
        title={title}
        subtitle={subtitle}
        chapterId={chapterId}
        moduleId={moduleId}
      />
    );
  if (state === "CURRENT")
    return (
      <CurrentLesson
        chapterId={chapterId}
        moduleId={moduleId}
        stars={stars}
        title={title}
        subtitle={subtitle}
      />
    );
  if (state === "AVAILABLE")
    return (
      <AvailableLesson
        chapterId={chapterId}
        moduleId={moduleId}
        stars={stars}
        title={title}
        subtitle={subtitle}
      />
    );
  if (state === "FINISHED")
    return (
      <FinishedLesson
        chapterId={chapterId}
        stars={stars}
        moduleId={moduleId}
        subtitle={subtitle}
        title={title}
      />
    );
}
