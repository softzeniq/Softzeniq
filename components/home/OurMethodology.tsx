import {
  Code2,
  Compass,
  Lightbulb,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";

export default function OurMethodology() {
  const processSteps = [
    {
      step: "01",
      title: "Discovery Audits",
      desc: "We fully index your speed metrics, core crawl issues, and brand layout friction limits.",
      icon: Search,
    },
    {
      step: "02",
      title: "Growth Strategy",
      desc: "Map structural improvements, search intent hierarchies, and custom media blueprints.",
      icon: Lightbulb,
    },
    {
      step: "03",
      title: "Conversion Design",
      desc: "Engineered mobile-first Figma prototypes prioritizing thumbs boundaries and cart checkouts.",
      icon: Compass,
    },
    {
      step: "04",
      title: "Headless Engineering",
      desc: "Write light scalable Next.js layouts, Shopify api, and optimize for Core Web Vitals.",
      icon: Code2,
    },
    {
      step: "05",
      title: "Autonomous Launch",
      desc: "Push code to redundant global CDNs after running 140+ precise precheck tests.",
      icon: Zap,
    },
    {
      step: "06",
      title: "Scale & Growth Sprints",
      desc: "Run bi-weekly ad revisions and CRO audits to boost your average order values (AOV).",
      icon: TrendingUp,
    },
  ];
  return (
    <section className="py-12 sm:py-16 bg-background text-foreground text-center w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Methodology"
          title={
            <>
              Structured Sprints to{" "}
              <span className="text-primary">DTC Dominance</span>.
            </>
          }
          description="We operate through 6 highly structured, transparent phases that optimize layouts and eliminate checkout friction systemically."
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
