import Image from "next/image";

interface Course {
  image: string;
  titre: string;
  description: string;
}

export default function CourseItem({
  compte,
  idx,
}: {
  compte: Course;
  idx: number;
}) {
  return (
    <div
      key={idx}
      className="bg-white rounded-xl border border-gray- overflow-hidden flex flex-col"
    >
      <Image
        src={compte.image}
        alt="illustration"
        width={400}
        height={192}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="font-bold text-lg mb-2">{compte.titre}</h2>
        <p className="text-gray-600 text-sm flex-1">{compte.description}</p>
      </div>
    </div>
  );
}
