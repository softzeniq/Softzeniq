import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Button } from "@/components/ui/button";
import { services as fallbackServices } from "@/data/Service";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ServiceRecord = {
  slug: string;
  title: string;
  short_description: string;
  description: string;
  icon_name: string;
  benefits: string[];
};

const iconMap: Record<string, string> = {
  web: "Code2",
  ecommerce: "ShoppingCart",
  software: "Cpu",
  mobile: "Smartphone",
  design: "Palette",
  seo: "Search",
  ads: "Megaphone",
  saas: "Rocket",
};

async function getServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("slug, title, short_description, description, icon_name, benefits")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (data) {
    return {
      slug: data.slug,
      title: data.title,
      short_description: data.short_description,
      description: data.description,
      icon_name: data.icon_name,
      benefits: Array.isArray(data.benefits) ? data.benefits : [],
    };
  }

  const fallback = fallbackServices.find((s) => s.slug === slug);
  if (!fallback) return null;

  return {
    slug: fallback.slug,
    title: fallback.title,
    short_description: fallback.short,
    description: fallback.description,
    icon_name: iconMap[fallback.slug] || "Code2",
    benefits: fallback.benefits,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.short_description,
    openGraph: {
      title: `${service.title} | SoftZeniq`,
      description: service.short_description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const supabase = await createClient();
  const { data: allServices } = await supabase
    .from("services")
    .select("slug, title, short_description, icon_name")
    .eq("status", "published")
    .neq("slug", slug)
    .order("display_order", { ascending: true })
    .limit(3);

  const related =
    allServices && allServices.length > 0
      ? allServices
      : fallbackServices
          .filter((s) => s.slug !== slug)
          .slice(0, 3)
          .map((s) => ({
            slug: s.slug,
            title: s.title,
            short_description: s.short,
            icon_name: iconMap[s.slug] || "Code2",
          }));

  return (
    <div className="pt-28 pb-20 w-full">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All Services
        </Link>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-6">
            <DynamicIcon name={service.icon_name} className="h-6 w-6" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {service.short_description}
          </p>

          <div className="mt-8 pt-8 border-t border-border grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">
                Scope & Engineering Approach
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg" className="px-7 h-11">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                  >
                    Start This Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg" className="px-7 h-11">
                  <Link href="/portfolio">View Related Work</Link>
                </Button>
              </div>
            </div>

            {service.benefits.length > 0 && (
              <div className="bg-secondary/60 border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Key Deliverables
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <span className="p-1 rounded-md bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Other Capabilities
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group bg-card border border-border rounded-2xl p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                    <DynamicIcon name={item.icon_name} className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {item.short_description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
