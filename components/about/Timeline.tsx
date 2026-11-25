import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";

const milestones = [
  {
    phase: "Phase 01",
    title: "Technical Discovery & Scope",
    text: "We map requirements, user flows, data architecture, and delivery milestones before writing production code.",
  },
  {
    phase: "Phase 02",
    title: "Design System & Prototype",
    text: "Component-driven UI/UX validated early so engineering builds from clear specs instead of guesswork.",
  },
  {
    phase: "Phase 03",
    title: "Iterative Engineering Sprints",
    text: "Weekly staging deployments with clean TypeScript, automated checks, and transparent progress reviews.",
  },
  {
    phase: "Phase 04",
    title: "Launch, Monitoring & Scale",
    text: "Production deployment, observability, performance optimization, and ongoing feature evolution.",
  },
];

export default function Timeline() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="How We Deliver"
          title={
            <>
              From <span className="text-primary">architecture</span> to production
            </>
          }
        />
        <div className="relative mt-14 pl-8 sm:pl-10">
          <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          {milestones.map((item, index) => (
            <Reveal key={item.phase} delay={index * 0.05}>
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-[26px] sm:-left-[34px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="text-xs font-mono text-primary uppercase tracking-wider">
                  {item.phase}
                </div>
                <h4 className="mt-1 font-semibold text-lg text-foreground">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
