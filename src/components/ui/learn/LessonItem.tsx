import BlockedLesson from "./blockedLesson";

export default function LessonItem({
  title,
  subtitle,
  stars,
}: {
  title: string;
  subtitle: string;
  stars: number;
}) {
  return <BlockedLesson stars={stars} title={title} subtitle={subtitle} />;
}
