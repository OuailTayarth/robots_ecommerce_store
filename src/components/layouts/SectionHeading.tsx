import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  heading: string;
  description?: string | ReactNode;
  children?: ReactNode;
}

function SectionHeading({
  heading,
  description,
  children,
  className,
  ...props
}: HeaderProps & { description?: React.ReactNode }) {
  return (
    <section className={cn("pt-[20px] pb-[30px]", className)} {...props}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3">
        {heading}
      </h1>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed md:leading-8 text-zinc-700 max-w-prose md:max-w-4xl">
        {description}
      </p>
      {/* {children} */}
    </section>
  );
}

export default SectionHeading;
