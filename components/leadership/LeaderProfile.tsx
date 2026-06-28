import Image from "next/image";

type LeaderProfileProps = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  message: string;
  name: string;
  designation: string;
};

export default function LeaderProfile({
  imageSrc,
  imageAlt,
  heading,
  message,
  name,
  designation,
}: LeaderProfileProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="relative mx-auto w-full max-w-[280px] shrink-0 overflow-hidden rounded-lg shadow-lg md:mx-0 md:max-w-[300px] lg:max-w-[320px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={320}
            height={400}
            className="aspect-[4/5] h-auto w-full object-cover object-top"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-brand-blue">
            {heading}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {message}
          </p>
          <div className="mt-auto text-right">
            <p className="text-lg font-semibold text-brand-blue sm:text-xl">
              {name}
            </p>
            <p className="mt-1 text-sm text-foreground/70 sm:text-base">
              {designation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
