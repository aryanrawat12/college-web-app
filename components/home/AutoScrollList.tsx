"use client";

type AutoScrollListProps = {
  title: string;
  items: string[];
};

export default function AutoScrollList({ title, items }: AutoScrollListProps) {
  const displayItems =
    items.length > 0 ? items : ["No updates available at the moment."];
  const loopItems = [...displayItems, ...displayItems];

  return (
    <div className="flex h-full min-h-[160px] flex-col overflow-hidden rounded-lg border border-brand-blue/15 bg-white shadow-sm">
      <h3 className="border-b border-brand-blue/10 bg-brand-blue px-4 py-3 text-center text-sm font-semibold text-white sm:text-base">
        {title}
      </h3>
      <div className="relative flex-1 overflow-hidden">
        <ul className="vertical-scroll-track space-y-3 px-4 py-4">
          {loopItems.map((item, index) => (
            <li
              key={`${item}-${index}`}
              suppressHydrationWarning={true}
              className="rounded-md bg-brand-blue/[0.04] px-3 py-2.5 text-sm leading-snug text-foreground/90"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
