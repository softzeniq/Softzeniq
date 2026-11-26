import { Star } from "lucide-react";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";
import { supabase } from "@/lib/supabase";

export default async function Testimonial() {
  const { data: dbTestimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  const testimonials = dbTestimonials || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 border-b border-border bg-secondary/50 text-center w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by founders{" "}
              <span className="text-primary">and operators</span>.
            </>
          }
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <figure className="h-full bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col text-left">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: t.rating || 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-foreground/90 leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
