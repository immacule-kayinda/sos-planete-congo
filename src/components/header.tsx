import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`w-full flex justify-between border-b-2 sticky top-0 left-0 bg-white z-50 ${className}`}
    >
      <div className="max-w-6xl w-full m-auto justify-between items-center flex py-4 px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
        <nav className="flex gap-4 items-center ">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/quizz" className="hover:underline">
            Nos livres
          </Link>
          <Link href="/learn" className="hover:underline">
            Nos cours
          </Link>
          <Link
            href="/signup"
            className="bg-primary font-montserrat text-white px-5 py-1 rounded-md border border-b-4 border-red-800 font-semibold"
          >
            S'inscrire
          </Link>
        </nav>
      </div>
    </header>
  );
}
