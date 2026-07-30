import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import HeroSection from "@/components/home/HeroSection";
import MarqueeService from "@/components/home/MarqueeService";
import OurMethodology from "@/components/home/OurMethodology";
import Portfolio from "@/components/home/Portfolio";
import Service from "@/components/home/Service";
import Stats from "@/components/home/Stats";
import Testimonial from "@/components/home/Testimonial";
import WhyChosseUs from "@/components/home/WhyChooseUs";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("status", "published").order("display_order", { ascending: true });

  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <HeroSection />
      <Stats />
      <Service />
      <WhyChosseUs />
      <Portfolio />
      <Testimonial />
      <OurMethodology />
      <MarqueeService services={services || []} />
      <FAQ />
      <CTA />
    </div>
  );
}
