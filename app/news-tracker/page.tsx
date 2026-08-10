import NewsTrackerPanel from "@/components/news-tracker/NewsTrackerPanel";

export const metadata = {
  title: "News Tracker | ABGI",
  description:
    "Track a news topic and email every new update to a specific address",
};

export default function NewsTrackerPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue/60">
          Alerts
        </p>
        <h1 className="text-3xl italic text-brand-blue sm:text-4xl">
          News update tracker
        </h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/80 sm:text-lg">
          Point this at a topic (or campus notices / an RSS feed). The checker
          fingerprints each item and mails only brand-new updates to your chosen
          inbox.
        </p>
      </header>
      <NewsTrackerPanel />
    </section>
  );
}
