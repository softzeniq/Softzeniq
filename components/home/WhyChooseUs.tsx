import { Check, EyeOff, Zap } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";

export default function WhyChosseUs() {
  const comparisonData = [
    {
      title: "Codebase & Reliability",
      without:
        "Fragile templates, tangled plugins, and unmaintained code that breaks on every update.",
      with: "Type-safe Next.js, React, and modular APIs built for maintainability and uptime.",
    },
    {
      title: "Performance & Core Web Vitals",
      without:
        "Bloated scripts and slow client bundles that hurt SEO rankings and user retention.",
      with: "Server-rendered architecture, optimized assets, and sub-second page transitions.",
    },
    {
      title: "Full IP & Platform Ownership",
      without:
        "Vendor lock-in, rigid SaaS limits, and recurring fees that restrict custom workflows.",
      with: "100% source code ownership, clean Git history, and portable cloud infrastructure.",
    },
    {
      title: "Observability & Security",
      without:
        "No audit trails, exposed endpoints, and guesswork when production issues occur.",
      with: "Role-based access control, validated inputs, structured logging, and analytics.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 border-b border-border bg-secondary/50 text-center w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-4">
        <SectionHeading
          eyebrow="Engineering Advantage"
          title={
            <>
              Custom Software vs.{" "}
              <span className="text-primary">Fragile Templates</span>.
            </>
          }
          description="Relying on cobbled-together scripts or rigid no-code builders creates technical debt fast. Here is how purpose-built engineering changes your trajectory."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-14">
          {/* Without Card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-left shadow-xs">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-destructive/10 text-destructive rounded-xl">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground font-display">
                  Patchwork &amp; Template Builds
                </h4>
                <p className="text-xs text-muted-foreground">
                  Short-term shortcuts that stall product growth
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {comparisonData.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-border last:border-b-0 pb-3.5 last:pb-0"
                >
                  <h5 className="text-sm font-medium text-foreground font-sans mb-1">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {item.without}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* With Card */}
          <div className="bg-card border border-primary/40 rounded-2xl p-6 sm:p-8 text-left shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[11px] font-medium py-1 px-3.5 rounded-bl-xl bg-primary text-primary-foreground">
              Production Standard
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground font-display">
                  SoftZeniq Custom Architecture
                </h4>
                <p className="text-xs font-medium font-sans text-primary">
                  Clean systems engineered for scale and ownership
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {comparisonData.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-border last:border-b-0 pb-3.5 last:pb-0 flex items-start space-x-3"
                >
                  <div className="p-1.5 rounded-lg mt-0.5 bg-primary/10 text-primary shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground font-sans">
                      {item.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans mt-0.5">
                      {item.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
