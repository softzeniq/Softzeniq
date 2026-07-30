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
            <div className="group relative h-full rounded-2xl glass p-7 hover:border-primary/40 transition-colors overflow-hidden flex flex-col">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-gradient-brand grid place-items-center shadow-glow mb-5">
                <DynamicIcon name={service.icon_name} className="h-5 w-5 text-primary-foreground" />
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
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button asChild variant="glass" size="sm" className="w-full">
                  <Link href="/contact">
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
