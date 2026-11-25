"use client";

import { Project, projects as fallbackProjects } from "@/data/Project";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PortfolioModal from "./PortfolioModal";

function getGradientStyle(gradient: string) {
  const fallback = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
  if (!gradient) return fallback;

  if (gradient.startsWith("from-[")) {
    const colors = gradient
      .match(/\[(.*?)\]/g)
      ?.map((c) => c.slice(1, -1).replace(/_/g, " "));
    if (colors && colors.length >= 2) {
      return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    }
  }

  if (
    !gradient.includes("gradient") &&
    !gradient.includes("#") &&
    !gradient.includes("rgb") &&
    !gradient.includes("hsl") &&
    !gradient.includes("oklch")
  ) {
    return fallback;
  }

  return gradient;
}

export default function PortfolioCatalog({
  projects,
  categories,
}: {
  projects: Project[];
  categories: { name: string }[];
}) {
  const [active, setActive] = useState<string>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const categoryNames = ["All", ...categories.map((c) => c.name)];
  const displayProjects =
    projects && projects.length > 0 ? projects : fallbackProjects;

  const filtered =
    active === "All"
      ? displayProjects
      : displayProjects.filter((p) => p.category === active);

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryNames.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
                active === category
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const key = project.slug || project.id || String(index);
              const hasExternalLink = Boolean(
                project.link && project.link !== "#"
              );

              const InnerContent = (
                <>
                  <div
                    className="aspect-[4/3] relative overflow-hidden group/image bg-secondary"
                    style={{ background: getGradientStyle(project.gradient) }}
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover/image:scale-[1.03]"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />
                    <div className="absolute top-4 left-4 rounded-full bg-card/95 border border-border px-3 py-1 text-xs font-medium text-foreground z-10 shadow-xs">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {project.summary}
                    </p>
                    <p className="mt-3 text-sm font-medium text-primary">
                      {project.result}
                    </p>
                  </div>
                </>
              );

              if (hasExternalLink) {
                return (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    layout
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ delay: index * 0.04 }}
                    className="group block text-left rounded-2xl overflow-hidden bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 w-full cursor-pointer"
                  >
                    {InnerContent}
                  </motion.a>
                );
              }

              return (
                <motion.button
                  type="button"
                  layout
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setOpen(project)}
                  className="group text-left rounded-2xl overflow-hidden bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 w-full cursor-pointer"
                >
                  {InnerContent}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <PortfolioModal open={open} onClose={() => setOpen(null)} />
    </section>
  );
}
