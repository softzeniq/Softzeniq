"use client";


import { Project } from "@/data/Project";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PortfolioModal from "./PortfolioModal";


function getGradientStyle(gradient: string) {
  // Use safe HEX colors that work in all browsers
  const fallback = "linear-gradient(135deg, #4f46e5, #ec4899)";
  if (!gradient) return fallback;
  
  if (gradient.startsWith("from-[")) {
    const colors = gradient.match(/\[(.*?)\]/g)?.map((c) => c.slice(1, -1).replace(/_/g, " "));
    if (colors && colors.length >= 2) {
      return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    }
  }
  
  // If it's dummy text (no valid color keywords), use fallback
  if (!gradient.includes("gradient") && !gradient.includes("#") && !gradient.includes("rgb") && !gradient.includes("hsl") && !gradient.includes("oklch")) {
    return fallback;
  }
  
  return gradient;
}

export default function PortfolioCatalog({ projects, categories }: { projects: any[], categories: any[] }) {
  const [active, setActive] = useState<string>("All");
  const [open, setOpen] = useState<any | null>(null);

  const categoryNames = ["All", ...categories.map(c => c.name)];

  const fallbackProjects: Project[] = [
    {
      id: "fallback-1",
      slug: "mobile-app-1",
      title: "Adipisicing exercita",
      summary: "Distinctio Molestia",
      result: "Voluptatibus sed nem",
      category: "Mobile",
      image_url: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1000&auto=format&fit=crop",
      gradient: "linear-gradient(to bottom right, #a855f7, #ec4899)",
      link: "#",
      show_on_home: true,
      created_at: new Date().toISOString(),
      client: "Softzeniq",
      tags: ["Mobile", "Design"]
    },
    {
      id: "fallback-2",
      slug: "saas-app-1",
      title: "In repudiandae animals",
      summary: "Qui ex ullam omnis a",
      result: "Reprehenderit cumque",
      category: "SaaS",
      image_url: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1000&auto=format&fit=crop",
      gradient: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
      link: "#",
      show_on_home: true,
      created_at: new Date().toISOString(),
      client: "Softzeniq",
      tags: ["SaaS", "Web"]
    },
    {
      id: "fallback-3",
      slug: "ecommerce-1",
      title: "Sit illo magnam mole",
      summary: "Ut ratione beatae eu",
      result: "Dignissimos maxime e",
      category: "E-commerce",
      image_url: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1000&auto=format&fit=crop",
      gradient: "linear-gradient(to right, #ec4899, #f43f5e)",
      link: "#",
      show_on_home: true,
      created_at: new Date().toISOString(),
      client: "Softzeniq",
      tags: ["E-commerce", "Shopify"]
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  const filtered =
    active === "All" ? displayProjects : displayProjects.filter((p) => p.category === active);

  return (
    <section className="pb-24">
      <div className="max-w-[1536px] mx-auto px-5 sm:px-8 xl:px-12">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === category
                  ? "bg-gradient-brand text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const InnerContent = (
                <>
                  <div
                    className="aspect-[4/3] relative overflow-hidden group/image"
                    style={{ background: getGradientStyle(project.gradient) }}
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover/image:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />
                    <div className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-xs z-10">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.summary}
                    </p>
                    <p className="mt-3 text-sm font-medium text-gradient">
                      {project.result}
                    </p>
                  </div>
                </>
              );

              if (project.link) {
                return (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.04 }}
                    className="group block text-left rounded-2xl overflow-hidden glass hover:border-primary/40 transition-colors w-full cursor-pointer"
                  >
                    {InnerContent}
                  </motion.a>
                );
              }

              return (
                <motion.button
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setOpen(project)}
                  className="group text-left rounded-2xl overflow-hidden glass hover:border-primary/40 transition-colors w-full cursor-pointer"
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
