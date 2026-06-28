import type { ReactNode } from "react";

type ContentSectionProps = {
  heading: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-[34px]">
      {children}
    </h2>
  );
}

export default function ContentSection({
  heading,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section
      className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ${className}`}
    >
      <SectionHeading>{heading}</SectionHeading>
      <div className="space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
        {children}
      </div>
    </section>
  );
}
