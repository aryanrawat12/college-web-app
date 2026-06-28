import { whyChooseUs } from "@/lib/home-data";

export default function WhyChooseUs() {
  return (
    <section className="bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Why ABGI
        </div>
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Built for outcomes, not just admissions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border-warm-2 bg-surface p-6 transition-shadow hover:shadow-[0_12px_30px_rgba(14,20,30,.08)]"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-cream-2 font-mono text-sm font-bold text-brand-blue">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-blue">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#4d5562]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
