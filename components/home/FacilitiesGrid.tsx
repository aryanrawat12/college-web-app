import type { SectionText } from "@/lib/queries";
import { facilities as fallbackFacilities } from "@/lib/home-data";

type Facility = { title: string; body: string; image: string };

export default function FacilitiesGrid({
  facilities = fallbackFacilities,
  content,
}: {
  facilities?: Facility[];
  content?: SectionText;
}) {
  if (facilities.length === 0) return null;
  const eyebrow = content ? content.eyebrow : "Campus Life";
  const heading = content
    ? content.heading
    : "A campus built for all three streams";
  return (
    <section className="border-t border-border-warm-2 bg-cream-2">
      <div className="container-page py-16 sm:py-20">
        {eyebrow && (
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
            {eyebrow}
          </div>
        )}
        {heading && (
          <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item) => (
            <div
              key={item.title}
              className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-border-warm-2"
            >
              {/* ponytail: placeholder image; swap for a real photo later */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={`${item.title} (placeholder)`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />
              <div className="relative p-6">
                <h3 className="font-serif text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/85">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
