import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";
import { Button } from "../ui/button";

function getGradientStyle(gradient: string) {
  // Use safe HEX colors that work in all browsers
  const fallback = "linear-gradient(135deg, #4f46e5, #ec4899)";
  if (!gradient) return fallback;

  if (gradient.startsWith("from-[")) {
    const colors = gradient.match(/\[(.*?)\]/g)?.map((c) => c.slice(1, -1).replace(/_/g, " "));
    if (colors && colors.length >= 2) {
      return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    }
  }

  // If it's dummy text (no valid color keywords), use fallback
  if (!gradient.includes("gradient") && !gradient.includes("#") && !gradient.includes("rgb") && !gradient.includes("hsl") && !gradient.includes("oklch")) {
    return fallback;
  }

  return gradient;
}

export default async function Portfolio() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").eq("status", "published").order("display_order", { ascending: true }).limit(3);

  return (
    <div>
      <section className="relative py-12 sm:py-16">
        <div className="max-w-[1536px] mx-auto px-5 sm:px-8 xl:px-12">
          <SectionHeading
            eyebrow="Recent work"
            title={
              <>
                Products our clients{" "}
                <span className="text-gradient">are proud of</span>.
              </>
            }
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {projects?.map((p, i) => {
              const InnerContent = (
                <>
                  <div
                    className="aspect-[4/3] relative overflow-hidden group/image"
                    style={{ background: getGradientStyle(p.gradient) }}
                  >
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover/image:opacity-100 group-hover/image:mix-blend-normal transition-all duration-500"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                    <div className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-xs z-10">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.summary}
                    </p>
                    <p className="text-sm text-gradient font-medium mt-3">
                      {p.result}
                    </p>
                  </div>
                </>
              );

              return (
                <Reveal key={p.slug} delay={i * 0.05} className="w-full">
                  {p.link ? (
                    <Link
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl overflow-hidden glass block w-full"
                    >
                      {InnerContent}
                    </Link>
                  ) : (
                    <div className="group rounded-2xl overflow-hidden glass w-full">
                      {InnerContent}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="glass" size="lg">
              <Link href="/portfolio">
                See all projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
