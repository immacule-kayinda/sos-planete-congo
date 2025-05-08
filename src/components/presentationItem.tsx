import Image from "next/image";
import { Button } from "./ui/button";
import clsx from "clsx";

interface PresentationItemProps {
  title: string;
  text: string;
  buttonText?: string;
  imgUrl: string;
  alt?: string;
  index: number;
}

export default function PresentationItem({
  title,
  text,
  buttonText,
  imgUrl,
  alt,
  index,
}: React.PropsWithChildren<PresentationItemProps>) {
  return (
    <section
      className={clsx(
        "flex text-center justify-between md:items-start w-full gap-10 flex-col ",
        index % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="flex flex-col justify-start items-center md:w-4/12 md:text-start md:items-start h-fit self-center">
        <h1 className="uppercase text-4xl mb-7">{title}</h1>
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
      <Image
        alt={alt!}
        src={imgUrl}
        width={600}
        height={700}
        className="w-6/12 h-auto m-auto md:m-0 "
      />
    </section>
  );
}
