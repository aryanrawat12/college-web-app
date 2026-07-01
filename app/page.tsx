import { Fragment } from "react";
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
  fetchFacilities,
  fetchHomeSectionOrder,
  fetchLeadership,
  fetchNotices,
  fetchPlacementStats,
  fetchProgrammes,
  fetchRecruiters,
  fetchSectionContent,
  fetchSiteSettings,
  fetchStats,
  fetchTestimonials,
  fetchWhyChooseUs,
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
    facilities,
    reasons,
    sectionOrder,
    sc,
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
    fetchFacilities(),
    fetchWhyChooseUs(),
    fetchHomeSectionOrder(),
    fetchSectionContent(),
  ]);

  // Section key → rendered node. Order comes from the admin-editable
  // `home_sections` table; any section missing from it still renders (appended
  // in the default order) so reordering can never hide content. Hero is pinned.
  const sections: Record<string, React.ReactNode> = {
    schools: (
      <Reveal>
        <SchoolsGrid content={sc.schools} />
      </Reveal>
    ),
    credibility: (
      <CredibilityBand stats={stats} accreditations={accreditations} />
    ),
    programmes: (
      <Reveal>
        <ProgramFinder programs={programmes} content={sc.finder} />
      </Reveal>
    ),
    placements: (
      <Reveal>
        <PlacementsHighlight
          stats={placementStats}
          recruiters={recruiters}
          content={sc.placements}
        />
      </Reveal>
    ),
    testimonials: (
      <Reveal>
        <Testimonials items={testimonials} content={sc.testimonials} />
      </Reveal>
    ),
    why: (
      <Reveal>
        <WhyChooseUs reasons={reasons} content={sc.why} />
      </Reveal>
    ),
    leadership: (
      <Reveal>
        <LeadershipMessage data={leadership} content={sc.leadership} />
      </Reveal>
    ),
    facilities: (
      <Reveal>
        <FacilitiesGrid facilities={facilities} content={sc.facilities} />
      </Reveal>
    ),
    campus: (
      <Reveal>
        <CampusUnlocked images={eventImages} content={sc.campus} />
      </Reveal>
    ),
    updates: (
      <Reveal>
        <LatestUpdates
          announcements={announcements}
          notices={notices}
          content={sc.updates}
        />
      </Reveal>
    ),
  };
  const DEFAULT_ORDER = [
    "schools",
    "credibility",
    "programmes",
    "placements",
    "testimonials",
    "why",
    "leadership",
    "facilities",
    "campus",
    "updates",
  ];
  const order = [
    ...sectionOrder.filter((k) => sections[k]),
    ...DEFAULT_ORDER.filter((k) => !sectionOrder.includes(k)),
  ];

  return (
    <>
      <Hero
        title={settings?.heroTitle || undefined}
        subtitle={settings?.heroSubtitle || undefined}
        content={sc.hero}
      />
      {order.map((key) => (
        <Fragment key={key}>{sections[key]}</Fragment>
      ))}
    </>
  );
}
