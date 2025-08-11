import { Shell } from "@/components/layouts/Shell";
import SectionHeading from "@/components/layouts/SectionHeading";
import MissionBanner from "@/features/mission/MissionBanner";

export default function OurMissionPage() {
  return (
    <Shell>
      <MissionBanner
        src="https://robots-store.s3.eu-north-1.amazonaws.com/collections/Neo_Bot/girlfaceneo.avif"
        alt="Robots assisting people"
        title="Our Mission"
      />

      <SectionHeading
        heading="Advancing Robotics for Everyone"
        description="At NextBot, we build helpful, ethical robots for real life—tools that assist at home, at work, and in the field."
        className="pt-0 pb-0"
      />
    </Shell>
  );
}
