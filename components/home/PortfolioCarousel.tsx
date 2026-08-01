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
  const fallback = "linear-gradient(135deg, #4f46e5, #ec4899)";
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
        loop: false,
        slidesToScroll: 1,
      }}
      className="w-full"
    >
      {/* Section Header — outside the overflow-hidden viewport */}
      <div className="flex overflow-hidden  justify-between gap-4 mb-8 sm:mb-10">
        <div className="min-w-0 overflow-hidden max-w-screen">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Recent work</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mt-2">
            Products our clients <span className="text-gradient">are proud of.</span>
          </h2>
        </div>

        {projects.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <CarouselPrevious className="static !translate-x-0 !translate-y-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-primary hover:text-white border border-zinc-200 shadow-sm transition-all" />
            <CarouselNext className="static !translate-x-0 !translate-y-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-primary hover:text-white border border-zinc-200 shadow-sm transition-all" />
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
    <div className="group relative flex flex-col h-full rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden hover:-translate-y-1">
      {/* Framed Image */}
      <div className="p-2 sm:p-2.5 pb-0 shrink-0">
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl w-full bg-zinc-100"
          style={{ background: getGradientStyle(p.gradient) }}
        >
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}

          {/* Category Badge */}
          {p.category && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs font-bold text-zinc-900 shadow-sm border border-white/20">
                {p.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5 lg:p-6">
        <h3 className="font-bold text-sm sm:text-lg lg:text-xl tracking-tight text-zinc-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-1 sm:mb-2">
          {p.title}
        </h3>

        {p.client && (
          <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2 sm:mb-3">
            Client: {p.client}
          </p>
        )}

        <p className="text-[11px] sm:text-sm text-zinc-600 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-5 flex-1 leading-relaxed">
          {p.summary}
        </p>

        {/* Tags */}
        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-5">
            {p.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-zinc-100">
          <span className="text-[11px] sm:text-sm font-bold text-primary truncate pr-2">
            {p.result || "View Project"}
          </span>
          <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-zinc-50 group-hover:bg-primary group-hover:text-white text-zinc-400 transition-all duration-300 shrink-0 border border-zinc-200 group-hover:border-primary">
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </div>
  );
}
