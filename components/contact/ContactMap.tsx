import { siteConfig } from "@/lib/site";

export default function ContactMap() {
  return (
    <section
      className="bg-cream-2"
      aria-label="Campus location map"
    >
      <div className="container-page py-10 sm:py-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Find Us
        </div>
        <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Our campus on the map
        </h2>

        <div className="overflow-hidden rounded-2xl border border-border-warm-2 bg-surface shadow-[0_10px_30px_rgba(14,20,30,.06)]">
          <div className="flex items-center gap-2.5 border-b border-border-warm-2 px-5 py-3.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 text-brand-yellow"
            >
              <path
                d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-sm font-semibold text-brand-blue">
              {siteConfig.fullName}, {siteConfig.city}, Madhya Pradesh
            </span>
          </div>

          <iframe
            title="ABGI location — Akhil Bharti College, Bhopal"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&hl=en&z=16&output=embed`}
            className="h-[360px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-warm-2 px-5 py-3.5">
            <span className="text-sm text-muted">
              Get directions to our campus
            </span>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
