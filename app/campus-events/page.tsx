import EventBlock from "@/components/events/EventBlock";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchEvents } from "@/lib/queries";

export const metadata = {
  title: "Campus Events",
};

export const revalidate = 0;

export default async function CampusEventsPage() {
  const events = await fetchEvents();

  return (
    <>
      <PageHeaderImage title="Campus Events @ ABGI" />

      <ContentSection heading="Campus Events">
        {events.length === 0 ? (
          <p className="text-center text-foreground/70">
            Campus events will be published soon.
          </p>
        ) : (
          <div className="space-y-12">
            {events.map((event) => (
              <EventBlock
                key={event.id}
                title={event.title}
                description={event.description}
                images={event.images}
              />
            ))}
          </div>
        )}
      </ContentSection>
    </>
  );
}
