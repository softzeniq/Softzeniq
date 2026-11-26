import { Cpu, Database, Globe, Smartphone } from "lucide-react";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";

const stackPillars = [
  {
    icon: Globe,
    title: "Web & SaaS Frontend",
    summary: "Fast, accessible interfaces with modern server-rendered routing.",
    items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Smartphone,
    title: "Mobile Platforms",
    summary: "Cross-platform iOS and Android apps with native performance.",
    items: ["React Native", "Expo", "Offline Sync", "App Store CI"],
  },
  {
    icon: Database,
    title: "Backend & Data",
    summary: "Secure APIs, relational schemas, and real-time data pipelines.",
    items: ["Node.js", "PostgreSQL", "Supabase", "REST & Webhooks"],
  },
  {
    icon: Cpu,
    title: "Cloud & Delivery",
    summary: "Automated builds, edge caching, and production observability.",
    items: ["Vercel", "Docker", "GitHub Actions", "Core Web Vitals"],
  },
];

export default function TechStack() {
  return (
    <section className="py-12 sm:py-16 w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-4">
        <SectionHeading
          eyebrow="Technology Stack"
          title={
            <>
              Modern tools chosen for{" "}
              <span className="text-primary">long-term velocity</span>.
            </>
          }
          description="Battle-tested frameworks and infrastructure that keep your product fast, secure, and straightforward to maintain."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stackPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xs h-full flex flex-col">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground font-display">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {pillar.summary}
                </p>
                <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5">
                  {pillar.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-foreground/80 border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
