import AutoScrollList from "@/components/home/AutoScrollList";
import ConnectCard from "@/components/home/ConnectCard";
import { SectionHeading } from "@/components/shared/ContentSection";

type LatestUpdatesProps = {
  announcements: string[];
  notices: string[];
};

export default function LatestUpdates({
  announcements,
  notices,
}: LatestUpdatesProps) {
  return (
    <section className="bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          News &amp; Notices
        </div>
        <SectionHeading>Latest updates</SectionHeading>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AutoScrollList title="Announcements" items={announcements} accent="gold" />
          <AutoScrollList title="Notice Board" items={notices} accent="navy" />
          <ConnectCard />
        </div>
      </div>
    </section>
  );
}
