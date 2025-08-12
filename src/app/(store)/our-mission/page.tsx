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
        description={
          <>
            <p className="text-[#513f43]">
              At NextBot, our mission is simple: put capable, trustworthy robots
              in everyday hands. <br /> We design and curate machines that are
              genuinely useful—humanoids that assist with daily tasks, agile
              quadrupeds that explore and learn, and dexterous arms that
              automate precise work. Whether you’re a researcher, an educator, a
              hobbyist, or simply curious, we want robotics to feel
              approachable, delightful, and ready from day one.
            </p>

            <p className="text-[#513f43]">
              We build with ethics, safety, and transparency at the core. That
              means clear capabilities, privacy-respecting AI, and open tooling
              where possible so you can experiment, learn, and grow. Our focus
              is on real-world impact: reducing repetitive work, supporting STEM
              education, accelerating prototyping, and inspiring the next
              generation of builders.
            </p>
            <p className="text-[#513f43]">
              Just as important, we’re committed to access and support. From
              straightforward onboarding and documentation to responsive help
              when you need it, we aim to lower barriers so you can focus on
              creating. Robots shouldn’t live only in labs and videos—they
              should be partners in everyday life. NextBot exists to make that
              future practical, ethical, and here today.
            </p>
          </>
        }
        className="pt-0 pb-0"
      />
    </Shell>
  );
}
