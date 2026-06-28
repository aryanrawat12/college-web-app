import CampusUnlocked from "@/components/home/CampusUnlocked";
import CredibilityBand from "@/components/home/CredibilityBand";
import FacilitiesGrid from "@/components/home/FacilitiesGrid";
import Hero from "@/components/home/Hero";
import LatestUpdates from "@/components/home/LatestUpdates";
import LeadershipMessage from "@/components/home/LeadershipMessage";
import PlacementsHighlight from "@/components/home/PlacementsHighlight";
import ProgramFinder from "@/components/home/ProgramFinder";
import SchoolsGrid from "@/components/home/SchoolsGrid";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Reveal from "@/components/shared/Reveal";
import {
  fetchAccreditations,
  fetchAnnouncements,
  fetchEventMarqueeImages,
  fetchLeadership,
  fetchNotices,
  fetchPlacementStats,
  fetchProgrammes,
  fetchRecruiters,
  fetchSiteSettings,
  fetchStats,
  fetchTestimonials,
} from "@/lib/queries";

export const metadata = {
  title: { absolute: "Akhil Bharti Group of Institutes (ABGI), Bhopal" },
  description:
    "Pharmacy, Management and Teacher Education programmes at ABGI, Bhopal. Approved by AICTE & PCI, affiliated to RGPV Bhopal. Admissions open 2026–27.",
};

export const revalidate = 0;

export default async function HomePage() {
  const [
    announcements,
    notices,
    eventImages,
    programmes,
    stats,
    accreditations,
    placementStats,
    recruiters,
    testimonials,
    leadership,
    settings,
  ] = await Promise.all([
    fetchAnnouncements(),
    fetchNotices(),
    fetchEventMarqueeImages(),
    fetchProgrammes(),
    fetchStats(),
    fetchAccreditations(),
    fetchPlacementStats(),
    fetchRecruiters(),
    fetchTestimonials(),
    fetchLeadership(),
    fetchSiteSettings(),
  ]);

  return (
    <>
      <Hero
        title={settings?.heroTitle || undefined}
        subtitle={settings?.heroSubtitle || undefined}
      />
      <Reveal>
        <SchoolsGrid />
      </Reveal>
      <CredibilityBand stats={stats} accreditations={accreditations} />
      <Reveal>
        <ProgramFinder programs={programmes} />
      </Reveal>
      <Reveal>
        <PlacementsHighlight stats={placementStats} recruiters={recruiters} />
      </Reveal>
      <Reveal>
        <Testimonials items={testimonials} />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <LeadershipMessage data={leadership} />
      </Reveal>
      <Reveal>
        <FacilitiesGrid />
      </Reveal>
      <Reveal>
        <CampusUnlocked images={eventImages} />
      </Reveal>
      <Reveal>
        <LatestUpdates announcements={announcements} notices={notices} />
      </Reveal>
    </>
  );
}
