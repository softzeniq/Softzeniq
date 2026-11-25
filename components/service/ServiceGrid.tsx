import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Reveal } from "@/components/shared/Revel";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default async function ServiceGrid() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("status", "published").order("display_order", { ascending: true });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services?.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.04}>
            <div className="group relative h-full rounded-2xl bg-card border border-border shadow-xs p-7 hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 overflow-hidden flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <DynamicIcon name={service.icon_name} className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.benefits.map((benefit:any) => (
                  <li key={benefit} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-border flex items-center gap-2">
                <Button asChild variant="glass" size="sm" className="flex-1">
                  <Link href={`/services/${service.slug}`}>
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="hero" size="sm" className="flex-1">
                  <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                    Start Project <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
