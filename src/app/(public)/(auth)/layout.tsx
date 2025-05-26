import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="m-auto py-5 self-center w-screen md:flex fixed top-0 left-0 z-50 hidden">
        <Link href={"/"} className="max-w-6xl m-auto w-full">
          <Image src="/logo.png" alt="logo" width={100} height={100} className="w-15 h-15"/>
        </Link>
      </header>
      {children}
    </div>
  );
}
