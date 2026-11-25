import { Award, Heart, Shield, Zap } from "lucide-react";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";

const reasons = [
  {
    icon: Zap,
    title: "Ship in weeks, not quarters",
    text: "Tight scopes, senior engineers, no handoffs.",
  },
  {
    icon: Shield,
    title: "Built on solid foundations",
    text: "Type-safe code, tests, observability, security from day one.",
  },
  {
    icon: Award,
    title: "Design that converts",
    text: "Polished UI engineered around user goals and business metrics.",
  },
  {
    icon: Heart,
    title: "Long-term partners",
    text: "98% of clients return. We invest in your roadmap, not just the contract.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SoftZeniq"
          title={
            <>
              Senior team. Senior{" "}
              <span className="text-primary">outcomes</span>.
            </>
          }
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.05}>
              <div className="bg-card border border-border shadow-xs rounded-2xl p-6 h-full">
                <reason.icon className="h-6 w-6 text-primary mb-4" />
                <h4 className="font-semibold">{reason.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
