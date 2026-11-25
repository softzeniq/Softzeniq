import AboutHero from "@/components/about/Hero";
import MissionVision from "@/components/about/MissionVision";
import NarrationStory from "@/components/about/NarrationStory";
import Team from "@/components/about/Team";
import Timeline from "@/components/about/Timeline";
import WhyUs from "@/components/about/WhyUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Agency & Mission",
  description: "Learn about SoftZeniq's engineering approach, values, and capabilities. We build reliable web apps, mobile products, and custom software.",
  keywords: ["about SoftZeniq", "software development team", "engineering agency", "tech team", "digital product design"],
  openGraph: {
    title: "About SoftZeniq | Engineering & Product Studio",
    description: "Learn about SoftZeniq's engineering approach, values, and capabilities. We build reliable web apps, mobile products, and custom software.",
  }
};

export default function about() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center ">
      <AboutHero />
      <MissionVision />
      <NarrationStory />
      <Team />
      <Timeline />
      <WhyUs />
    </div>
  );
}

