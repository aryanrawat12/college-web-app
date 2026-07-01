import AutoScrollList from "@/components/home/AutoScrollList";
import ConnectCard from "@/components/home/ConnectCard";
import { SectionHeading } from "@/components/shared/ContentSection";
import type { SectionText } from "@/lib/queries";

type LatestUpdatesProps = {
  announcements: string[];
  notices: string[];
  content?: SectionText;
};

export default function LatestUpdates({
  announcements,
  notices,
  content,
}: LatestUpdatesProps) {
  const eyebrow = content ? content.eyebrow : "News & Notices";
  const heading = content ? content.heading : "Latest updates";
  return (
    <section className="bg-background">
      <div className="container-page py-16 sm:py-20">
        {eyebrow && (
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
            {eyebrow}
          </div>
        )}
        {heading && <SectionHeading>{heading}</SectionHeading>}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AutoScrollList title="Announcements" items={announcements} accent="gold" />
          <AutoScrollList title="Notice Board" items={notices} accent="navy" />
          <ConnectCard />
        </div>
      </div>
    </section>
  );
}
