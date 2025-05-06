import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="w-full flex justify-between border-b-2 fixed top-0 left-0 bg-white z-50">
      <div className="max-w-6xl w-full m-auto justify-between items-center flex py-4 px-2">
        <h1 className="font-black">Logo</h1>
        <Button>S'inscrire</Button>
      </div>
    </header>
  );
}
