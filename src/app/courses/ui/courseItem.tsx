export default function CourseItem({
  compte,
  idx,
}: {
  compte: any;
  idx: number;
}) {
  return (
    <div
      key={idx}
      className="bg-white rounded-xl border border-gray- overflow-hidden flex flex-col"
    >
      <img
        src={compte.image}
        alt="illustration"
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="font-bold text-lg mb-2">{compte.titre}</h2>
        <p className="text-gray-600 text-sm flex-1">{compte.description}</p>
      </div>
    </div>
  );
}
