"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function getGradientStyle(gradient: string) {
  const fallback = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
  if (!gradient) return fallback;

  if (gradient.startsWith("from-[")) {
    const colors = gradient.match(/\[(.*?)\]/g)?.map((c) => c.slice(1, -1).replace(/_/g, " "));
    if (colors && colors.length >= 2) {
      return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    }
  }

  if (!gradient.includes("gradient") && !gradient.includes("#") && !gradient.includes("rgb") && !gradient.includes("hsl") && !gradient.includes("oklch")) {
    return fallback;
  }

  return gradient;
}

export default function PortfolioCarousel({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="flex flex-col"> 
    <Carousel
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
      }}
      className="w-full"
    >
      {/* Section Header — outside the overflow-hidden viewport */}
      <div className="flex overflow-hidden justify-between items-end gap-4 mb-8 sm:mb-10">
        <div className="min-w-0 overflow-hidden max-w-screen">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Recent work
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground mt-3">
            Products our clients <span className="text-primary">are proud of.</span>
          </h2>
        </div>

        {projects.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <CarouselPrevious className="static !translate-x-0 !translate-y-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border shadow-xs transition-colors duration-150" />
            <CarouselNext className="static !translate-x-0 !translate-y-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border shadow-xs transition-colors duration-150" />
          </div>
        )}
      </div>

      {/* Carousel Slides */}
      <CarouselContent>
        {projects.map((p) => (
          <CarouselItem
            key={p.slug}
            className="basis-[85%] sm:basis-[48%] lg:basis-[32%] xl:basis-[24%]"
          >
            {p.link ? (
              <Link href={p.link} target="_blank" rel="noreferrer" className="block h-full">
                <ProjectCard project={p} />
              </Link>
            ) : (
              <div className="h-full cursor-grab active:cursor-grabbing">
                <ProjectCard project={p} />
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    </div>
  );
}

function ProjectCard({ project: p }: { project: any }) {
  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-card border border-border shadow-xs hover:shadow-md hover:border-primary/40 transition-[border-color,box-shadow] duration-200 overflow-hidden">
      {/* Framed Image */}
      <div className="p-2.5 pb-0 shrink-0">
        <div
          className="relative aspect-[16/20] overflow-hidden rounded-xl w-full bg-secondary"
          style={{ background: getGradientStyle(p.gradient) }}
        >
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}

          {/* Category Badge */}
          {p.category && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-card/95 backdrop-blur-sm text-xs font-medium text-foreground shadow-xs border border-border">
                {p.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="font-semibold text-base sm:text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-2 mb-2">
          {p.title}
        </h3>

        {/* Tags */}
        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-border">
          <span className="text-xs sm:text-sm font-medium text-primary truncate pr-2">
            Client: {p.result || "View Project"}
          </span>
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground text-muted-foreground transition-colors duration-150 shrink-0 border border-border group-hover:border-primary">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
