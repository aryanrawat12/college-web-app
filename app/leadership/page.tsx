import LeaderProfile from "@/components/leadership/LeaderProfile";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Leadership | ABGI",
};

const leaderMessage =
  "In today's dynamic world, the ability to lead with vision, integrity, and responsibility elevates an individual over and above the masses. Our mission is to inspire students to become successful professionals and ethical leaders who can initiate a positive change in society.";

export default function LeadershipPage() {
  return (
    <>
      <PageHeaderImage title="Leadership @ ABGI" />

      <LeaderProfile
        imageSrc="/leaders/founder.jpg"
        imageAlt="Founder of ABGI"
        heading="Message from Founder"
        message={leaderMessage}
        name="K. K. Gupta"
        designation="Founder, ABGI"
      />

      <LeaderProfile
        imageSrc="/leaders/chancellor.jpg"
        imageAlt="Chancellor of ABGI"
        heading="Message from Chancellor"
        message={leaderMessage}
        name="K. K. Raman"
        designation="Chancellor, ABGI"
      />

      <LeaderProfile
        imageSrc="/leaders/chairman.jpg"
        imageAlt="Chairman of ABGI"
        heading="Message from Chairman"
        message={leaderMessage}
        name="K. K. Sharma"
        designation="Chairman, ABGI"
      />
    </>
  );
}
