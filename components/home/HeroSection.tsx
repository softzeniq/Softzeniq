"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import type { ArchitectureLayer } from "./HeroArchitecture3D";

const HeroArchitecture3D = dynamic(() => import("./HeroArchitecture3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  ),
});

const architectureLayers: {
  id: Exclude<ArchitectureLayer, null>;
  code: string;
  label: string;
  detail: string;
}[] = [
  {
    id: 0,
    code: "01",
    label: "Client UI",
    detail: "Next.js, React & responsive design systems",
  },
  {
    id: 1,
    code: "02",
    label: "API Mesh",
    detail: "Type-safe endpoints, auth & business logic",
  },
  {
    id: 2,
    code: "03",
    label: "Cloud & Data",
    detail: "Postgres, storage & edge deployments",
  },
];

export default function HeroSection() {
  const [activeLayer, setActiveLayer] = useState<ArchitectureLayer>(null);

  const selectedLayerInfo =
    activeLayer !== null ? architectureLayers[activeLayer] : null;

  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-background">
      {/* Subtle architectural grid & top wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-10 items-center">
          {/* Left Column: Positioning & Actions */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border shadow-xs px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Software Engineering Studio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.08] text-foreground"
            >
              Web, mobile &amp; custom software{" "}
              <span className="text-primary">engineered to scale</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              SoftZeniq designs and builds production web applications, SaaS
              platforms, and mobile products for startups and growing businesses
              — from architecture to launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Button
                asChild
                variant="hero"
                size="lg"
                className="px-7 h-12 text-sm w-full sm:w-auto"
              >
                <Link href="/contact">
                  Get a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="lg"
                className="px-7 h-12 text-sm w-full sm:w-auto"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground"
            >
              {[
                "TypeScript & Next.js",
                "100% Code Ownership",
                "24h Technical Proposal",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive Three.js 3D Architecture Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-3xl bg-card/75 border border-border shadow-xs overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-1 border-b border-border/60">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                System Architecture
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {selectedLayerInfo
                  ? selectedLayerInfo.detail
                  : "Hover or select a layer"}
              </span>
            </div>

            <div className="h-[340px] sm:h-[400px] lg:h-[420px] w-full">
              <HeroArchitecture3D activeLayer={activeLayer} />
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-border/60 bg-secondary/40 grid grid-cols-3 gap-2">
              {architectureLayers.map((layer) => {
                const isSelected = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    onMouseLeave={() => setActiveLayer(null)}
                    onClick={() =>
                      setActiveLayer(isSelected ? null : layer.id)
                    }
                    className={`rounded-xl px-3 py-2 text-left border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-card border-border text-foreground hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`text-[10px] font-mono ${
                        isSelected
                          ? "text-primary-foreground/80"
                          : "text-primary"
                      }`}
                    >
                      {layer.code}
                    </div>
                    <div className="text-xs font-medium truncate">
                      {layer.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
