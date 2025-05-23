import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-3">
      La page que vous essayez d'acceder n'est pas disponible
      <Link href={"/"} className="btn hover:bg-accent p-3 rounded-lg transition-colors">Retourner à la page d'acceuil</Link>
    </div>
  );
}
