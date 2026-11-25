import {
  Code2,
  Compass,
  Lightbulb,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";

export default function OurMethodology() {
  const processSteps = [
    {
      step: "01",
      title: "Technical Discovery",
      desc: "Map business requirements, domain models, integrations, and milestone scope before coding begins.",
      icon: Search,
    },
    {
      step: "02",
      title: "System & UX Architecture",
      desc: "Define database schemas, API contracts, design tokens, and interactive Figma flows.",
      icon: Compass,
    },
    {
      step: "03",
      title: "Full-Stack Sprints",
      desc: "Build type-safe web, mobile, and backend features in weekly demoable engineering sprints.",
      icon: Code2,
    },
    {
      step: "04",
      title: "QA & Security Review",
      desc: "Validate core user paths, role permissions, responsive edge cases, and Core Web Vitals.",
      icon: ShieldCheck,
    },
    {
      step: "05",
      title: "CI/CD & Production Launch",
      desc: "Deploy with automated pipelines, DNS/SSL hardening, error tracking, and rollback safety.",
      icon: Rocket,
    },
    {
      step: "06",
      title: "Iteration & Long-Term SLA",
      desc: "Continue shipping product improvements, performance tuning, and priority support post-launch.",
      icon: Lightbulb,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-background text-foreground text-center w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Methodology"
          title={
            <>
              A transparent path from{" "}
              <span className="text-primary">spec to production</span>.
            </>
          }
          description="Six structured engineering phases that keep timelines predictable, codebases clean, and stakeholders aligned."
        />

        <div className="mt-14 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-card border border-border rounded-2xl p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow] duration-200"
              >
                <div className="flex justify-between items-center mb-5 font-mono">
                  <span className="text-xl font-semibold tabular-nums text-primary leading-none">
                    {step.step}
                  </span>
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl grid place-items-center">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="text-base font-semibold text-foreground font-display mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
