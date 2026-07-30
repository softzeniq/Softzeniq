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
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                A full-stack <span className="text-gradient">product team</span>
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
                  className="group relative block h-full rounded-2xl p-6 glass hover:border-primary/40 transition-colors overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
                  <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center shadow-glow mb-5">
                    <DynamicIcon name={s.icon_name} className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {s.short_description}
                  </p>
                  <div className="mt-5 inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
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
