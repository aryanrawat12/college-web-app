import AutoScrollList from "@/components/home/AutoScrollList";
import LinkedInWidget from "@/components/home/LinkedInWidget";
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <SectionHeading>Latest updates</SectionHeading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AutoScrollList title="Announcements" items={announcements} />
        <AutoScrollList title="Notice Board" items={notices} />
        <LinkedInWidget />
      </div>
    </section>
  );
}
