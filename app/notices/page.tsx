import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchAnnouncements, fetchNotices } from "@/lib/queries";

export const metadata = {
  title: "Notices & Announcements",
};

export const revalidate = 0;

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold tracking-tight text-brand-blue">
        {heading}
      </h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-border-warm-2 bg-surface p-4"
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" />
            <span className="text-[14.5px] leading-relaxed text-foreground/85">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function NoticesPage() {
  const [announcements, notices] = await Promise.all([
    fetchAnnouncements(),
    fetchNotices(),
  ]);

  return (
    <>
      <PageHeaderImage title="Notices & Announcements" />
      <section className="container-page grid grid-cols-1 gap-10 py-10 sm:py-12 lg:grid-cols-2">
        <List heading="Announcements" items={announcements} />
        <List heading="Notices" items={notices} />
      </section>
    </>
  );
}
