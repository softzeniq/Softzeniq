import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import PortfolioCarousel from "./PortfolioCarousel";

export default async function Portfolio() {
  const supabase = await createClient();
  // Fetch ALL projects meant for the home page (removed .limit(3))
  const { data: projects } = await supabase.from("projects").select("*").eq("show_on_home", true).order("created_at", { ascending: false });

  return (
    <div className="overflow-x-clip">
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
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
