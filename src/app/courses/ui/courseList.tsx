import CourseItem from "./courseItem";

interface Course {
  image: string;
  titre: string;
  description: string;
}

export default function CourseList({ comptes }: { comptes: Course[] }) {
  console.log(comptes);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {comptes.map((compte, idx) => (
        <CourseItem compte={compte} idx={idx} key={idx} />
      ))}
    </div>
  );
}
