import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Header({ className }: { className?: string }) {
  console.log(!!className);

  return (
    <header
      className={clsx(
        `w-full h-20 flex justify-between border-b fixed top-0 left-0 backdrop-blur-3xl z-50 transition-all`,
        !!className ? "bg-white" : className
      )}
    >
      <div className="container w-full h-full m-auto justify-between items-center flex py-4 px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <nav className="flex gap-4 items-center ">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/store" className="hover:underline">
            Nos livres
          </Link>
          <Link href="/courses" className="hover:underline">
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
