import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";
import { DynamicIcon } from "../shared/DynamicIcon";

export default async function Service() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("status", "published").order("display_order", { ascending: true }).limit(6);

  return (
    <div>
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-4">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                A full-stack <span className="text-primary">product team</span>
                , on demand.
              </>
            }
            description="From the first wireframe to the millionth user — eight disciplines, one accountable team."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services?.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block h-full rounded-2xl p-6 bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 overflow-hidden"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <DynamicIcon name={s.icon_name} className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {s.short_description}
                  </p>
                  <div className="mt-5 inline-flex items-center text-sm text-primary font-medium gap-1.5 group-hover:gap-2.5 transition-[gap] duration-200">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
