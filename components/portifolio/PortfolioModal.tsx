import { Project } from "@/data/Project";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function PortfolioModal({
  open,
  onClose,
}: {
  open: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-background/80 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center rounded-full glass"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className={`aspect-[16/9] bg-gradient-to-br ${open.gradient} relative`}
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
            </div>
            <div className="p-8">
              <div className="text-xs text-primary font-medium uppercase tracking-wider">
                {open.category} · {open.client}
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                {open.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{open.summary}</p>
              <div className="mt-5 rounded-xl bg-primary/10 border border-primary/20 p-4">
                <div className="text-xs text-muted-foreground">Outcome</div>
                <div className="text-lg font-semibold text-primary">
                  {open.result}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {open.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full glass"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
