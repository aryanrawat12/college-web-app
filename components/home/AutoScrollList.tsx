"use client";

type AutoScrollListProps = {
  title: string;
  items: string[];
  accent?: "gold" | "navy";
};

const fadeMask =
  "linear-gradient(180deg,transparent,#000 7%,#000 90%,transparent)";

export default function AutoScrollList({
  title,
  items,
  accent = "gold",
}: AutoScrollListProps) {
  const displayItems =
    items.length > 0 ? items : ["No updates available at the moment."];
  const loopItems = [...displayItems, ...displayItems];
  const dot = accent === "gold" ? "bg-brand-yellow" : "bg-brand-blue";

  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-border-warm-2 bg-surface shadow-[0_6px_22px_rgba(14,20,30,.05)]">
      <div className="flex items-center justify-between border-b border-border-warm-2 bg-brand-blue px-5 py-3.5">
        <h3 className="font-serif text-base font-semibold text-white">
          {title}
        </h3>
        <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px] font-bold text-brand-gold-light">
          {displayItems.length}
        </span>
      </div>
      <div
        className="relative flex-1 overflow-hidden"
        style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
      >
        <ul className="vertical-scroll-track space-y-2.5 px-4 py-4">
          {loopItems.map((item, index) => (
            <li
              key={`${item}-${index}`}
              suppressHydrationWarning={true}
              className="flex gap-3 rounded-xl border border-border-warm-2 bg-tint px-3.5 py-3 transition-colors hover:border-brand-blue/40"
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`}
                aria-hidden="true"
              />
              <p className="text-[13.5px] leading-snug text-[#34404f]">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
