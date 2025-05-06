import Image from "next/image";
import { Button } from "./ui/button";

interface PresentationItemProps {
  title: string;
  text: string;
  buttonText?: string;
  imgUrl?: string;
  alt?: string;
}

export default function PresentationItem({
  title,
  text,
  buttonText,
  imgUrl,
  alt,
}: PresentationItemProps) {
  return (
    <section className="flex text-center justify-center md:items-start px-7 w-full gap-5 flex-col items-center py-10 md:flex-row">
      <div className="flex flex-col justify-center items-center md:w-1/6">
        <h1 className="uppercase">{title}</h1>
        <p className="text-neutral-400">
          {text.split("<br />").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        {buttonText && (
          <Button variant={"outline"} className="w-3xs" size={"lg"}>
            {buttonText}
          </Button>
        )}
      </div>
      {imgUrl && (
        <Image
          alt={alt!}
          src={imgUrl}
          width={600}
          height={700}
          className="w-80 m-auto"
        />
      )}
      {!imgUrl && <div className="bg-neutral-500 w-72 h-72 self-center"></div>}
    </section>
  );
}
