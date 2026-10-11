import Image from "next/image";
import type { SectionText } from "@/lib/queries";

type CampusUnlockedProps = {
  images: string[];
  content?: SectionText;
};

export default function CampusUnlocked({ images, content }: CampusUnlockedProps) {
  const trackImages = images.length > 0 ? [...images, ...images] : [];

  if (trackImages.length === 0) {
    return null;
  }

  const eyebrow = content ? content.eyebrow : "Campus Gallery";
  const heading = content ? content.heading : "Life on campus";

  return (
    <section id="campus" className="bg-background pb-8 pt-2 sm:pb-10">
      <div className="container-page mb-5">
        {eyebrow && (
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
            {eyebrow}
          </div>
        )}
        {heading && (
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            {heading}
          </h2>
        )}
      </div>
      <div className="overflow-hidden border-y border-border-warm-2 bg-cream-2 py-4">
        <div className="marquee-track flex w-max flex-nowrap">
          {trackImages.map((src, index) => {
            const isExternal = src.startsWith("http");
            return (
              <div
                key={`${src}-${index}`}
                className="relative h-40 w-56 shrink-0 overflow-hidden sm:h-44 sm:w-64"
              >
                <Image
                  src={src}
                  alt={`Campus event ${(index % images.length) + 1}`}
                  fill
                  className="object-cover"
                  sizes="256px"
                  unoptimized={isExternal}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
