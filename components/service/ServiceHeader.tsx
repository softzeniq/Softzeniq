import { Reveal } from "@/components/shared/Revel";
import { GridBackdrop } from "../shared/GridBackDrop";

export default function ServiceHeader() {
  return (
    <section className="relative pt-20 sm:pt-30 pb-12 overflow-hidden">
      <GridBackdrop />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Services
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground">
            Everything you need to{" "}
            <span className="text-primary">ship and grow</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pick one discipline or hire the whole team. Either way, you get
            senior people accountable to your outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
