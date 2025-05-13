export default function CurrentLesson({
  title,
  subtitle,
  stars,
}: {
  title: string;
  subtitle: string;
  stars: number;
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-full ring-gray-200 ring-4 p-1 relative">
          <div className="w-full h-full bg-neutral-200 rounded-full"></div>
        </div>
        <div>
          <p className="font-black text-lg uppercase">{title}</p>
          <span className="text-lg text-gray-500 font-bold">{subtitle}</span>
        </div>
      </div>
      <span className="text-yellow-500 font-bold">★{stars}</span>
    </div>
  );
}
