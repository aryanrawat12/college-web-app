import { testimonials as fallbackTestimonials } from "@/lib/testimonials-data";

type Item = { name: string; detail: string; quote: string; photo: string };

export default function Testimonials({
  items = fallbackTestimonials,
}: {
  items?: Item[];
}) {
  const testimonials = items;
  if (testimonials.length === 0) return null;

  // Duplicate the list so the marquee can loop seamlessly (-50%).
  const track = [...testimonials, ...testimonials];

  return (
    <section
      className="group overflow-hidden bg-cream-2"
      aria-label="Student testimonials"
    >
      <div className="container-page pt-16 sm:pt-20">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          In Their Words
        </div>
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          What our students say
        </h2>
      </div>

      <div
        className="relative pb-16 sm:pb-20"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {track.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-border-warm-2 bg-surface p-6"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-brand-yellow"
              >
                <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5zM18.17 6A5.17 5.17 0 0013 11.17V18h6.83v-6.83H16.5A1.67 1.67 0 0118.17 9.5z" />
              </svg>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-[#4d5562]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border-warm-2 pt-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <span>
                  <span className="block font-semibold text-brand-blue">
                    {t.name}
                  </span>
                  <span className="block text-xs text-faint">{t.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
