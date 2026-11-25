"use client";

import { Project } from "@/data/Project";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";

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

export default function PortfolioModal({
  open,
  onClose,
}: {
  open: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center rounded-full bg-card/90 border border-border text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className="aspect-[16/9] relative overflow-hidden bg-secondary"
              style={{ background: getGradientStyle(open.gradient) }}
            >
              {open.image_url && (
                <img
                  src={open.image_url}
                  alt={open.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-xs text-primary font-medium uppercase tracking-wider">
                {open.category} {open.client ? `· ${open.client}` : ""}
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">
                {open.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {open.summary}
              </p>
              {open.result && (
                <div className="mt-5 rounded-xl bg-primary/10 border border-primary/20 p-4">
                  <div className="text-xs text-muted-foreground">Outcome</div>
                  <div className="text-lg font-semibold text-primary mt-0.5">
                    {open.result}
                  </div>
                </div>
              )}
              {open.tags && open.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {open.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {open.link && open.link !== "#" && (
                <div className="mt-6 pt-5 border-t border-border">
                  <a
                    href={open.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Visit Live Project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
