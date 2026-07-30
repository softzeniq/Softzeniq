"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="relative mt-14 px-4 sm:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {projects.map((p, i) => {
            const InnerContent = (
              <div className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                {/* Image Section */}
                <div
                  className="aspect-[16/10] relative overflow-hidden group/image"
                  style={{ background: getGradientStyle(p.gradient) }}
                >
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover/image:scale-110 group-hover/image:mix-blend-normal transition-transform duration-1000 ease-out"
                      loading="lazy"
                    />
                  )}
                  {/* Overlays for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content Section - Pulled up over the image */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10 -mt-16 sm:-mt-24">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 drop-shadow-md">
                      {p.title}
                    </h3>
                    {p.client && (
                      <p className="text-xs text-zinc-300 mt-2 uppercase tracking-widest font-semibold drop-shadow">
                        Client: {p.client}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-zinc-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {p.summary}
                  </p>

                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 truncate pr-4">
                      {p.result}
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-primary transition-colors duration-300 text-white shadow-sm shrink-0">
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <CarouselItem
                key={p.slug}
                className="pl-4 md:pl-6 basis-[90%] sm:basis-[80%] md:basis-[45%] lg:basis-[33.333%]"
              >
                {p.link ? (
                  <Link href={p.link} target="_blank" rel="noreferrer" className="block h-full group/link">
                    {InnerContent}
                  </Link>
                ) : (
                  <div className="h-full cursor-grab active:cursor-grabbing">
                    {InnerContent}
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {projects.length > 1 && (
          <>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 w-12 h-12 bg-background/80 hover:bg-primary hover:text-primary-foreground border-white/10 shadow-xl" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 w-12 h-12 bg-background/80 hover:bg-primary hover:text-primary-foreground border-white/10 shadow-xl" />
          </>
        )}
      </Carousel>
    </div>
  );
}
