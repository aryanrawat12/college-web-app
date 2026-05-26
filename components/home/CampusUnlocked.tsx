import Image from "next/image";
import { SectionHeading } from "@/components/shared/ContentSection";

type CampusUnlockedProps = {
  images: string[];
};

export default function CampusUnlocked({ images }: CampusUnlockedProps) {
  const trackImages = images.length > 0 ? [...images, ...images] : [];

  if (trackImages.length === 0) {
    return null;
  }

  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>Campus Unlocked</SectionHeading>
      </div>
      <div className="overflow-hidden bg-brand-blue/[0.03] py-4">
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
