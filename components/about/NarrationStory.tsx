import { Check } from "lucide-react";

export default function NarrationStory() {
  return (
    <section className="py-12 sm:py-16 w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
            Engineering Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold font-display text-foreground mt-2 mb-5">
            Software Built for Clarity, Speed &amp; Ownership
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-sans">
            <p>
              Too many businesses end up with slow websites and brittle tools
              assembled from disconnected templates and plugins. Every new
              feature becomes risky, and page speed suffers on mobile devices.
            </p>
            <p>
              At SoftZeniq, we treat every product as a clean engineering
              system. We build on type-safe frameworks like Next.js, React
              Native, and PostgreSQL—pairing structured data models with crisp
              UI components.
            </p>
            <p>
              From initial technical scoping to post-launch support, you work
              directly with the engineers and designers shipping your product.
              We operate as an accountable product team, not a black-box vendor.
            </p>
          </div>
        </div>

        <div className="relative bg-card border border-border p-6 sm:p-8 rounded-2xl overflow-hidden shadow-xs text-left">
          <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[11px] font-mono tracking-wider py-1 px-3.5 rounded-bl-xl font-medium">
            Core Standards
          </div>

          <h4 className="text-lg font-semibold text-foreground font-display mb-5">
            How Every Project Ships
          </h4>
          <ul className="space-y-3.5">
            {[
              "Clean, type-safe codebases with full Git repository ownership.",
              "Fast server-rendered pages tuned for Core Web Vitals and SEO.",
              "Role-based security, input validation, and structured error handling.",
              "Weekly staging builds with transparent sprint milestones.",
              "Documentation and clean architecture for effortless team handoff.",
            ].map((text, idx) => (
              <li
                key={idx}
                className="flex items-start text-sm text-muted-foreground leading-relaxed font-sans"
              >
                <span className="p-1 bg-primary/10 text-primary rounded-lg mr-2.5 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
