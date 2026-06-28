import { facilities } from "@/lib/home-data";

export default function FacilitiesGrid() {
  return (
    <section className="border-t border-border-warm-2 bg-cream-2">
      <div className="container-page py-16 sm:py-20">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Campus Life
        </div>
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          A campus built for all three streams
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border-warm-2 bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-brand-blue">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[#4d5562]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
