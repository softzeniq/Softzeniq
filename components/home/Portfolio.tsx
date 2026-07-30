import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "../shared/SectionHeading";
import { Button } from "../ui/button";
import PortfolioCarousel from "./PortfolioCarousel";

export default async function Portfolio() {
  const supabase = await createClient();
  // Fetch ALL projects meant for the home page (removed .limit(3))
  const { data: projects } = await supabase.from("projects").select("*").eq("show_on_home", true).order("created_at", { ascending: false });

  return (
    <div>
      <section className="relative py-12 sm:py-16">
        <div className="max-w-[1536px] mx-auto px-5 sm:px-8 xl:px-12">
          <SectionHeading
            eyebrow="Recent work"
            title={
              <>
                Products our clients{" "}
                <span className="text-gradient whitespace-nowrap">are proud of.</span>
              </>
            }
          />
          
          <PortfolioCarousel projects={projects || []} />

          <div className="mt-10 text-center">
            <Button asChild variant="glass" size="lg">
              <Link href="/portfolio">
                See all projects <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
