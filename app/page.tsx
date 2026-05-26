import CampusUnlocked from "@/components/home/CampusUnlocked";
import CoursesOffered from "@/components/home/CoursesOffered";
import LatestUpdates from "@/components/home/LatestUpdates";
import HeroCarousel from "@/components/shared/HeroCarousel";
import TextMarquee from "@/components/shared/TextMarquee";
import { welcomeMarqueeText } from "@/lib/home-data";
import {
  fetchAnnouncements,
  fetchEventMarqueeImages,
  fetchNotices,
} from "@/lib/queries";

export const metadata = {
  title: "Home | ABGI",
  description: "Akhil Bharti Group of Institutes — Official Website",
};

export const revalidate = 0;

export default async function HomePage() {
  const [announcements, notices, eventImages] = await Promise.all([
    fetchAnnouncements(),
    fetchNotices(),
    fetchEventMarqueeImages(),
  ]);

  return (
    <>
      <HeroCarousel />
      <TextMarquee text={welcomeMarqueeText} repeat={false} />
      <CoursesOffered />
      <LatestUpdates announcements={announcements} notices={notices} />
      <CampusUnlocked images={eventImages} />
    </>
  );
}
