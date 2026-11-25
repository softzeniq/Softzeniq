import { Eye, Target } from "lucide-react";
import { Reveal } from "../shared/Revel";

const blocks = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Give every founder access to the same caliber of product team that the world's best companies have — without the overhead.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A world where great ideas ship faster than ever, and the only bottleneck is imagination.",
  },
];

export default function MissionVision() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-6">
        {blocks.map((block, index) => (
          <Reveal key={block.title} delay={index * 0.05}>
            <div className="bg-card border border-border shadow-xs rounded-2xl p-8 h-full">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5">
                <block.icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">{block.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{block.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
