import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
  const [isHovering, setIsHovering] = useState(false);
  return (
    <section
      className={clsx(
        "flex text-center justify-between md:items-start w-full gap-10 flex-col h-[80vh]",
        index % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse",
        `order-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`
      )}
    >
      <div className="flex flex-col justify-start items-center md:w-5/12 md:text-start md:items-start h-fit self-center">
        <h1 className="uppercase text-6xl mb-7">{title}</h1>
        <p className="text-neutral-400 mb-5">
          {text.split("<br />").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        {buttonText && (
          <Link
            href="/signin"
            className="py-2 text-primary text-center px-5 rounded-full border border-primary hover:bg-primary/10 font-bold flex gap-2 transition-colors"
          >
            {buttonText}
            <ArrowRight />
          </Link>
        )}
      </div>
      <div>
        <div
          className="relative aspect-square"
          onMouseOver={() => setIsHovering(false)}
          onMouseLeave={() => setIsHovering(true)}
        >
          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem] transform transition-transform",
              isHovering ? "rotate-6" : "rotate-15"
            )}
          ></div>
          <Image
            src={imgUrl}
            alt={alt || "Image de présentation"}
            className="relative z-10 object-contain w-full h-full transform transition-all duration-500"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
