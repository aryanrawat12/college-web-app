import Image from "next/image";

type EventBlockProps = {
  title: string;
  description: string;
  images: string[];
};

const defaultImages = [
  "/events/event-1.jpg",
  "/events/event-2.jpg",
  "/events/event-3.jpg",
];

export default function EventBlock({
  title,
  description,
  images,
}: EventBlockProps) {
  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <article className="space-y-5 border-b border-brand-blue/10 pb-10 last:border-b-0 last:pb-0">
      <h3 className="text-xl font-semibold text-brand-blue sm:text-2xl">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
        {description}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {displayImages.map((src, index) => {
          const isExternal = src.startsWith("http");
          return (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={src}
                alt={`${title} — photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
                unoptimized={isExternal}
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}
