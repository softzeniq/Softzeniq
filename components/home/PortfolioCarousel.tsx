"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "../shared/Revel";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const hasMultiple = projects.length > 1;

  return (
    <div className="relative group/carousel mt-14">
      {hasMultiple && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hidden md:flex hover:bg-primary hover:text-primary-foreground shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hidden md:flex hover:bg-primary hover:text-primary-foreground shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Full bleed scroll container with scroll padding to align perfectly with parent */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-5 sm:px-8 xl:px-12 -mx-5 sm:-mx-8 xl:-mx-12 gap-6 xl:gap-8 scrollbar-hide scroll-smooth scroll-pl-5 sm:scroll-pl-8 xl:scroll-pl-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects?.map((p, i) => {
          const InnerContent = (
            <div className="flex flex-col h-full bg-black/10 hover:bg-black/0 transition-colors duration-500">
              <div
                className="aspect-[16/10] relative overflow-hidden group/image"
                style={{ background: getGradientStyle(p.gradient) }}
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay group-hover/image:scale-105 group-hover/image:opacity-100 group-hover/image:mix-blend-normal transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                <div className="mb-3">
                  <h3 className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {p.title}
                  </h3>
                  {p.client && (
                    <p className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-widest font-semibold">
                      Client: {p.client}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-grow leading-relaxed">
                  {p.summary}
                </p>

                {p.tags && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 truncate pr-4">
                    {p.result}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors duration-300 text-white">
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform duration-300 text-foreground group-hover:text-primary" />
                  </span>
                </div>
              </div>
            </div>
          );

          const wrapperClass =
            "group rounded-2xl overflow-hidden glass block h-full border border-white/10 hover:border-white/20 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-1";

          return (
            <Reveal
              key={p.slug}
              delay={i * 0.05}
              // Changed snap-center to snap-start, and standardized width across breakpoints
              className="flex shrink-0 snap-start w-[85vw] md:w-[45vw] lg:w-[30vw] xl:w-[25vw]"
            >
              {p.link ? (
                <Link href={p.link} target="_blank" rel="noreferrer" className={wrapperClass}>
                  {InnerContent}
                </Link>
              ) : (
                <div className={wrapperClass}>{InnerContent}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
