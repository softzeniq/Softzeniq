import { Code2, Compass, Layers, ShieldCheck } from "lucide-react";
import { Reveal } from "../shared/Revel";
import { SectionHeading } from "../shared/SectionHeading";

const pods = [
  {
    name: "Product & UI/UX",
    role: "Design systems, user flows & interactive prototyping",
    icon: Compass,
  },
  {
    name: "Full-Stack Web",
    role: "Next.js, React, TypeScript & scalable APIs",
    icon: Code2,
  },
  {
    name: "Mobile & Cross-Platform",
    role: "iOS, Android & offline-ready client apps",
    icon: Layers,
  },
  {
    name: "Cloud & QA Engineering",
    role: "CI/CD pipelines, security & automated testing",
    icon: ShieldCheck,
  },
];

export default function Team() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Engineering Pods"
          title={
            <>
              Dedicated specialists{" "}
              <span className="text-primary">across every layer</span>.
            </>
          }
          description="Cross-functional product teams structured around engineering, design, and reliable delivery."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pods.map((pod, index) => (
            <Reveal key={pod.name} delay={index * 0.05}>
              <div className="bg-card border border-border shadow-xs rounded-2xl p-6 text-left h-full">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <pod.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-5 font-semibold text-foreground">{pod.name}</h4>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {pod.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
