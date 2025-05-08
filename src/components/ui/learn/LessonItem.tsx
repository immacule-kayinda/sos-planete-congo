export default function LessonItem({
  title,
  subtitle,
  stars,
}: {
  title: string;
  subtitle: string;
  stars: number;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded p-2 z-0">
      <div>
        <p className="font-semibold">{title}</p>
        <span className="text-xs text-gray-500">{subtitle}</span>
      </div>
      <span className="text-yellow-500 font-bold">★{stars}</span>
    </div>
  );
}
